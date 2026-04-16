export const colors = {
  // Primary
  primary: '#7B2FBE',
  primaryDark: '#5A1F9A',
  primaryLight: '#EFE5F9',
  primaryMid: '#9B4FD8',

  // Backgrounds
  background: '#F5F5F5',
  surface: '#FFFFFF',
  surfaceElevated: '#FAFAFA',

  // Text
  text: '#1A1A1A',
  textSecondary: '#888888',
  textDisabled: '#C4C4C4',
  textOnPrimary: '#FFFFFF',

  // UI
  border: '#E8E8E8',
  divider: '#F0F0F0',

  // States
  liked: '#EF4444',
  likedBg: '#FEE2E2',
  error: '#EF4444',
  errorLight: '#FEF2F2',

  // Overlay
  overlay: 'rgba(0,0,0,0.4)',
  overlayLight: 'rgba(0,0,0,0.05)',

  // Locked post gradient
  lockedGradientStart: 'rgba(255,255,255,0)',
  lockedGradientEnd: 'rgba(255,255,255,1)',
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
  regular: '400' as const,
  medium: '500' as const,
  semiBold: '600' as const,
  bold: '700' as const,
} as const;

export const shadow = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  button: {
    shadowColor: '#7B2FBE',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
} as const;
