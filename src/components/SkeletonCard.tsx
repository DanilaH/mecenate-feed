import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { colors, spacing, borderRadius } from '../tokens/design';

function SkeletonBox({ style }: { style?: object }) {
  const opacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 700, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.4, duration: 700, useNativeDriver: true }),
      ])
    ).start();
  }, [opacity]);

  return (
    <Animated.View
      style={[styles.skeleton, style, { opacity }]}
    />
  );
}

export function SkeletonCard() {
  return (
    <View style={styles.card}>
      {/* Author row */}
      <View style={styles.authorRow}>
        <SkeletonBox style={styles.avatar} />
        <SkeletonBox style={styles.authorName} />
      </View>

      {/* Cover image */}
      <SkeletonBox style={styles.cover} />

      {/* Text */}
      <View style={styles.textBlock}>
        <SkeletonBox style={styles.titleLine} />
        <SkeletonBox style={styles.bodyLine} />
        <SkeletonBox style={styles.bodyLineShort} />
      </View>

      {/* Actions */}
      <View style={styles.actionsRow}>
        <SkeletonBox style={styles.actionItem} />
        <SkeletonBox style={styles.actionItem} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: colors.border,
    borderRadius: borderRadius.sm,
  },
  card: {
    backgroundColor: colors.surface,
    marginBottom: spacing.sm,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
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
    width: '100%',
    height: 200,
    borderRadius: 0,
  },
  textBlock: {
    padding: spacing.lg,
    gap: spacing.sm,
  },
  titleLine: {
    width: '70%',
    height: 18,
  },
  bodyLine: {
    width: '100%',
    height: 13,
  },
  bodyLineShort: {
    width: '55%',
    height: 13,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: spacing.lg,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  actionItem: {
    width: 48,
    height: 20,
  },
});
