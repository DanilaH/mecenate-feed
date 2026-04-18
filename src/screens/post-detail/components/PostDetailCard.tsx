import React from "react";
import { View } from "react-native";
import { AuthorRow } from "../../../components/AuthorRow";
import type { Post } from "../../../types/api";
import type { CommentSortMode } from "../model/comments";
import { CommentsToolbar } from "./CommentsToolbar";
import { PostDetailActions } from "./PostDetailActions";
import { PostDetailBody } from "./PostDetailBody";
import { PostDetailMedia } from "./PostDetailMedia";
import { PostDetailTopBar } from "./PostDetailTopBar";

interface PostDetailCardProps {
  post: Post;
  sortMode: CommentSortMode;
  commentsEnabled: boolean;
  likePending: boolean;
  onBack: () => void;
  onToggleLike: () => void;
  onToggleSort: () => void;
}

export function PostDetailCard({
  post,
  sortMode,
  commentsEnabled,
  likePending,
  onBack,
  onToggleLike,
  onToggleSort,
}: PostDetailCardProps) {
  const isPaid = post.tier === "paid";

  return (
    <View>
      <PostDetailTopBar onBack={onBack} />
      <AuthorRow author={post.author} />
      <PostDetailMedia coverUrl={post.coverUrl} isPaid={isPaid} />
      <PostDetailBody post={post} isPaid={isPaid} />
      <PostDetailActions
        isLiked={post.isLiked}
        likesCount={post.likesCount}
        commentsCount={post.commentsCount}
        likePending={likePending}
        onToggleLike={onToggleLike}
      />
      {commentsEnabled ? (
        <CommentsToolbar
          commentsCount={post.commentsCount}
          sortMode={sortMode}
          onToggleSort={onToggleSort}
        />
      ) : null}
    </View>
  );
}
