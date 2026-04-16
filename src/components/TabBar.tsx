import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';
import { colors, spacing, borderRadius, typography } from '../tokens/design';
import type { Tier } from '../types/api';

interface TabBarProps {
  activeTier: Tier;
  onSelect: (tier: Tier) => void;
}

const TABS: { key: Tier; label: string }[] = [
  { key: 'all', label: 'Все' },
  { key: 'free', label: 'Бесплатные' },
  { key: 'paid', label: 'Платные' },
];

export const TabBar = observer(({ activeTier, onSelect }: TabBarProps) => {
  return (
    <View style={styles.container}>
      {TABS.map((tab) => {
        const isActive = activeTier === tab.key;
        return (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, isActive && styles.tabActive]}
            onPress={() => onSelect(tab.key)}
            activeOpacity={0.7}
          >
            <Text style={[styles.label, isActive && styles.labelActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tab: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    backgroundColor: colors.background,
  },
  tabActive: {
    backgroundColor: colors.primary,
  },
  label: {
    fontSize: typography.sm,
    fontWeight: typography.medium,
    color: colors.textSecondary,
  },
  labelActive: {
    color: colors.textOnPrimary,
    fontWeight: typography.semiBold,
  },
});
