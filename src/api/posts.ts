import { apiClient } from "./client";
import {
  CommentCreatedResponseSchema,
  CommentsResponseSchema,
  LikeResponseSchema,
  PostDetailResponseSchema,
  PostsResponseSchema,
} from "./schemas";
import type {
  CommentCreatedResponse,
  CommentsResponse,
  LikeResponse,
  PostDetailResponse,
  PostsResponse,
} from "../types/api";

export interface GetFeedParams {
  cursor?: string;
  limit?: number;
  tier?: "free" | "paid";
  simulateError?: boolean;
}

export async function getFeed(
  params: GetFeedParams = {},
): Promise<PostsResponse> {
  const { cursor, limit = 10, tier, simulateError } = params;

  const query: Record<string, string | number | boolean> = { limit };
  if (cursor) query.cursor = cursor;
  if (tier) query.tier = tier;
  if (simulateError) query.simulate_error = true;

  const response = await apiClient.get("/posts", { params: query });
  return PostsResponseSchema.parse(response.data);
}

export async function getPost(postId: string): Promise<PostDetailResponse> {
  const response = await apiClient.get(`/posts/${postId}`);
  return PostDetailResponseSchema.parse(response.data);
}

export async function toggleLike(postId: string): Promise<LikeResponse> {
  const response = await apiClient.post(`/posts/${postId}/like`);
  return LikeResponseSchema.parse(response.data);
}

export interface GetCommentsParams {
  postId: string;
  cursor?: string;
  limit?: number;
}

export async function getComments({
  postId,
  cursor,
  limit = 10,
}: GetCommentsParams): Promise<CommentsResponse> {
  const query: Record<string, string | number> = { limit };
  if (cursor) query.cursor = cursor;

  const response = await apiClient.get(`/posts/${postId}/comments`, {
    params: query,
  });
  return CommentsResponseSchema.parse(response.data);
}

export async function createComment(
  postId: string,
  text: string,
): Promise<CommentCreatedResponse> {
  const response = await apiClient.post(`/posts/${postId}/comments`, { text });
  return CommentCreatedResponseSchema.parse(response.data);
}
