import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { observer } from "mobx-react-lite";
import { AuthorRow } from "./AuthorRow";
import { PostActions } from "./post-card/PostActions";
import { PostCover } from "./post-card/PostCover";
import { PostTextContent } from "./post-card/PostTextContent";
import { feedStore } from "../stores/FeedStore";
import { colors } from "../tokens/design";
import type { Post } from "../types/api";

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
  onComment?: (postId: string) => void;
  onPress?: (postId: string) => void;
}

function PostCardBase({ post, onLike, onComment, onPress }: PostCardProps) {
  const { isLiked, likesCount } = feedStore.getPostLikeState(
    post.id,
    post.isLiked,
    post.likesCount,
  );
  const isPaid = post.tier === "paid";
  const openPost = () => onPress?.(post.id);

  return (
    <View style={styles.card}>
      <Pressable
        style={styles.pressableArea}
        onPress={openPost}
        accessibilityRole="button"
      >
        <AuthorRow author={post.author} />
      </Pressable>

      <PostCover coverUrl={post.coverUrl} isPaid={isPaid} onPress={openPost} />
      <PostTextContent post={post} isPaid={isPaid} onPress={openPost} />
      <PostActions
        isLiked={isLiked}
        likesCount={likesCount}
        commentsCount={post.commentsCount}
        onLike={() => onLike(post.id)}
        onComment={() => onComment?.(post.id)}
      />
    </View>
  );
}

export const PostCard = React.memo(observer(PostCardBase));

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
  },
  pressableArea: {
    backgroundColor: colors.surface,
  },
});
