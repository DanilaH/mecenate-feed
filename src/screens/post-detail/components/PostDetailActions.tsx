import React from "react";
import { StyleSheet, View } from "react-native";
import { CommentButton } from "../../../components/CommentButton";
import { DetailLikeButton } from "../../../components/DetailLikeButton";

interface PostDetailActionsProps {
  isLiked: boolean;
  likesCount: number;
  commentsCount: number;
  likePending: boolean;
  onToggleLike: () => void;
}

export function PostDetailActions({
  isLiked,
  likesCount,
  commentsCount,
  likePending,
  onToggleLike,
}: PostDetailActionsProps) {
  return (
    <View style={styles.actions}>
      <DetailLikeButton
        isLiked={isLiked}
        likesCount={likesCount}
        onPress={onToggleLike}
        disabled={likePending}
      />
      <CommentButton commentsCount={commentsCount} disabled />
    </View>
  );
}

const styles = StyleSheet.create({
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 30,
    paddingTop: 12,
    paddingBottom: 16,
  },
});
