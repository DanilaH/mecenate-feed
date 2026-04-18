import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { Image } from "expo-image";

interface CommentSendButtonProps {
  disabled: boolean;
  onPress: () => void;
}

export function CommentSendButton({
  disabled,
  onPress,
}: CommentSendButtonProps) {
  return (
    <Pressable
      style={styles.sendButton}
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel="Отправить комментарий"
      accessibilityState={{ disabled }}
    >
      <Image
        source={require("../../../assets/paper-plane-icon.svg")}
        style={[styles.sendIcon, disabled && styles.sendIconDisabled]}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  sendButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  sendIcon: {
    width: 20,
    height: 19,
  },
  sendIconDisabled: {
    opacity: 0.28,
  },
});
