import React, { useCallback } from "react";
import { StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { observer } from "mobx-react-lite";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { RootStackParamList } from "../navigation/types";
import { ScreenShell } from "../shared/ui";
import { spacing, colors } from "../tokens/design";
import { FeedContent } from "./feed/components/FeedContent";
import { FeedTabs } from "./feed/components/FeedTabs";
import { useFeedViewModel } from "./feed/model/useFeedViewModel";

export const FeedScreen = observer(() => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, "Feed">>();
  const insets = useSafeAreaInsets();
  const feed = useFeedViewModel();

  const onPostPress = useCallback(
    (postId: string) => {
      navigation.navigate("PostDetail", { postId });
    },
    [navigation],
  );

  return (
    <ScreenShell contentStyle={{ paddingTop: insets.top + spacing.md }}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <FeedTabs activeTier={feed.tier} onSelect={feed.selectTier} />

      <FeedContent
        posts={feed.posts}
        isLoading={feed.isLoading}
        isError={feed.isError}
        isRefetching={feed.isRefetching}
        isFetchingNextPage={feed.isFetchingNextPage}
        onRetry={feed.refetch}
        onResetTier={feed.resetTier}
        onEndReached={feed.fetchMore}
        onLike={feed.toggleLike}
        onPostPress={onPostPress}
      />
    </ScreenShell>
  );
});
