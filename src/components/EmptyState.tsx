import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, typography, borderRadius, shadow } from '../tokens/design';

interface EmptyStateProps {
  onHome?: () => void;
}

export function EmptyState({ onHome }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🦑</Text>
      <Text style={styles.title}>По вашему запросу ничего не найдено</Text>
      {onHome && (
        <TouchableOpacity style={styles.button} onPress={onHome} activeOpacity={0.85}>
          <Text style={styles.buttonText}>На главную</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xxxl,
    paddingVertical: spacing.xxxl * 2,
    gap: spacing.md,
  },
  emoji: {
    fontSize: 72,
    marginBottom: spacing.md,
  },
  title: {
    fontSize: typography.lg,
    fontWeight: typography.semiBold,
    color: colors.text,
    textAlign: 'center',
    lineHeight: 24,
  },
  button: {
    marginTop: spacing.lg,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xxxl * 1.5,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.full,
    ...shadow.button,
  },
  buttonText: {
    color: colors.textOnPrimary,
    fontSize: typography.md,
    fontWeight: typography.semiBold,
  },
});
