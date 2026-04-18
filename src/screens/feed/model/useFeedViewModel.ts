import { useCallback } from "react";
import { useFeed, useToggleLike } from "../../../hooks/useFeed";
import { feedStore } from "../../../stores/FeedStore";
import type { Post, Tier } from "../../../types/api";

export function useFeedViewModel() {
  const tier = feedStore.activeTier;
  const feedQuery = useFeed(tier);
  const likeMutation = useToggleLike();
  const posts: Post[] =
    feedQuery.data?.pages.flatMap((page) => page.data.posts) ?? [];
  const { fetchNextPage, hasNextPage, isFetchingNextPage } = feedQuery;

  const fetchMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const selectTier = useCallback((nextTier: Tier) => {
    feedStore.setTier(nextTier);
  }, []);

  const resetTier = useCallback(() => {
    feedStore.setTier("all");
  }, []);

  return {
    tier,
    posts,
    isLoading: feedQuery.isLoading,
    isError: feedQuery.isError,
    isRefetching: feedQuery.isRefetching,
    isFetchingNextPage: feedQuery.isFetchingNextPage,
    refetch: feedQuery.refetch,
    fetchMore,
    selectTier,
    resetTier,
    toggleLike: likeMutation.mutate,
  };
}
