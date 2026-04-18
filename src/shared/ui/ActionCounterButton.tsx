import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import type { StyleProp, TextStyle, ViewStyle } from "react-native";
import { colors, typography } from "../../tokens/design";

interface ActionCounterButtonProps {
  count: number;
  icon: React.ReactNode;
  onPress?: () => void;
  selected?: boolean;
  disabled?: boolean;
  accessibilityLabel: string;
  countStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
}

export function ActionCounterButton({
  count,
  icon,
  onPress,
  selected = false,
  disabled = false,
  accessibilityLabel,
  countStyle,
  style,
}: ActionCounterButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      style={[styles.container, selected && styles.containerSelected, style]}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ selected, disabled }}
    >
      {icon}
      <Text
        style={[styles.count, selected && styles.countSelected, countStyle]}
      >
        {count}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surfaceMuted,
    borderRadius: 20,
    minWidth: 63,
    height: 36,
    paddingLeft: 6,
    paddingRight: 12,
    paddingVertical: 9,
    gap: 4,
  },
  containerSelected: {
    backgroundColor: colors.liked,
  },
  count: {
    fontSize: 13,
    lineHeight: 18,
    fontFamily: typography.family.bold,
    fontWeight: typography.bold,
    color: colors.textSecondary,
    flexShrink: 0,
  },
  countSelected: {
    color: colors.textOnPrimary,
  },
});
