import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { PrimaryButton } from "./PrimaryButton";
import { colors, typography } from "../tokens/design";

interface EmptyStateProps {
  onHome?: () => void;
}

export function EmptyState({ onHome }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/sad-axolotl.svg")}
        style={styles.image}
        contentFit="contain"
      />
      <Text style={styles.title}>По вашему запросу ничего не найдено</Text>
      {onHome && <PrimaryButton title="На главную" onPress={onHome} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 34,
    paddingBottom: 96,
    gap: 14,
  },
  image: {
    width: 92,
    height: 92,
    marginBottom: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: typography.bold,
    fontFamily: typography.family.bold,
    color: colors.text,
    textAlign: "center",
    lineHeight: 20,
  },
});
