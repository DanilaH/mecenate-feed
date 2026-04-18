import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { observer } from "mobx-react-lite";
import { colors, typography } from "../tokens/design";
import type { Tier } from "../types/api";

interface TabBarProps {
  activeTier: Tier;
  onSelect: (tier: Tier) => void;
}

const TABS: { key: Tier; label: string }[] = [
  { key: "all", label: "Все" },
  { key: "free", label: "Бесплатные" },
  { key: "paid", label: "Платные" },
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
    flexDirection: "row",
    backgroundColor: colors.surface,
    width: "100%",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E2E5EA",
    borderRadius: 999,
    overflow: "hidden",
    height: 38,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 22,
  },
  tabActive: {
    backgroundColor: colors.primary,
  },
  label: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: typography.medium,
    fontFamily: typography.family.medium,
    color: "#57626F",
  },
  labelActive: {
    color: colors.textOnPrimary,
    fontWeight: typography.semiBold,
    fontFamily: typography.family.semiBold,
  },
});
