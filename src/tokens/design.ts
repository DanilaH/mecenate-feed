export const colors = {
  // Primary
  primary: "#6115CD",
  primaryPressed: "#4E11A4",
  primaryDisabled: "#D5C9FF",
  primaryLight: "#EFE5F9",

  // Backgrounds
  background: "#F5F8FD",
  surface: "#FFFFFF",
  surfaceElevated: "#FAFAFA",
  surfaceMuted: "#EFF1F4",
  inputBorder: "#EFF2F7",
  inputFocused: "#E6E9EF",

  // Text
  text: "#1A1A1A",
  textSecondary: "#57626F",
  textTertiary: "#A4AAB0",
  textSubtle: "#8D98A6",
  textDisabled: "#B9C0CA",
  textDisabledLight: "#DCDCDD",
  textOnPrimary: "#FFFFFF",

  // UI
  border: "#E2E5EA",
  divider: "#F0F0F0",

  // States
  liked: "#F42F75",
  likedBg: "#FFE0EC",
  error: "#EF4444",
  errorLight: "#FEF2F2",

  // Overlay
  overlay: "rgba(0,0,0,0.4)",
  overlayLight: "rgba(0,0,0,0.05)",

  // Locked post gradient
  lockedGradientStart: "rgba(255,255,255,0)",
  lockedGradientEnd: "rgba(255,255,255,1)",
} as const;

export const spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

export const borderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999,
} as const;

export const typography = {
  // Size
  xs: 11,
  sm: 13,
  md: 15,
  lg: 17,
  xl: 20,
  xxl: 24,

  // Weight
  regular: "400" as const,
  medium: "500" as const,
  semiBold: "600" as const,
  bold: "700" as const,

  // Family mapping
  family: {
    regular: "Manrope_400Regular",
    medium: "Manrope_500Medium",
    semiBold: "Manrope_600SemiBold",
    bold: "Manrope_700Bold",
  },
} as const;

export const shadow = {
  card: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  button: {
    shadowColor: "#6115CD",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
} as const;
