import React, { useCallback } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import { PostCard } from "../../../components/PostCard";
import { CenteredContent } from "../../../shared/ui";
import { colors, spacing } from "../../../tokens/design";
import type { Post } from "../../../types/api";

interface FeedListProps {
  posts: Post[];
  isRefetching: boolean;
  isFetchingNextPage: boolean;
  onRetry: () => void;
  onEndReached: () => void;
  onLike: (postId: string) => void;
  onPostPress: (postId: string) => void;
}

export function FeedList({
  posts,
  isRefetching,
  isFetchingNextPage,
  onRetry,
  onEndReached,
  onLike,
  onPostPress,
}: FeedListProps) {
  const renderItem = useCallback(
    ({ item }: { item: Post }) => (
      <CenteredContent>
        <PostCard
          post={item}
          onLike={onLike}
          onComment={onPostPress}
          onPress={onPostPress}
        />
      </CenteredContent>
    ),
    [onLike, onPostPress],
  );

  const keyExtractor = useCallback((item: Post) => item.id, []);

  const ListFooter = useCallback(() => {
    if (!isFetchingNextPage) return <View style={styles.bottomPad} />;

    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" color={colors.primary} />
      </View>
    );
  }, [isFetchingNextPage]);

  return (
    <FlatList
      data={posts}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.4}
      ListFooterComponent={ListFooter}
      refreshControl={
        <RefreshControl
          refreshing={isRefetching && !isFetchingNextPage}
          onRefresh={onRetry}
          tintColor={colors.primary}
          colors={[colors.primary]}
        />
      }
      showsVerticalScrollIndicator={false}
      style={styles.list}
      contentContainerStyle={styles.listContent}
      windowSize={5}
      maxToRenderPerBatch={5}
      initialNumToRender={4}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    paddingBottom: spacing.xxxl,
  },
  footer: {
    paddingVertical: spacing.xl,
    alignItems: "center",
  },
  bottomPad: {
    height: spacing.xxxl,
  },
});
