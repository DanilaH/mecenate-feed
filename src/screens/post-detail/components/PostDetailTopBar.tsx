import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { POST_HORIZONTAL_PADDING } from "../../../shared/ui";
import { colors, typography } from "../../../tokens/design";

interface PostDetailTopBarProps {
  onBack: () => void;
}

export function PostDetailTopBar({ onBack }: PostDetailTopBarProps) {
  return (
    <View style={styles.header}>
      <Pressable
        style={styles.backButton}
        onPress={onBack}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        accessibilityRole="button"
        accessibilityLabel="Назад"
      >
        <Text style={styles.backText}>‹</Text>
      </Pressable>
      <Text style={styles.headerTitle}>Детальный пост</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    minHeight: 42,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: POST_HORIZONTAL_PADDING,
    paddingTop: 2,
    paddingBottom: 6,
  },
  backButton: {
    width: 24,
    height: 32,
    alignItems: "flex-start",
    justifyContent: "center",
    marginRight: 8,
  },
  backText: {
    color: colors.text,
    fontSize: 24,
    lineHeight: 28,
    fontFamily: typography.family.medium,
    fontWeight: typography.medium,
  },
  headerTitle: {
    color: colors.textSubtle,
    fontSize: 13,
    lineHeight: 18,
    fontFamily: typography.family.medium,
    fontWeight: typography.medium,
  },
});
