import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const API_URL = process.env.EXPO_PUBLIC_API_URL ?? 'https://k8s.mectest.ru/test-app';
const DEFAULT_UUID = '550e8400-e29b-41d4-a716-446655440000';
const TOKEN_KEY = 'user_uuid';

export const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(async (config) => {
  let token = await SecureStore.getItemAsync(TOKEN_KEY);
  if (!token) {
    // For demo purposes, we automatically "login" with default test account
    token = process.env.EXPO_PUBLIC_USER_UUID ?? DEFAULT_UUID;
    await SecureStore.setItemAsync(TOKEN_KEY, token as string);
  }
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});
