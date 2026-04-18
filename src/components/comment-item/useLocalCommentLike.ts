import { useMemo, useState } from "react";
import { getCommentLikeScore } from "../../utils/comments";
import type { Comment } from "../../types/api";

export function useLocalCommentLike(comment: Comment) {
  const initialLikes = useMemo(() => getCommentLikeScore(comment), [comment]);
  const [isLiked, setIsLiked] = useState(comment.isLiked ?? false);
  const [likesCount, setLikesCount] = useState(initialLikes);

  const toggleLike = () => {
    setIsLiked((current) => {
      setLikesCount((count) => count + (current ? -1 : 1));
      return !current;
    });
  };

  return {
    isLiked,
    likesCount,
    toggleLike,
  };
}
