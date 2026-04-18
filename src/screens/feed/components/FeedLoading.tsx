import React from "react";
import { StyleSheet, View } from "react-native";
import { SkeletonCard } from "../../../components/SkeletonCard";
import { CenteredContent } from "../../../shared/ui";
import { colors } from "../../../tokens/design";

export function FeedLoading() {
  return (
    <View style={styles.content}>
      <CenteredContent>
        <SkeletonCard />
      </CenteredContent>
      <CenteredContent>
        <SkeletonCard />
      </CenteredContent>
      <CenteredContent>
        <SkeletonCard />
      </CenteredContent>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
