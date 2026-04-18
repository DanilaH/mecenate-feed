import { useState } from "react";

type SubmitComment = (text: string) => boolean | void | Promise<boolean | void>;

interface UseCommentInputParams {
  disabled: boolean;
  onSubmit: SubmitComment;
}

export function useCommentInput({ disabled, onSubmit }: UseCommentInputParams) {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const trimmedValue = value.trim();
  const hasText = value.length > 0;
  const canSubmit = Boolean(trimmedValue) && !disabled && !isSubmitting;

  const submit = async () => {
    if (!canSubmit) return;

    setIsSubmitting(true);
    try {
      const result = await onSubmit(trimmedValue);
      if (result !== false) {
        setValue("");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    value,
    setValue,
    hasText,
    isFocused,
    isSubmitting,
    canSubmit,
    submit,
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false),
  };
}
