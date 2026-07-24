import { Platform } from "react-native";

export const BASE_URL = process.env.EXPO_PUBLIC_API_URL_DEVICE!;

console.log("Platform:", Platform.OS);
console.log("BASE_URL:", BASE_URL);

export async function apiRequest<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
    ...options,
  });

  const text = await response.text();

  if (!response.ok) {
    throw new Error(text);
  }

  return JSON.parse(text) as T;
}