import React from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ErrorState } from "../components/ErrorState";
import type { RootStackParamList } from "../navigation/types";
import { CenteredContent, ScreenShell } from "../shared/ui";
import { PostDetailCard } from "./post-detail/components/PostDetailCard";
import { PostDetailLayout } from "./post-detail/components/PostDetailLayout";
import { PostDetailSkeleton } from "./post-detail/components/PostDetailSkeleton";
import { usePostDetailViewModel } from "./post-detail/model/usePostDetailViewModel";

type Props = NativeStackScreenProps<RootStackParamList, "PostDetail">;

export function PostDetailScreen({ navigation, route }: Props) {
  const { postId } = route.params;
  const insets = useSafeAreaInsets();
  const detail = usePostDetailViewModel(postId);

  if (detail.isLoading) {
    return (
      <ScreenShell edges={["top", "left", "right"]}>
        <CenteredContent>
          <PostDetailSkeleton />
        </CenteredContent>
      </ScreenShell>
    );
  }

  if (detail.isError || !detail.post) {
    return (
      <ScreenShell edges={["top", "left", "right"]}>
        <ErrorState onRetry={detail.refetchPost} />
      </ScreenShell>
    );
  }

  return (
    <PostDetailLayout
      comments={detail.comments}
      commentsEnabled={detail.commentsEnabled}
      isFetchingNextPage={detail.isFetchingNextPage}
      isCommentSubmitting={detail.isCommentSubmitting}
      bottomInset={insets.bottom}
      onEndReached={detail.fetchMoreComments}
      onSubmitComment={detail.submitComment}
      header={
        <PostDetailCard
          post={detail.post}
          sortMode={detail.sortMode}
          commentsEnabled={detail.commentsEnabled}
          likePending={detail.isLikePending}
          onBack={navigation.goBack}
          onToggleLike={detail.toggleLike}
          onToggleSort={detail.toggleSort}
        />
      }
    />
  );
}
