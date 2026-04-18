import React from "react";
import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import { LockedPost } from "../../../components/LockedPost";
import { POST_COVER_ASPECT_RATIO } from "../../../shared/ui";

interface PostDetailMediaProps {
  coverUrl?: string;
  isPaid: boolean;
}

export function PostDetailMedia({ coverUrl, isPaid }: PostDetailMediaProps) {
  if (!coverUrl) return null;

  return (
    <View style={styles.coverContainer}>
      <Image
        source={{ uri: coverUrl }}
        style={styles.cover}
        contentFit="cover"
      />
      {isPaid && <LockedPost />}
    </View>
  );
}

const styles = StyleSheet.create({
  coverContainer: {
    width: "100%",
    aspectRatio: POST_COVER_ASPECT_RATIO,
    overflow: "hidden",
  },
  cover: {
    width: "100%",
    height: "100%",
  },
});
