import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { POST_HORIZONTAL_PADDING, textStyles } from "../../../shared/ui";
import { formatCommentsCount, type CommentSortMode } from "../model/comments";

interface CommentsToolbarProps {
  commentsCount: number;
  sortMode: CommentSortMode;
  onToggleSort: () => void;
}

export function CommentsToolbar({
  commentsCount,
  sortMode,
  onToggleSort,
}: CommentsToolbarProps) {
  return (
    <View style={styles.commentsHeader}>
      <Text style={styles.commentsCount}>
        {formatCommentsCount(commentsCount)}
      </Text>
      <Pressable onPress={onToggleSort}>
        <Text style={styles.sortButton}>
          {sortMode === "liked" ? "Сначала новые" : "Сначала залайканные"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  commentsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: POST_HORIZONTAL_PADDING,
    paddingBottom: 8,
  },
  commentsCount: {
    ...textStyles.bodySemiboldSecondary,
  },
  sortButton: {
    ...textStyles.bodyLink,
  },
});
