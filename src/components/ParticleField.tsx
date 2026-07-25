import React, { useEffect, useMemo } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { useTheme } from "@theme/index";

const { width: W, height: H } = Dimensions.get("window");

interface ParticleProps {
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  color: string;
}

function Particle({ x, size, duration, delay, opacity, color }: ParticleProps) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelay(
      delay,
      withRepeat(withTiming(1, { duration, easing: Easing.linear }), -1, false)
    );
  }, []);

  const style = useAnimatedStyle(() => {
    const translateY = H + size - progress.value * (H + size * 2);
    const fade =
      progress.value < 0.1
        ? progress.value / 0.1
        : progress.value > 0.85
        ? (1 - progress.value) / 0.15
        : 1;
    return {
      transform: [{ translateY }],
      opacity: fade * opacity,
    };
  });

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          left: x,
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
          shadowColor: color,
          shadowOpacity: 0.9,
          shadowRadius: size * 2,
          shadowOffset: { width: 0, height: 0 },
        },
        style,
      ]}
    />
  );
}

/**
 * Ambient floating-particle backdrop used behind Splash and the Auth screens,
 * echoing the "blue glow / particles" language from the HydraCity brief.
 */
export function ParticleField({ count = 26 }: { count?: number }) {
  const { theme } = useTheme();

  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        key: i,
        x: Math.random() * W,
        size: Math.random() * 3 + 1.5,
        duration: Math.random() * 6000 + 7000,
        delay: Math.random() * 4000,
        opacity: Math.random() * 0.5 + 0.2,
      })),
    [count]
  );

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {particles.map((p) => (
        <Particle key={p.key} {...p} color={theme.tintSoft} />
      ))}
    </View>
  );
}
