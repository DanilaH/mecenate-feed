import React from "react";
import { StyleSheet, View } from "react-native";
import { colors } from "../../../tokens/design";

export function PostDetailSkeleton() {
  return (
    <View style={styles.skeletonCard}>
      <View style={styles.skeletonAuthor}>
        <View style={styles.skeletonAvatar} />
        <View style={styles.skeletonAuthorName} />
      </View>
      <View style={styles.skeletonCover} />
      <View style={styles.skeletonContent}>
        <View style={styles.skeletonTitle} />
        <View style={styles.skeletonLine} />
      </View>
      <View style={styles.skeletonActions}>
        <View style={styles.skeletonAction} />
        <View style={styles.skeletonAction} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  skeletonCard: {
    marginTop: 30,
    borderRadius: 12,
    backgroundColor: colors.surface,
    overflow: "hidden",
  },
  skeletonAuthor: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    gap: 10,
  },
  skeletonAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.surfaceMuted,
  },
  skeletonAuthorName: {
    width: 120,
    height: 14,
    borderRadius: 12,
    backgroundColor: colors.surfaceMuted,
  },
  skeletonCover: {
    width: "100%",
    aspectRatio: 295 / 264,
    backgroundColor: colors.surfaceMuted,
  },
  skeletonContent: {
    padding: 14,
    gap: 10,
  },
  skeletonTitle: {
    width: 140,
    height: 18,
    borderRadius: 12,
    backgroundColor: colors.surfaceMuted,
  },
  skeletonLine: {
    width: "100%",
    height: 16,
    borderRadius: 12,
    backgroundColor: colors.surfaceMuted,
  },
  skeletonActions: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 14,
    paddingBottom: 14,
  },
  skeletonAction: {
    width: 64,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.surfaceMuted,
  },
});
