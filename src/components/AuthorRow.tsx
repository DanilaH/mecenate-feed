import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { colors, spacing, typography } from "../tokens/design";
import type { Author } from "../types/api";

interface AuthorRowProps {
  author: Author;
}

export function AuthorRow({ author }: AuthorRowProps) {
  const initials = author.displayName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <View style={styles.container}>
      <View style={styles.avatarWrapper}>
        {author.avatarUrl ? (
          <Image
            source={{ uri: author.avatarUrl }}
            style={styles.avatar}
            contentFit="cover"
            transition={200}
          />
        ) : (
          <View style={[styles.avatar, styles.avatarFallback]}>
            <Text style={styles.initials}>{initials}</Text>
          </View>
        )}
      </View>
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {author.displayName}
        </Text>
        {author.isVerified && <Text style={styles.verified}>✓</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 30,
    paddingVertical: 14,
  },
  avatarWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: "hidden",
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  avatarFallback: {
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  initials: {
    color: colors.textOnPrimary,
    fontSize: typography.sm,
    fontWeight: typography.bold,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    flex: 1,
  },
  name: {
    fontSize: 12,
    lineHeight: 20,
    fontWeight: typography.bold,
    fontFamily: typography.family.bold,
    color: colors.text,
  },
  verified: {
    fontSize: typography.xs,
    color: colors.primary,
    fontWeight: typography.bold,
  },
});
