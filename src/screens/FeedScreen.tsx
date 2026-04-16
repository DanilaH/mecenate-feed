import React, { useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
  FlatList,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { observer } from 'mobx-react-lite';
import { PostCard } from '../components/PostCard';
import { TabBar } from '../components/TabBar';
import { SkeletonCard } from '../components/SkeletonCard';
import { ErrorState } from '../components/ErrorState';
import { EmptyState } from '../components/EmptyState';
import { useFeed, useToggleLike } from '../hooks/useFeed';
import { feedStore } from '../stores/FeedStore';
import { colors, spacing, typography } from '../tokens/design';
import type { Post, Tier } from '../types/api';

export const FeedScreen = observer(() => {
  const tier = feedStore.activeTier;

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isRefetching,
    isError,
    refetch,
  } = useFeed(tier);

  const { mutate: toggleLike } = useToggleLike();

  const posts: Post[] = data?.pages.flatMap((p) => p.data.posts) ?? [];

  const onEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const renderItem = useCallback(
    ({ item }: { item: Post }) => <PostCard post={item} onLike={toggleLike} />,
    [] // mutation function is stable, no need to add to dependencies
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

  const renderBody = () => {
    if (isLoading) {
      return (
        <View style={styles.content}>
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </View>
      );
    }

    if (isError) {
      return (
        <View style={styles.content}>
          <ErrorState onRetry={refetch} />
        </View>
      );
    }

    if (posts.length === 0) {
      return (
        <View style={styles.content}>
          <EmptyState />
        </View>
      );
    }

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
            onRefresh={refetch}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
        showsVerticalScrollIndicator={false}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        removeClippedSubviews={true}
        windowSize={5}
        maxToRenderPerBatch={5}
        initialNumToRender={4}
      />
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.surface} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mecenate</Text>
      </View>

      {/* Tab Bar */}
      <TabBar activeTier={tier} onSelect={(t: Tier) => feedStore.setTier(t)} />

      {/* Content */}
      {renderBody()}
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  header: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: typography.xl,
    fontWeight: typography.bold,
    color: colors.primary,
    letterSpacing: -0.5,
  },
  content: {
    flex: 1,
    backgroundColor: colors.background,
  },
  list: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    paddingBottom: spacing.xxxl,
  },
  footer: {
    paddingVertical: spacing.xl,
    alignItems: 'center',
  },
  bottomPad: {
    height: spacing.xxxl,
  },
});
