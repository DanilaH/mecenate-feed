import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { createComment, getComments, getPost, toggleLike } from "../api/posts";
import {
  addCommentToCache,
  updatePostLikeCache,
  updatePostLikeFromRealtime,
} from "../query/postCache";
import { COMMENTS_QUERY_KEY, POST_QUERY_KEY } from "../query/keys";
import { feedStore } from "../stores/FeedStore";

export { addCommentToCache, updatePostLikeFromRealtime };
export { COMMENTS_QUERY_KEY, POST_QUERY_KEY };

export function usePost(postId: string) {
  return useQuery({
    queryKey: POST_QUERY_KEY(postId),
    queryFn: () => getPost(postId),
    staleTime: 30_000,
  });
}

export function useComments(postId: string, enabled = true) {
  return useInfiniteQuery({
    queryKey: COMMENTS_QUERY_KEY(postId),
    queryFn: ({ pageParam }) =>
      getComments({
        postId,
        cursor: pageParam as string | undefined,
        limit: 10,
      }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.data.hasMore
        ? (lastPage.data.nextCursor ?? undefined)
        : undefined,
    enabled,
  });
}

export function useTogglePostLike(postId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => toggleLike(postId),
    onSuccess: (response) => {
      updatePostLikeCache(queryClient, postId, response);
      feedStore.confirmLike(
        postId,
        response.data.isLiked,
        response.data.likesCount,
      );
    },
  });
}

export function useCreateComment(postId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (text: string) => createComment(postId, text),
    onSuccess: (response) => {
      addCommentToCache(queryClient, postId, response.data.comment);
    },
  });
}
