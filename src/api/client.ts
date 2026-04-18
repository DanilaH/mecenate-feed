import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

export const API_URL =
  process.env.EXPO_PUBLIC_API_URL ?? "https://k8s.mectest.ru/test-app";
const DEFAULT_UUID = "550e8400-e29b-41d4-a716-446655440000";
const TOKEN_KEY = "user_uuid";

export async function getAuthToken() {
  const configuredToken = process.env.EXPO_PUBLIC_USER_UUID ?? DEFAULT_UUID;

  if (Platform.OS === "web") {
    return configuredToken;
  }

  try {
    const isSecureStoreAvailable = await SecureStore.isAvailableAsync();
    if (!isSecureStoreAvailable) {
      return configuredToken;
    }

    const storedToken = await SecureStore.getItemAsync(TOKEN_KEY);
    if (!storedToken) {
      await SecureStore.setItemAsync(TOKEN_KEY, configuredToken);
      return configuredToken;
    }

    return storedToken;
  } catch {
    return configuredToken;
  }
}

export const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(async (config) => {
  const token = await getAuthToken();
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});
