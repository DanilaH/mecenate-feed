import type { Comment } from "../types/api";

export function getCommentLikeScore(comment: Comment) {
  return comment.likesCount ?? 0;
}
