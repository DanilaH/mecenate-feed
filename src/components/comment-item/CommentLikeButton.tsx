import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { Image } from "expo-image";
import { HeartBlankIcon } from "../icons";
import { colors, typography } from "../../tokens/design";

interface CommentLikeButtonProps {
  isLiked: boolean;
  likesCount: number;
  onPress: () => void;
}

export function CommentLikeButton({
  isLiked,
  likesCount,
  onPress,
}: CommentLikeButtonProps) {
  return (
    <Pressable
      style={styles.like}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Лайки комментария: ${likesCount}`}
      accessibilityState={{ selected: isLiked }}
    >
      {isLiked ? (
        <Image
          source={require("../../../assets/heart-filled-red-icon.svg")}
          style={styles.heartIcon}
          contentFit="contain"
        />
      ) : (
        <HeartBlankIcon size={15} color={colors.textSecondary} />
      )}
      <Text style={[styles.likeCount, isLiked && styles.likeCountActive]}>
        {likesCount}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  like: {
    minWidth: 34,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 7,
  },
  heartIcon: {
    width: 15,
    height: 13,
  },
  likeCount: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: typography.bold,
    fontFamily: typography.family.bold,
  },
  likeCountActive: {
    color: colors.liked,
  },
});
