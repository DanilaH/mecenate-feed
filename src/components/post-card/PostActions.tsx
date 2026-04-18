import React from "react";
import { StyleSheet, View } from "react-native";
import { CommentButton } from "../CommentButton";
import { LikeButton } from "../LikeButton";

interface PostActionsProps {
  isLiked: boolean;
  likesCount: number;
  commentsCount: number;
  onLike: () => void;
  onComment?: () => void;
}

export function PostActions({
  isLiked,
  likesCount,
  commentsCount,
  onLike,
  onComment,
}: PostActionsProps) {
  return (
    <View style={styles.actions}>
      <LikeButton isLiked={isLiked} likesCount={likesCount} onPress={onLike} />
      <CommentButton
        commentsCount={commentsCount}
        onPress={() => onComment?.()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 30,
    paddingTop: 0,
    paddingBottom: 14,
  },
});
