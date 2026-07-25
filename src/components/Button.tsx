import React from "react";
import {
  ActivityIndicator,
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "@theme/index";
import { radius, shadow, spacing } from "@theme/spacing";
import { type } from "@theme/typography";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
  label: string;
  onPress?: (e: GestureResponderEvent) => void;
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  haptics?: boolean;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

/**
 * The app's primary CTA. Primary variant uses a neon-blue gradient with a
 * soft glow shadow and a spring "press" scale for a premium tactile feel.
 */
export function Button({
  label,
  onPress,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  fullWidth = false,
  icon,
  haptics = true,
}: ButtonProps) {
  const { theme } = useTheme();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.96, { damping: 14, stiffness: 220 });
  };
  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 12, stiffness: 200 });
  };

  const handlePress = (e: GestureResponderEvent) => {
    if (disabled || loading) return;
    if (haptics) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress?.(e);
  };

  const sizes: Record<Size, { height: number; paddingHorizontal: number; fontSize: number }> = {
    sm: { height: 40, paddingHorizontal: spacing.lg, fontSize: 14 },
    md: { height: 52, paddingHorizontal: spacing.xl, fontSize: 16 },
    lg: { height: 60, paddingHorizontal: spacing.xxl, fontSize: 17 },
  };
  const sizeStyle = sizes[size];

  const content = (
    <View style={styles.content}>
      {loading ? (
        <ActivityIndicator color={variant === "primary" ? "#fff" : theme.tint} />
      ) : (
        <>
          {icon}
          <Text
            style={[
              type.bodyMedium,
              {
                fontSize: sizeStyle.fontSize,
                color:
                  variant === "primary"
                    ? "#FFFFFF"
                    : variant === "danger"
                    ? theme.danger
                    : theme.textPrimary,
                marginLeft: icon ? spacing.sm : 0,
              },
            ]}
          >
            {label}
          </Text>
        </>
      )}
    </View>
  );

  const baseStyle = [
    styles.base,
    {
      height: sizeStyle.height,
      paddingHorizontal: sizeStyle.paddingHorizontal,
      opacity: disabled ? 0.5 : 1,
      width: fullWidth ? "100%" : undefined,
    },
  ];

  if (variant === "primary") {
    return (
      <AnimatedPressable
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        style={[animatedStyle, fullWidth && { width: "100%" }]}
      >
        <LinearGradient
          colors={[theme.tint, theme.accent]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[baseStyle, shadow.glow, { shadowColor: theme.tint }]}
        >
          {content}
        </LinearGradient>
      </AnimatedPressable>
    );
  }

  return (
    <AnimatedPressable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || loading}
      style={[
        animatedStyle,
        baseStyle,
        fullWidth && { width: "100%" },
        variant === "secondary" && {
          backgroundColor: theme.surface,
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: theme.border,
        },
        variant === "ghost" && { backgroundColor: "transparent" },
        variant === "danger" && {
          backgroundColor: "transparent",
          borderWidth: 1,
          borderColor: theme.danger,
        },
      ]}
    >
      {content}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
