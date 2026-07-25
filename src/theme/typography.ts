import { Platform } from "react-native";

/**
 * SF Pro Display on iOS (system default), Inter as the cross-platform
 * fallback loaded via expo-font on Android/Web.
 */
export const fontFamily = {
  regular: Platform.select({ ios: "System", default: "Inter_400Regular" }),
  medium: Platform.select({ ios: "System", default: "Inter_500Medium" }),
  semibold: Platform.select({ ios: "System", default: "Inter_600SemiBold" }),
  bold: Platform.select({ ios: "System", default: "Inter_700Bold" }),
};

export const fontsToLoad = {
  Inter_400Regular: require("@expo-google-fonts/inter/Inter_400Regular.ttf"),
  Inter_500Medium: require("@expo-google-fonts/inter/Inter_500Medium.ttf"),
  Inter_600SemiBold: require("@expo-google-fonts/inter/Inter_600SemiBold.ttf"),
  Inter_700Bold: require("@expo-google-fonts/inter/Inter_700Bold.ttf"),
};

export const type = {
  display: { fontSize: 34, lineHeight: 40, fontFamily: fontFamily.bold, letterSpacing: 0.2 },
  title1: { fontSize: 28, lineHeight: 34, fontFamily: fontFamily.bold, letterSpacing: 0.1 },
  title2: { fontSize: 22, lineHeight: 28, fontFamily: fontFamily.semibold },
  title3: { fontSize: 18, lineHeight: 24, fontFamily: fontFamily.semibold },
  body: { fontSize: 16, lineHeight: 22, fontFamily: fontFamily.regular },
  bodyMedium: { fontSize: 16, lineHeight: 22, fontFamily: fontFamily.medium },
  callout: { fontSize: 14, lineHeight: 20, fontFamily: fontFamily.regular },
  caption: { fontSize: 12, lineHeight: 16, fontFamily: fontFamily.medium, letterSpacing: 0.2 },
  overline: { fontSize: 11, lineHeight: 14, fontFamily: fontFamily.semibold, letterSpacing: 1.2 },
};
