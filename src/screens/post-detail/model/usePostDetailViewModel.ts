import { useCallback, useState } from "react";
import {
  useComments,
  useCreateComment,
  usePost,
  useTogglePostLike,
} from "../../../hooks/usePostDetail";
import { useRealtime } from "../../../hooks/useRealtime";
import { type CommentSortMode, useSortedComments } from "./comments";

export function usePostDetailViewModel(postId: string) {
  const [sortMode, setSortMode] = useState<CommentSortMode>("liked");

  useRealtime(postId);

  const postQuery = usePost(postId);
  const post = postQuery.data?.data.post;
  const commentsEnabled = Boolean(post) && post?.tier !== "paid";
  const commentsQuery = useComments(postId, commentsEnabled);
  const likeMutation = useTogglePostLike(postId);
  const createCommentMutation = useCreateComment(postId);
  const comments = useSortedComments(
    commentsEnabled ? commentsQuery.data : undefined,
    sortMode,
  );
  const { fetchNextPage, hasNextPage, isFetchingNextPage } = commentsQuery;

  const fetchMoreComments = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const toggleSort = useCallback(() => {
    setSortMode((mode) => (mode === "liked" ? "new" : "liked"));
  }, []);

  const toggleLike = useCallback(() => {
    likeMutation.mutate();
  }, [likeMutation]);

  const submitComment = useCallback(
    (text: string) =>
      new Promise<boolean>((resolve) => {
        createCommentMutation.mutate(text, {
          onSuccess: () => resolve(true),
          onError: () => resolve(false),
        });
      }),
    [createCommentMutation],
  );

  return {
    post,
    comments,
    commentsEnabled,
    sortMode,
    isLoading: postQuery.isLoading,
    isError: postQuery.isError,
    isLikePending: likeMutation.isPending,
    isCommentSubmitting: createCommentMutation.isPending,
    isFetchingNextPage: commentsEnabled && commentsQuery.isFetchingNextPage,
    refetchPost: postQuery.refetch,
    fetchMoreComments,
    toggleSort,
    toggleLike,
    submitComment,
  };
}
