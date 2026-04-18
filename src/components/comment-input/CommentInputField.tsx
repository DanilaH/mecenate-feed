import React from "react";
import { StyleSheet, TextInput } from "react-native";
import { colors, typography } from "../../tokens/design";

const COMMENT_PLACEHOLDER = "Ваш комментарий";

interface CommentInputFieldProps {
  value: string;
  disabled: boolean;
  editable: boolean;
  hasText: boolean;
  isFocused: boolean;
  onChangeText: (value: string) => void;
  onSubmitEditing: () => void;
  onFocus: () => void;
  onBlur: () => void;
}

export function CommentInputField({
  value,
  disabled,
  editable,
  hasText,
  isFocused,
  onChangeText,
  onSubmitEditing,
  onFocus,
  onBlur,
}: CommentInputFieldProps) {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={COMMENT_PLACEHOLDER}
      placeholderTextColor={
        disabled ? colors.textDisabledLight : colors.textTertiary
      }
      style={[
        styles.input,
        isFocused && styles.inputFocused,
        hasText && styles.inputWithText,
        disabled && styles.inputDisabled,
      ]}
      editable={editable}
      returnKeyType="send"
      onSubmitEditing={onSubmitEditing}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.inputBorder,
    backgroundColor: colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 10,
    color: colors.textSecondary,
    fontSize: 15,
    lineHeight: 20,
    fontFamily: typography.family.medium,
    fontWeight: typography.medium,
  },
  inputFocused: {
    backgroundColor: colors.inputFocused,
  },
  inputWithText: {
    backgroundColor: colors.surface,
    borderColor: colors.inputBorder,
    color: colors.text,
  },
  inputDisabled: {
    backgroundColor: colors.surface,
    color: colors.textDisabledLight,
  },
});
