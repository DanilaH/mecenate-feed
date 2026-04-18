import React from "react";
import { StyleSheet, View } from "react-native";
import type { StyleProp, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { SafeAreaViewProps } from "react-native-safe-area-context";
import { colors } from "../../tokens/design";

interface ScreenShellProps {
  children: React.ReactNode;
  edges?: SafeAreaViewProps["edges"];
  contentStyle?: StyleProp<ViewStyle>;
}

export function ScreenShell({
  children,
  edges = ["left", "right", "bottom"],
  contentStyle,
}: ScreenShellProps) {
  return (
    <SafeAreaView style={styles.safeArea} edges={edges}>
      <View style={[styles.appShell, contentStyle]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.background,
  },
  appShell: {
    flex: 1,
    width: "100%",
    backgroundColor: colors.background,
  },
});
