import { StyleSheet } from "react-native";
import { colors, typography } from "../../tokens/design";

export const textStyles = StyleSheet.create({
  postTitle: {
    color: colors.text,
    fontSize: 18,
    lineHeight: 26,
    fontWeight: typography.bold,
    fontFamily: typography.family.bold,
  },
  postBody: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: typography.medium,
    fontFamily: typography.family.medium,
  },
  bodySemiboldSecondary: {
    color: colors.textSecondary,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: typography.semiBold,
    fontFamily: typography.family.semiBold,
  },
  bodyLink: {
    color: colors.primary,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: typography.medium,
    fontFamily: typography.family.medium,
  },
});
