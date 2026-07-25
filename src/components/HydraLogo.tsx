import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Svg, { Circle, Defs, LinearGradient, Path, Stop } from "react-native-svg";
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { useTheme } from "@theme/index";

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const DROPLET_LENGTH = 620;
const CIRCUIT_LENGTH = 160;

interface HydraLogoProps {
  size?: number;
  /** When false, renders fully drawn/static (e.g. small header usage). */
  animated?: boolean;
}

/**
 * Original HydraCity mark: a droplet silhouette (city + water) traced by a
 * circuit line, animated stroke-on for the splash sequence.
 */
export function HydraLogo({ size = 112, animated = true }: HydraLogoProps) {
  const { theme } = useTheme();
  const dropletOffset = useSharedValue(animated ? DROPLET_LENGTH : 0);
  const circuitOffset = useSharedValue(animated ? CIRCUIT_LENGTH : 0);
  const circuitOpacity = useSharedValue(animated ? 0 : 1);
  const coreScale = useSharedValue(animated ? 0 : 1);
  const coreOpacity = useSharedValue(animated ? 0 : 0.95);

  useEffect(() => {
    if (!animated) return;
    dropletOffset.value = withTiming(0, {
      duration: 1400,
      easing: Easing.bezier(0.65, 0, 0.35, 1),
    });
    circuitOffset.value = withDelay(
      1250,
      withTiming(0, { duration: 700, easing: Easing.out(Easing.ease) })
    );
    circuitOpacity.value = withDelay(1250, withTiming(1, { duration: 250 }));
    coreScale.value = withDelay(
      1550,
      withSequence(
        withTiming(1.25, { duration: 380, easing: Easing.out(Easing.ease) }),
        withTiming(1, { duration: 220 })
      )
    );
    coreOpacity.value = withDelay(1550, withTiming(0.95, { duration: 300 }));
  }, [animated]);

  const dropletProps = useAnimatedProps(() => ({ strokeDashoffset: dropletOffset.value }));
  const circuitProps = useAnimatedProps(() => ({
    strokeDashoffset: circuitOffset.value,
    opacity: circuitOpacity.value,
  }));
  const coreProps = useAnimatedProps(() => ({
    opacity: coreOpacity.value,
    r: 6 * coreScale.value,
  }));

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size} viewBox="0 0 112 112">
        <Defs>
          <LinearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor={theme.tintSoft} />
            <Stop offset="100%" stopColor={theme.tint} />
          </LinearGradient>
        </Defs>

        {/* Droplet silhouette — the city rising from water */}
        <AnimatedPath
          d="M56 10 C74 34 90 54 90 74 C90 93.2 74.6 106 56 106 C37.4 106 22 93.2 22 74 C22 54 38 34 56 10 Z"
          fill="none"
          stroke="url(#logoGrad)"
          strokeWidth={3.4}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={DROPLET_LENGTH}
          animatedProps={dropletProps}
        />

        {/* Circuit trace — the "smart" grid inside the city */}
        <AnimatedPath
          d="M40 74 L48 74 L48 64 L60 64 L60 82 L72 82"
          fill="none"
          stroke={theme.accent}
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeDasharray={CIRCUIT_LENGTH}
          animatedProps={circuitProps}
        />
        <AnimatedCircle cx={72} cy={82} r={2.6} fill={theme.accent} animatedProps={circuitProps} />
        <AnimatedCircle cx={40} cy={74} r={2.6} fill={theme.accent} animatedProps={circuitProps} />

        {/* Glowing core — the pulse of the network */}
        <AnimatedCircle cx={56} cy={70} fill={theme.tintSoft} animatedProps={coreProps} />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({});
