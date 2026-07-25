import React from "react";
import { Platform, StyleSheet, View, ViewProps } from "react-native";
import { BlurView } from "expo-blur";
import { useTheme } from "@theme/index";
import { radius, shadow } from "@theme/spacing";

interface GlassCardProps extends ViewProps {
  intensity?: number;
  glow?: boolean;
  padded?: boolean;
  contentStyle?: ViewProps["style"];
}

/**
 * The signature HydraCity surface: frosted glass with a soft blue glow.
 * Used as the base for cards, sheets, and modals throughout the app.
 */
export function GlassCard({
  intensity = 40,
  glow = false,
  padded = true,
  style,
  contentStyle,
  children,
  ...rest
}: GlassCardProps) {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.wrapper,
        glow && { ...shadow.glow, shadowColor: theme.tint },
        style,
      ]}
      {...rest}
    >
      <BlurView
        intensity={intensity}
        tint={theme.blurTint}
        style={[
          styles.blur,
          {
            backgroundColor: theme.surface,
            borderColor: theme.border,
            padding: padded ? 18 : 0,
          },
          contentStyle,
        ]}
      >
        {children}
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: radius.lg,
    overflow: Platform.select({ ios: "visible", default: "hidden" }) as any,
  },
  blur: {
    borderRadius: radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: "hidden",
  },
});
