/**
 * HydraCity color system.
 * Core brand color is neon blue (#3B82F6) with cyan accents,
 * tuned for a dark-first, glassmorphic UI.
 */

export const palette = {
  neonBlue: "#3B82F6",
  neonBlueSoft: "#60A5FA",
  deepBlue: "#0B1740",
  cyan: "#22D3EE",
  black: "#000000",
  night: "#05060A",
  charcoal: "#0F1117",
  slate900: "#111827",
  slate800: "#1B2130",
  slate700: "#2A3242",
  slate500: "#64748B",
  slate300: "#CBD5E1",
  white: "#FFFFFF",
  danger: "#F87171",
  success: "#34D399",
  warning: "#FBBF24",
};

export const darkTheme = {
  mode: "dark" as const,
  background: palette.night,
  backgroundElevated: palette.charcoal,
  surface: "rgba(255,255,255,0.06)",
  surfaceStrong: "rgba(255,255,255,0.10)",
  border: "rgba(255,255,255,0.10)",
  glow: "rgba(59,130,246,0.45)",
  textPrimary: palette.white,
  textSecondary: palette.slate300,
  textTertiary: palette.slate500,
  tint: palette.neonBlue,
  tintSoft: palette.neonBlueSoft,
  accent: palette.cyan,
  danger: palette.danger,
  success: palette.success,
  warning: palette.warning,
  overlay: "rgba(0,0,0,0.55)",
  blurTint: "dark" as const,
};

export const lightTheme = {
  mode: "light" as const,
  background: "#F4F6FB",
  backgroundElevated: "#FFFFFF",
  surface: "rgba(17,24,39,0.04)",
  surfaceStrong: "rgba(17,24,39,0.08)",
  border: "rgba(17,24,39,0.08)",
  glow: "rgba(59,130,246,0.25)",
  textPrimary: palette.slate900,
  textSecondary: "#4B5563",
  textTertiary: palette.slate500,
  tint: palette.neonBlue,
  tintSoft: palette.neonBlueSoft,
  accent: "#0891B2",
  danger: "#DC2626",
  success: "#059669",
  warning: "#D97706",
  overlay: "rgba(15,23,42,0.35)",
  blurTint: "light" as const,
};

export type Theme = typeof darkTheme;
