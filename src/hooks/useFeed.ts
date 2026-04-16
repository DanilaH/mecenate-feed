import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { observer } from 'mobx-react-lite';
import { getFeed, toggleLike } from '../api/posts';
import { feedStore } from '../stores/FeedStore';
import type { Tier } from '../types/api';

export const FEED_QUERY_KEY = (tier: Tier) => ['feed', tier] as const;

export function useFeed(tier: Tier) {
  return useInfiniteQuery({
    queryKey: FEED_QUERY_KEY(tier),
    queryFn: ({ pageParam }) =>
      getFeed({
        cursor: pageParam as string | undefined,
        limit: 10,
        tier: tier === 'all' ? undefined : tier,
      }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.data.hasMore ? (lastPage.data.nextCursor ?? undefined) : undefined,
    staleTime: 30_000,
    retry: 1,
  });
}

export function useToggleLike() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleLike,
    onMutate: async (postId: string) => {
      // Find current state across all cached feed pages
      const queries = queryClient.getQueriesData<any>({ queryKey: ['feed'] });
      let originalIsLiked = false;
      let originalCount = 0;

      for (const [, data] of queries) {
        if (!data?.pages) continue;
        for (const page of data.pages) {
          const post = page.data?.posts?.find((p: any) => p.id === postId);
          if (post) {
            originalIsLiked = feedStore.getPostLikeState(postId, post.isLiked, post.likesCount).isLiked;
            originalCount = feedStore.getPostLikeState(postId, post.isLiked, post.likesCount).likesCount;
          }
        }
      }

      feedStore.applyOptimisticLike(postId, originalIsLiked, originalCount);
      return { postId, originalIsLiked, originalCount };
    },
    onSuccess: (data, postId) => {
      feedStore.confirmLike(postId, data.data.isLiked, data.data.likesCount);
    },
    onError: (_err, _postId, context) => {
      if (context) {
        feedStore.revertLike(context.postId, context.originalIsLiked, context.originalCount);
      }
    },
  });
}
