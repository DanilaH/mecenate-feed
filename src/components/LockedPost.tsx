import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import { colors, typography } from "../tokens/design";

interface LockedPostProps {
  onDonate?: () => void;
}

export function LockedPost({ onDonate }: LockedPostProps) {
  return (
    <BlurView intensity={64} tint="dark" style={StyleSheet.absoluteFill}>
      <View style={styles.overlay}>
        <Image
          source={require("../../assets/money.svg")}
          style={styles.moneyIcon}
          contentFit="contain"
        />
        <Text style={styles.message}>
          Контент скрыт пользователем.{"\n"}Доступ откроется после доната
        </Text>
        <TouchableOpacity
          style={styles.donateButton}
          onPress={onDonate}
          activeOpacity={0.85}
          accessibilityRole="button"
        >
          <Text style={styles.donateText}>Отправить донат</Text>
        </TouchableOpacity>
      </View>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  moneyIcon: {
    width: 42,
    height: 42,
    marginBottom: 16,
  },
  message: {
    color: colors.textOnPrimary,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: typography.semiBold,
    fontFamily: typography.family.semiBold,
    textAlign: "center",
    marginBottom: 16,
  },
  donateButton: {
    width: 239,
    height: 42,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  donateText: {
    color: colors.textOnPrimary,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: typography.semiBold,
    fontFamily: typography.family.semiBold,
  },
});
