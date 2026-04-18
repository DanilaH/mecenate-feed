import React from "react";
import { StyleSheet, View } from "react-native";
import { CommentInputField } from "./comment-input/CommentInputField";
import { CommentSendButton } from "./comment-input/CommentSendButton";
import { useCommentInput } from "./comment-input/useCommentInput";
import { colors } from "../tokens/design";
import type { StyleProp, ViewStyle } from "react-native";

interface CommentInputProps {
  onSubmit: (text: string) => boolean | void | Promise<boolean | void>;
  disabled?: boolean;
  bottomInset?: number;
  contentStyle?: StyleProp<ViewStyle>;
}

export function CommentInput({
  onSubmit,
  disabled = false,
  bottomInset = 0,
  contentStyle,
}: CommentInputProps) {
  const input = useCommentInput({ disabled, onSubmit });

  return (
    <View style={styles.wrapper}>
      <View
        style={[
          styles.container,
          contentStyle,
          { paddingBottom: 14 + bottomInset },
        ]}
      >
        <CommentInputField
          value={input.value}
          onChangeText={input.setValue}
          disabled={disabled}
          editable={!disabled && !input.isSubmitting}
          hasText={input.hasText}
          isFocused={input.isFocused}
          onSubmitEditing={input.submit}
          onFocus={input.onFocus}
          onBlur={input.onBlur}
        />
        <CommentSendButton disabled={!input.canSubmit} onPress={input.submit} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background,
    paddingTop: 16,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 30,
    paddingTop: 12,
    paddingBottom: 14,
    backgroundColor: colors.surface,
  },
});
