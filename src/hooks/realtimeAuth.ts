import { API_URL } from "../api/client";

export type WebSocketAuthTransport = "protocol" | "query";
type WebSocketAuthMode = WebSocketAuthTransport | "auto";
type WebSocketAuthFallbackContext = {
  opened: boolean;
  transport: WebSocketAuthTransport;
};

const DEFAULT_AUTH_MODE: WebSocketAuthMode = "auto";
const AUTH_MODES: WebSocketAuthMode[] = ["auto", "protocol", "query"];

const AUTH_STRATEGIES: Record<
  WebSocketAuthMode,
  {
    initialTransport: WebSocketAuthTransport;
    shouldFallbackToQuery: (context: WebSocketAuthFallbackContext) => boolean;
  }
> = {
  auto: {
    initialTransport: "protocol",
    shouldFallbackToQuery: ({ opened, transport }) =>
      !opened && transport === "protocol",
  },
  protocol: {
    initialTransport: "protocol",
    shouldFallbackToQuery: () => false,
  },
  query: {
    initialTransport: "query",
    shouldFallbackToQuery: () => false,
  },
};

function getAuthMode() {
  const configuredMode = process.env.EXPO_PUBLIC_WS_AUTH_TRANSPORT;
  return (
    AUTH_MODES.find((mode) => mode === configuredMode) ?? DEFAULT_AUTH_MODE
  );
}

export function getWebSocketAuthStrategy() {
  return AUTH_STRATEGIES[getAuthMode()];
}

export function getWebSocketConfig(
  token: string,
  authTransport: WebSocketAuthTransport,
) {
  const url = new URL(API_URL);
  url.protocol = url.protocol === "https:" ? "wss:" : "ws:";
  url.pathname = `${url.pathname.replace(/\/$/, "")}/ws`;

  if (authTransport === "query") {
    url.searchParams.set("token", token);
    return { url: url.toString() };
  }

  return { url: url.toString(), protocols: token };
}
