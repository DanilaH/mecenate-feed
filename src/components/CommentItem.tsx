import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { CommentLikeButton } from "./comment-item/CommentLikeButton";
import { useLocalCommentLike } from "./comment-item/useLocalCommentLike";
import { COMMENT_AVATAR_TEXT_GAP, POST_HORIZONTAL_PADDING } from "../shared/ui";
import { colors, typography } from "../tokens/design";
import type { Comment } from "../types/api";

interface CommentItemProps {
  comment: Comment;
}

export function CommentItem({ comment }: CommentItemProps) {
  const like = useLocalCommentLike(comment);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: comment.author.avatarUrl }}
        style={styles.avatar}
        contentFit="cover"
      />
      <View style={styles.content}>
        <Text style={styles.author} numberOfLines={1}>
          {comment.author.displayName}
        </Text>
        <Text style={styles.text}>{comment.text}</Text>
      </View>
      <CommentLikeButton
        isLiked={like.isLiked}
        likesCount={like.likesCount}
        onPress={like.toggleLike}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: POST_HORIZONTAL_PADDING,
    paddingVertical: 8,
    gap: COMMENT_AVATAR_TEXT_GAP,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  content: {
    flex: 1,
  },
  author: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: typography.bold,
    fontFamily: typography.family.bold,
  },
  text: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: typography.medium,
    fontFamily: typography.family.medium,
  },
});
