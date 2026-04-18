import type { Tier } from "../types/api";

export const FEED_QUERY_KEY = (tier: Tier) => ["feed", tier] as const;
export const POST_QUERY_KEY = (postId: string) => ["post", postId] as const;
export const COMMENTS_QUERY_KEY = (postId: string) =>
  ["comments", postId] as const;
