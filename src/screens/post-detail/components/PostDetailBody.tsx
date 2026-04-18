import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { POST_HORIZONTAL_PADDING, textStyles } from "../../../shared/ui";
import { colors } from "../../../tokens/design";
import type { Post } from "../../../types/api";

interface PostDetailBodyProps {
  post: Post;
  isPaid: boolean;
}

export function PostDetailBody({ post, isPaid }: PostDetailBodyProps) {
  return (
    <View style={styles.postContent}>
      {isPaid ? (
        <View style={styles.lockedTextSkeleton}>
          <View style={styles.lockedTitleSkeleton} />
          <View style={styles.lockedPreviewSkeleton} />
        </View>
      ) : (
        <>
          <Text style={styles.postTitle}>{post.title}</Text>
          <Text style={styles.postBody}>{post.body || post.preview}</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  postContent: {
    paddingHorizontal: POST_HORIZONTAL_PADDING,
    paddingTop: 12,
  },
  postTitle: {
    ...textStyles.postTitle,
    marginBottom: 8,
  },
  postBody: {
    ...textStyles.postBody,
  },
  lockedTextSkeleton: {
    gap: 10,
    paddingVertical: 4,
  },
  lockedTitleSkeleton: {
    width: 165,
    height: 26,
    borderRadius: 22,
    backgroundColor: colors.surfaceMuted,
  },
  lockedPreviewSkeleton: {
    width: "100%",
    height: 40,
    borderRadius: 22,
    backgroundColor: colors.surfaceMuted,
  },
});
