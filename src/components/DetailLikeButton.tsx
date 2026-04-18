import React from "react";
import * as Haptics from "expo-haptics";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
} from "react-native-reanimated";
import { HeartBlankIcon, HeartFilledIcon } from "./icons";
import { ActionCounterButton } from "../shared/ui";
import { colors } from "../tokens/design";

interface DetailLikeButtonProps {
  isLiked: boolean;
  likesCount: number;
  onPress: () => void;
  disabled?: boolean;
}

export function DetailLikeButton({
  isLiked,
  likesCount,
  onPress,
  disabled = false,
}: DetailLikeButtonProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = async () => {
    if (disabled) return;
    scale.value = withSequence(withSpring(1.18), withSpring(1));
    await Haptics.selectionAsync();
    onPress();
  };

  return (
    <ActionCounterButton
      count={likesCount}
      selected={isLiked}
      disabled={disabled}
      onPress={handlePress}
      accessibilityLabel={
        isLiked
          ? `Убрать лайк. Текущее количество: ${likesCount}`
          : `Лайкнуть. Текущее количество: ${likesCount}`
      }
      icon={
        <Animated.View style={animatedStyle}>
          {isLiked ? (
            <HeartFilledIcon size={16} color={colors.textOnPrimary} />
          ) : (
            <HeartBlankIcon size={16} color={colors.textSecondary} />
          )}
        </Animated.View>
      }
    />
  );
}
