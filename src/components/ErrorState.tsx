import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { PrimaryButton } from "./PrimaryButton";
import { colors, typography } from "../tokens/design";

interface ErrorStateProps {
  onRetry: () => void;
  loading?: boolean;
}

export function ErrorState({ onRetry, loading = false }: ErrorStateProps) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/sad-axolotl.svg")}
        style={styles.image}
        contentFit="contain"
      />
      <Text style={styles.title}>Не удалось загрузить публикации</Text>
      <PrimaryButton title="Повторить" onPress={onRetry} loading={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 18,
    paddingTop: 54,
    gap: 16,
  },
  image: {
    width: 126,
    height: 126,
    marginBottom: 0,
  },
  title: {
    fontSize: 18,
    fontWeight: typography.bold,
    fontFamily: typography.family.bold,
    color: colors.text,
    textAlign: "center",
    lineHeight: 26,
  },
});
