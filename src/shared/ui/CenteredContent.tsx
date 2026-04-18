import React from "react";
import { StyleSheet, View } from "react-native";
import type { StyleProp, ViewStyle } from "react-native";

export const CONTENT_MAX_WIDTH = 430;

export const contentWidthStyles = StyleSheet.create({
  centered: {
    width: "100%",
    maxWidth: CONTENT_MAX_WIDTH,
    alignSelf: "center",
  },
});

interface CenteredContentProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function CenteredContent({ children, style }: CenteredContentProps) {
  return <View style={[contentWidthStyles.centered, style]}>{children}</View>;
}
