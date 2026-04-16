import { apiClient } from './client';
import type { PostsResponse, LikeResponse } from '../types/api';

export interface GetFeedParams {
  cursor?: string;
  limit?: number;
  tier?: 'free' | 'paid';
  simulateError?: boolean;
}

export async function getFeed(params: GetFeedParams = {}): Promise<PostsResponse> {
  const { cursor, limit = 10, tier, simulateError } = params;

  const query: Record<string, string | number | boolean> = { limit };
  if (cursor) query.cursor = cursor;
  if (tier) query.tier = tier;
  if (simulateError) query.simulate_error = true;

  const { data } = await apiClient.get<PostsResponse>('/posts', { params: query });
  return data;
}

export async function toggleLike(postId: string): Promise<LikeResponse> {
  const { data } = await apiClient.post<LikeResponse>(`/posts/${postId}/like`);
  return data;
}
