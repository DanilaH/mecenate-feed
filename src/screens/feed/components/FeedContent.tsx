import React from "react";
import { StyleSheet, View } from "react-native";
import { EmptyState } from "../../../components/EmptyState";
import { ErrorState } from "../../../components/ErrorState";
import { colors } from "../../../tokens/design";
import type { Post } from "../../../types/api";
import { FeedList } from "./FeedList";
import { FeedLoading } from "./FeedLoading";

interface FeedContentProps {
  posts: Post[];
  isLoading: boolean;
  isError: boolean;
  isRefetching: boolean;
  isFetchingNextPage: boolean;
  onRetry: () => void;
  onResetTier: () => void;
  onEndReached: () => void;
  onLike: (postId: string) => void;
  onPostPress: (postId: string) => void;
}

export function FeedContent({
  posts,
  isLoading,
  isError,
  isRefetching,
  isFetchingNextPage,
  onRetry,
  onResetTier,
  onEndReached,
  onLike,
  onPostPress,
}: FeedContentProps) {
  if (isLoading) {
    return <FeedLoading />;
  }

  if (isError) {
    return (
      <View style={styles.content}>
        <ErrorState onRetry={onRetry} />
      </View>
    );
  }

  if (posts.length === 0) {
    return (
      <View style={styles.content}>
        <EmptyState onHome={onResetTier} />
      </View>
    );
  }

  return (
    <FeedList
      posts={posts}
      isRefetching={isRefetching}
      isFetchingNextPage={isFetchingNextPage}
      onRetry={onRetry}
      onEndReached={onEndReached}
      onLike={onLike}
      onPostPress={onPostPress}
    />
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
