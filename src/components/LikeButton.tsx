import React, { useRef } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  View,
} from 'react-native';
import { observer } from 'mobx-react-lite';
import { colors, spacing, typography } from '../tokens/design';

interface LikeButtonProps {
  isLiked: boolean;
  likesCount: number;
  onPress: () => void;
}

export const LikeButton = observer(({ isLiked, likesCount, onPress }: LikeButtonProps) => {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scale, { toValue: 1.35, duration: 100, useNativeDriver: true }),
      Animated.timing(scale, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();
    onPress();
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      style={styles.container}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      accessibilityRole="button"
      accessibilityLabel={isLiked ? `Убрать лайк. Текущее количество: ${likesCount}` : `Лайкнуть. Текущее количество: ${likesCount}`}
      accessibilityState={{ selected: isLiked }}
    >
      <Animated.Text
        style={[styles.heart, isLiked && styles.heartLiked, { transform: [{ scale }] }]}
      >
        {isLiked ? '♥' : '♡'}
      </Animated.Text>
      <Text style={[styles.count, isLiked && styles.countLiked]}>
        {likesCount}
      </Text>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  heart: {
    fontSize: typography.lg,
    color: colors.textSecondary,
  },
  heartLiked: {
    color: colors.liked,
  },
  count: {
    fontSize: typography.sm,
    color: colors.textSecondary,
    fontWeight: typography.medium,
    minWidth: 16,
  },
  countLiked: {
    color: colors.liked,
  },
});
