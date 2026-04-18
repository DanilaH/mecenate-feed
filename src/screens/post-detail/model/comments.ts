import { useMemo } from "react";
import type { InfiniteData } from "@tanstack/react-query";
import type { Comment, CommentsResponse } from "../../../types/api";
import { getCommentLikeScore } from "../../../utils/comments";

export type CommentSortMode = "liked" | "new";

export function formatCommentsCount(count: number) {
  if (count % 10 === 1 && count % 100 !== 11) {
    return `${count} комментарий`;
  }

  if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) {
    return `${count} комментария`;
  }

  return `${count} комментариев`;
}

export function sortComments(comments: Comment[], sortMode: CommentSortMode) {
  return [...comments].sort((a, b) => {
    if (sortMode === "new") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }

    return getCommentLikeScore(b) - getCommentLikeScore(a);
  });
}

export function useSortedComments(
  data: InfiniteData<CommentsResponse> | undefined,
  sortMode: CommentSortMode,
) {
  return useMemo(() => {
    const items = data?.pages.flatMap((page) => page.data.comments) ?? [];
    const uniqueItems = Array.from(
      new Map(items.map((comment) => [comment.id, comment])).values(),
    );

    return sortComments(uniqueItems, sortMode);
  }, [data?.pages, sortMode]);
}
