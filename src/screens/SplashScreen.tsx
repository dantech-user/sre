import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
  Easing,
  runOnJS,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "@theme/index";
import { spacing } from "@theme/spacing";
import { type } from "@theme/typography";
import { HydraLogo, ParticleField } from "@components/index";
import { AuthStackParamList } from "@navigation/types";

type Props = NativeStackScreenProps<AuthStackParamList, "Splash">;

const HOLD_MS = 2900; // total time before handing off to Login

/**
 * Entry sequence: black screen -> blue glow rises -> particles -> logo draws
 * -> glow pulse -> slight zoom -> "HydraCity / Smart Living" fades in -> fade out.
 */
export function SplashScreen({ navigation }: Props) {
  const { theme } = useTheme();

  const glowOpacity = useSharedValue(0);
  const glowScale = useSharedValue(0.4);
  const logoScale = useSharedValue(1);
  const textOpacity = useSharedValue(0);
  const textTranslate = useSharedValue(8);
  const screenOpacity = useSharedValue(1);

  useEffect(() => {
    glowOpacity.value = withTiming(0.55, { duration: 1400, easing: Easing.out(Easing.ease) });
    glowScale.value = withTiming(1, { duration: 1600, easing: Easing.out(Easing.ease) });

    textOpacity.value = withDelay(2150, withTiming(1, { duration: 500 }));
    textTranslate.value = withDelay(2150, withTiming(0, { duration: 500 }));

    logoScale.value = withDelay(
      2100,
      withTiming(1.06, { duration: 500, easing: Easing.out(Easing.ease) })
    );

    screenOpacity.value = withDelay(
      HOLD_MS,
      withTiming(0, { duration: 480, easing: Easing.in(Easing.ease) }, (finished) => {
        if (finished) runOnJS(goToLogin)();
      })
    );
  }, []);

  const goToLogin = () => {
    navigation.replace("Login");
  };

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
    transform: [{ scale: glowScale.value }],
  }));
  const logoWrapStyle = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value }],
  }));
  const textStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    transform: [{ translateY: textTranslate.value }],
  }));
  const screenStyle = useAnimatedStyle(() => ({ opacity: screenOpacity.value }));

  return (
    <Animated.View style={[styles.container, { backgroundColor: theme.background }, screenStyle]}>
      <ParticleField count={30} />

      <Animated.View style={[styles.glow, glowStyle]} pointerEvents="none">
        <LinearGradient
          colors={[theme.glow, "transparent"]}
          style={StyleSheet.absoluteFill}
          start={{ x: 0.5, y: 0.5 }}
          end={{ x: 1, y: 1 }}
        />
      </Animated.View>

      <Animated.View style={[styles.logoWrap, logoWrapStyle]}>
        <HydraLogo size={112} />
        <Animated.View style={[styles.textBlock, textStyle]}>
          <Text style={[type.title1, { color: theme.textPrimary, letterSpacing: 0.3 }]}>
            HydraCity
          </Text>
          <Text
            style={[
              type.overline,
              { color: theme.textTertiary, marginTop: 4, textAlign: "center" },
            ]}
          >
            SMART LIVING
          </Text>
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  glow: {
    position: "absolute",
    width: 420,
    height: 420,
    borderRadius: 210,
  },
  logoWrap: {
    alignItems: "center",
    zIndex: 2,
  },
  textBlock: {
    marginTop: spacing.xl,
    alignItems: "center",
  },
});
