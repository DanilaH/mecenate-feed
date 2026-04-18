import React from "react";
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import { CommentInput } from "../../../components/CommentInput";
import { CommentItem } from "../../../components/CommentItem";
import { ScreenShell, contentWidthStyles } from "../../../shared/ui";
import { colors } from "../../../tokens/design";
import type { Comment } from "../../../types/api";

interface PostDetailLayoutProps {
  comments: Comment[];
  header: React.ReactElement;
  commentsEnabled: boolean;
  isFetchingNextPage: boolean;
  isCommentSubmitting: boolean;
  bottomInset: number;
  onEndReached: () => void;
  onSubmitComment: (text: string) => Promise<boolean>;
}

export function PostDetailLayout({
  comments,
  header,
  commentsEnabled,
  isFetchingNextPage,
  isCommentSubmitting,
  bottomInset,
  onEndReached,
  onSubmitComment,
}: PostDetailLayoutProps) {
  return (
    <ScreenShell edges={["top", "left", "right"]}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoiding}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <FlatList
          data={comments}
          keyExtractor={(comment) => comment.id}
          renderItem={({ item }) => (
            <View style={styles.detailShell}>
              <CommentItem comment={item} />
            </View>
          )}
          onEndReached={commentsEnabled ? onEndReached : undefined}
          onEndReachedThreshold={0.4}
          ListHeaderComponent={<View style={styles.detailShell}>{header}</View>}
          ListFooterComponent={
            isFetchingNextPage ? (
              <View style={styles.commentsFooter}>
                <ActivityIndicator color={colors.primary} />
              </View>
            ) : (
              <View style={styles.detailCardFooter} />
            )
          }
          showsVerticalScrollIndicator={false}
        />
        {commentsEnabled ? (
          <CommentInput
            disabled={isCommentSubmitting}
            bottomInset={bottomInset}
            contentStyle={styles.detailShell}
            onSubmit={onSubmitComment}
          />
        ) : null}
      </KeyboardAvoidingView>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  keyboardAvoiding: {
    flex: 1,
  },
  detailShell: {
    ...contentWidthStyles.centered,
    backgroundColor: colors.surface,
  },
  detailCardFooter: {
    ...contentWidthStyles.centered,
    height: 12,
    backgroundColor: colors.surface,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    overflow: "hidden",
  },
  commentsFooter: {
    paddingVertical: 16,
    alignItems: "center",
  },
});
