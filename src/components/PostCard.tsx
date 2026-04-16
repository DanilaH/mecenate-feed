import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { observer } from 'mobx-react-lite';
import { AuthorRow } from './AuthorRow';
import { LikeButton } from './LikeButton';
import { LockedPost } from './LockedPost';
import { feedStore } from '../stores/FeedStore';
import { colors, spacing, typography, shadow } from '../tokens/design';
import type { Post } from '../types/api';

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
}

export const PostCard = React.memo(observer(({ post, onLike }: PostCardProps) => {
  const { isLiked, likesCount } = feedStore.getPostLikeState(
    post.id,
    post.isLiked,
    post.likesCount,
  );

  const isPaid = post.tier === 'paid';

  return (
    <View style={styles.card}>
      <AuthorRow author={post.author} />

      {post.coverUrl ? (
        <Image
          source={{ uri: post.coverUrl }}
          style={styles.cover}
          contentFit="cover"
          transition={300}
        />
      ) : null}

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {post.title}
        </Text>

        {isPaid ? (
          <LockedPost />
        ) : (
          post.preview ? (
            <Text style={styles.preview} numberOfLines={3}>
              {post.preview}
            </Text>
          ) : null
        )}
      </View>

      <View style={styles.actions}>
        <LikeButton
          isLiked={isLiked}
          likesCount={likesCount}
          onPress={() => onLike(post.id)}
        />
        <View style={styles.commentCounter}>
          <Text style={styles.commentIcon}>💬</Text>
          <Text style={styles.countText}>{post.commentsCount}</Text>
        </View>
      </View>
    </View>
  );
}));

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    marginBottom: spacing.sm,
    ...shadow.card,
  },
  cover: {
    width: '100%',
    height: 220,
    backgroundColor: colors.border,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    gap: spacing.sm,
  },
  title: {
    fontSize: typography.lg,
    fontWeight: typography.bold,
    color: colors.text,
    lineHeight: 24,
  },
  preview: {
    fontSize: typography.md,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xl,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  commentCounter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  commentIcon: {
    fontSize: typography.lg,
  },
  countText: {
    fontSize: typography.sm,
    color: colors.textSecondary,
    fontWeight: typography.medium,
  },
});
