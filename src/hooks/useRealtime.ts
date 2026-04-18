import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { API_URL, getAuthToken } from "../api/client";
import {
  addCommentToCache,
  updatePostLikeFromRealtime,
} from "../query/postCache";
import type { Comment } from "../types/api";

type RealtimeEvent =
  | { type: "ping" }
  | { type: "like_updated"; postId: string; likesCount: number }
  | { type: "comment_added"; postId: string; comment: Comment };

function getWebSocketUrl(token: string) {
  const url = new URL(API_URL);
  url.protocol = url.protocol === "https:" ? "wss:" : "ws:";
  url.pathname = `${url.pathname.replace(/\/$/, "")}/ws`;
  url.searchParams.set("token", token);
  return url.toString();
}

export function useRealtime(postId: string) {
  const queryClient = useQueryClient();

  useEffect(() => {
    let socket: WebSocket | null = null;
    let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
    let reconnectAttempt = 0;
    let closedByEffect = false;

    const scheduleReconnect = () => {
      if (closedByEffect) return;

      const delay = Math.min(1000 * 2 ** reconnectAttempt, 15000);
      reconnectAttempt += 1;
      reconnectTimer = setTimeout(connect, delay);
    };

    const connect = async () => {
      try {
        const token = await getAuthToken();
        socket = new WebSocket(getWebSocketUrl(token));
      } catch {
        scheduleReconnect();
        return;
      }

      socket.onopen = () => {
        reconnectAttempt = 0;
      };

      socket.onmessage = (event) => {
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

      socket.onclose = () => {
        scheduleReconnect();
      };

      socket.onerror = () => {
        socket?.close();
      };
    };

    connect();

    return () => {
      closedByEffect = true;
      if (reconnectTimer) {
        clearTimeout(reconnectTimer);
      }
      socket?.close();
    };
  }, [postId, queryClient]);
}
