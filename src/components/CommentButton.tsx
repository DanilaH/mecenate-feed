import React from "react";
import { CommentIcon } from "./icons";
import { ActionCounterButton } from "../shared/ui";
import { colors } from "../tokens/design";

interface CommentButtonProps {
  commentsCount: number;
  onPress?: () => void;
  disabled?: boolean;
}

export function CommentButton({
  commentsCount,
  onPress,
  disabled = false,
}: CommentButtonProps) {
  return (
    <ActionCounterButton
      count={commentsCount}
      icon={<CommentIcon size={15} color={colors.textSecondary} />}
      onPress={onPress}
      disabled={disabled}
      accessibilityLabel={`Комментарии: ${commentsCount}`}
    />
  );
}
