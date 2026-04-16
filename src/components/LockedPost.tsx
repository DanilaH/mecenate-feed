import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, typography, shadow } from '../tokens/design';

interface LockedPostProps {
  onSubscribe?: () => void;
}

export function LockedPost({ onSubscribe }: LockedPostProps) {
  return (
    <View style={styles.container}>
      <View style={styles.blurOverlay}>
        <Text style={styles.previewText} numberOfLines={3}>
          Этот пост доступен только подписчикам. Поддержите автора, чтобы читать эксклюзивный контент...
        </Text>
      </View>
      <View style={styles.lockBadge}>
        <Text style={styles.lockIcon}>🔒</Text>
        <Text style={styles.lockText}>Только для подписчиков</Text>
        <TouchableOpacity
          style={styles.subscribeButton}
          onPress={onSubscribe}
          activeOpacity={0.85}
        >
          <Text style={styles.subscribeText}>Подписаться</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
    backgroundColor: colors.primaryLight,
    borderWidth: 1,
    borderColor: colors.primary + '30',
  },
  blurOverlay: {
    padding: spacing.lg,
    opacity: 0.4,
  },
  previewText: {
    fontSize: typography.md,
    lineHeight: 22,
    color: colors.text,
  },
  lockBadge: {
    alignItems: 'center',
    paddingBottom: spacing.xl,
    paddingHorizontal: spacing.xl,
    gap: spacing.sm,
  },
  lockIcon: {
    fontSize: 28,
  },
  lockText: {
    fontSize: typography.sm,
    color: colors.primary,
    fontWeight: typography.semiBold,
    textAlign: 'center',
  },
  subscribeButton: {
    marginTop: spacing.sm,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xxxl,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.full,
    ...shadow.button,
  },
  subscribeText: {
    color: colors.textOnPrimary,
    fontSize: typography.md,
    fontWeight: typography.semiBold,
  },
});
