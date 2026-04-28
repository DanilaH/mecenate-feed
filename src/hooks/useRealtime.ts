import { useEffect } from "react";
import NetInfo, { type NetInfoState } from "@react-native-community/netinfo";
import { useQueryClient } from "@tanstack/react-query";
import { AppState, type AppStateStatus } from "react-native";
import { getAuthToken } from "../api/client";
import {
  addCommentToCache,
  updatePostLikeFromRealtime,
} from "../query/postCache";
import { getWebSocketAuthStrategy, getWebSocketConfig } from "./realtimeAuth";
import type { Comment } from "../types/api";

type RealtimeEvent =
  | { type: "ping" }
  | { type: "like_updated"; postId: string; likesCount: number }
  | { type: "comment_added"; postId: string; comment: Comment };

const MAX_RECONNECT_DELAY = 15000;

function canUseNetwork(state: NetInfoState) {
  return state.isConnected !== false && state.isInternetReachable !== false;
}

export function useRealtime(postId: string) {
  const queryClient = useQueryClient();

  useEffect(() => {
    let socket: WebSocket | null = null;
    let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
    let reconnectAttempt = 0;
    let appState: AppStateStatus = AppState.currentState;
    let closedByEffect = false;
    let hasNetworkState = false;
    let isConnecting = false;
    let isOnline = false;
    const authStrategy = getWebSocketAuthStrategy();
    let authTransport = authStrategy.initialTransport;

    const canConnect = () =>
      !closedByEffect && appState === "active" && hasNetworkState && isOnline;

    const clearReconnectTimer = () => {
      if (reconnectTimer) {
        clearTimeout(reconnectTimer);
        reconnectTimer = null;
      }
    };

    const closeSocket = () => {
      if (!socket) return;

      const currentSocket = socket;
      socket = null;
      currentSocket.onopen = null;
      currentSocket.onmessage = null;
      currentSocket.onclose = null;
      currentSocket.onerror = null;
      currentSocket.close();
    };

    const scheduleReconnect = () => {
      if (!canConnect()) return;

      clearReconnectTimer();
      const delay = Math.min(1000 * 2 ** reconnectAttempt, MAX_RECONNECT_DELAY);
      reconnectAttempt += 1;
      reconnectTimer = setTimeout(() => {
        reconnectTimer = null;
        connect();
      }, delay);
    };

    const connect = async (transport = authTransport) => {
      if (!canConnect() || socket || isConnecting) return;

      isConnecting = true;

      try {
        const token = await getAuthToken();
        if (!canConnect()) return;

        const socketConfig = getWebSocketConfig(token, transport);
        const nextSocket = socketConfig.protocols
          ? new WebSocket(socketConfig.url, socketConfig.protocols)
          : new WebSocket(socketConfig.url);
        let opened = false;
        socket = nextSocket;

        nextSocket.onopen = () => {
          if (socket !== nextSocket) return;
          opened = true;
          authTransport = transport;
          reconnectAttempt = 0;
        };

        nextSocket.onmessage = (event) => {
          try {
            const payload = JSON.parse(event.data) as RealtimeEvent;
            if (payload.type === "like_updated") {
              updatePostLikeFromRealtime(
                queryClient,
                payload.postId,
                payload.likesCount,
              );
            }

            if (payload.type === "comment_added" && payload.postId === postId) {
              addCommentToCache(queryClient, payload.postId, payload.comment);
            }
          } catch {
            return;
          }
        };

        nextSocket.onclose = () => {
          if (socket === nextSocket) {
            socket = null;
          }

          if (
            authStrategy.shouldFallbackToQuery({ opened, transport }) &&
            authTransport === "protocol" &&
            canConnect()
          ) {
            authTransport = "query";
            connect("query");
            return;
          }

          scheduleReconnect();
        };

        nextSocket.onerror = () => {
          nextSocket.close();
        };
      } catch {
        if (
          authStrategy.shouldFallbackToQuery({ opened: false, transport }) &&
          authTransport === "protocol"
        ) {
          authTransport = "query";
          setTimeout(() => connect("query"), 0);
          return;
        }

        scheduleReconnect();
      } finally {
        isConnecting = false;
      }
    };

    const handleNetworkState = (state: NetInfoState) => {
      if (closedByEffect) return;

      const wasOnline = isOnline;
      hasNetworkState = true;
      isOnline = canUseNetwork(state);

      if (!isOnline) {
        clearReconnectTimer();
        closeSocket();
        return;
      }

      if (!wasOnline) {
        reconnectAttempt = 0;
      }

      connect();
    };

    const appStateSubscription = AppState.addEventListener(
      "change",
      (nextAppState) => {
        appState = nextAppState;

        if (appState !== "active") {
          clearReconnectTimer();
          closeSocket();
          return;
        }

        reconnectAttempt = 0;
        connect();
      },
    );

    const unsubscribeNetInfo = NetInfo.addEventListener(handleNetworkState);
    NetInfo.fetch()
      .then(handleNetworkState)
      .catch(() => {
        if (closedByEffect) return;

        hasNetworkState = true;
        isOnline = true;
        connect();
      });

    return () => {
      closedByEffect = true;
      appStateSubscription.remove();
      unsubscribeNetInfo();
      clearReconnectTimer();
      closeSocket();
    };
  }, [postId, queryClient]);
}
