import React from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { observer } from "mobx-react-lite";
import { HeartBlankIcon, HeartFilledIcon } from "./icons";
import { ActionCounterButton } from "../shared/ui";
import { colors, typography } from "../tokens/design";

interface LikeButtonProps {
  isLiked: boolean;
  likesCount: number;
  onPress: () => void;
}

export const LikeButton = observer(
  ({ isLiked, likesCount, onPress }: LikeButtonProps) => {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
    }));

    const handlePress = () => {
      scale.value = withSequence(
        withTiming(1.15, { duration: 100 }),
        withTiming(1, { duration: 100 }),
      );
      onPress();
    };

    return (
      <ActionCounterButton
        count={likesCount}
        selected={isLiked}
        onPress={handlePress}
        accessibilityLabel={
          isLiked
            ? `Убрать лайк. Текущее количество: ${likesCount}`
            : `Лайкнуть. Текущее количество: ${likesCount}`
        }
        countStyle={{ fontFamily: typography.family.medium }}
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
  },
);
