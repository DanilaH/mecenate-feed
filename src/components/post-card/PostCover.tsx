import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { LockedPost } from "../LockedPost";
import { POST_COVER_ASPECT_RATIO } from "../../shared/ui";
import { colors } from "../../tokens/design";

interface PostCoverProps {
  coverUrl?: string;
  isPaid: boolean;
  onPress?: () => void;
}

export function PostCover({ coverUrl, isPaid, onPress }: PostCoverProps) {
  if (!coverUrl) return null;

  const cover = (
    <View style={styles.coverContainer}>
      <Image
        source={{ uri: coverUrl }}
        style={styles.cover}
        contentFit="cover"
        transition={300}
      />
      {isPaid && <LockedPost />}
    </View>
  );

  if (isPaid) {
    return cover;
  }

  return (
    <Pressable
      style={styles.pressableArea}
      onPress={onPress}
      accessibilityRole="button"
    >
      {cover}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressableArea: {
    backgroundColor: colors.surface,
  },
  coverContainer: {
    width: "100%",
    aspectRatio: POST_COVER_ASPECT_RATIO,
    overflow: "hidden",
  },
  cover: {
    width: "100%",
    height: "100%",
    backgroundColor: colors.border,
  },
});
