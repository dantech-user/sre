import React, { useEffect } from "react";
import { StyleSheet, ViewStyle } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { useTheme } from "@theme/index";
import { radius } from "@theme/spacing";

interface SkeletonProps {
  width?: number | `${number}%`;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
}

/**
 * Shimmering placeholder used everywhere a real spinner would look cheap:
 * home cards, list rows, profile header, etc.
 */
export function Skeleton({ width = "100%", height = 16, borderRadius: r = radius.sm, style }: SkeletonProps) {
  const { theme } = useTheme();
  const progress = useSharedValue(0.4);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, { duration: 900, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, []);

  const animStyle = useAnimatedStyle(() => ({ opacity: progress.value }));

  return (
    <Animated.View
      style={[
        { width, height, borderRadius: r, backgroundColor: theme.surfaceStrong },
        animStyle,
        style,
      ]}
    />
  );
}

/** Convenience preset mimicking a GlassCard-sized content block. */
export function SkeletonCard() {
  return (
    <Animated.View style={styles.card}>
      <Skeleton height={120} borderRadius={radius.lg} style={{ marginBottom: 10 }} />
      <Skeleton height={14} width="70%" style={{ marginBottom: 6 }} />
      <Skeleton height={14} width="40%" />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: { width: "100%", marginBottom: 16 },
});
