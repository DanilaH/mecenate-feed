import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { colors, spacing, borderRadius } from "../tokens/design";
import type { StyleProp, ViewStyle } from "react-native";

function SkeletonBox({ style }: { style?: StyleProp<ViewStyle> }) {
  const opacity = useSharedValue(0.4);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 700 }),
        withTiming(0.4, { duration: 700 }),
      ),
      -1,
    );
  }, [opacity]);

  return <Animated.View style={[styles.skeleton, style, animatedStyle]} />;
}

export function SkeletonCard() {
  return (
    <View style={styles.card}>
      <View style={styles.authorRow}>
        <SkeletonBox style={styles.avatar} />
        <SkeletonBox style={styles.authorName} />
      </View>

      <SkeletonBox style={styles.cover} />

      <View style={styles.textBlock}>
        <SkeletonBox style={styles.titleLine} />
        <SkeletonBox style={styles.bodyLine} />
        <SkeletonBox style={styles.bodyLineShort} />
      </View>

      <View style={styles.actionsRow}>
        <SkeletonBox style={styles.actionItem} />
        <SkeletonBox style={styles.actionItem} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: borderRadius.sm,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
  },
  authorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    padding: spacing.lg,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  authorName: {
    width: 120,
    height: 14,
  },
  cover: {
    width: "100%",
    aspectRatio: 295 / 264,
    borderRadius: 0,
  },
  textBlock: {
    padding: spacing.lg,
    gap: spacing.sm,
  },
  titleLine: {
    width: "70%",
    height: 18,
  },
  bodyLine: {
    width: "100%",
    height: 13,
  },
  bodyLineShort: {
    width: "55%",
    height: 13,
  },
  actionsRow: {
    flexDirection: "row",
    gap: spacing.lg,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  actionItem: {
    width: 48,
    height: 20,
  },
});
