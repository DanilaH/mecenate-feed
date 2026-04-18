import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { POST_HORIZONTAL_PADDING, textStyles } from "../../shared/ui";
import { colors } from "../../tokens/design";
import type { Post } from "../../types/api";

interface PostTextContentProps {
  post: Post;
  isPaid: boolean;
  onPress?: () => void;
}

export function PostTextContent({
  post,
  isPaid,
  onPress,
}: PostTextContentProps) {
  const [expanded, setExpanded] = useState(false);
  const hasBody = Boolean(post.body?.trim());
  const textToShow = expanded && hasBody ? post.body : post.preview;

  return (
    <Pressable
      style={styles.pressableArea}
      onPress={onPress}
      accessibilityRole="button"
    >
      <View style={styles.content}>
        {isPaid ? (
          <View style={styles.lockedTextSkeleton}>
            <View style={styles.lockedTitleSkeleton} />
            <View style={styles.lockedPreviewSkeleton} />
          </View>
        ) : textToShow ? (
          <>
            <Text style={styles.title} numberOfLines={2}>
              {post.title}
            </Text>
            <View style={styles.previewContainer}>
              <Text style={styles.preview}>
                {textToShow}
                {hasBody && !expanded ? (
                  <Text
                    style={styles.showMoreText}
                    onPress={() => setExpanded(true)}
                    suppressHighlighting
                  >
                    {" "}
                    Показать ещё
                  </Text>
                ) : null}
              </Text>
            </View>
          </>
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressableArea: {
    backgroundColor: colors.surface,
  },
  content: {
    paddingHorizontal: POST_HORIZONTAL_PADDING,
    paddingTop: 12,
    paddingBottom: 8,
  },
  title: {
    ...textStyles.postTitle,
    marginBottom: 8,
  },
  previewContainer: {
    marginBottom: 8,
  },
  preview: {
    ...textStyles.postBody,
  },
  showMoreText: {
    ...textStyles.bodyLink,
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
