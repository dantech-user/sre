import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import { useTheme } from "@theme/index";
import { radius, spacing } from "@theme/spacing";
import { type } from "@theme/typography";

interface CheckboxProps {
  checked: boolean;
  onToggle: (next: boolean) => void;
  children?: React.ReactNode;
}

/** Animated terms-and-conditions style checkbox with a gradient fill + glow when checked. */
export function Checkbox({ checked, onToggle, children }: CheckboxProps) {
  const { theme } = useTheme();
  const scaleStyle = useAnimatedStyle(() => ({
    opacity: withTiming(checked ? 1 : 0, { duration: 140 }),
    transform: [{ scale: withTiming(checked ? 1 : 0.6, { duration: 140 }) }],
  }));

  const toggle = () => {
    Haptics.selectionAsync();
    onToggle(!checked);
  };

  return (
    <Pressable onPress={toggle} style={styles.row} hitSlop={6}>
      <View style={styles.boxWrap}>
        {checked ? (
          <LinearGradient colors={[theme.tint, theme.accent]} style={[styles.box, styles.boxGlow, { shadowColor: theme.tint }]}>
            <Animated.View style={scaleStyle}>
              <Ionicons name="checkmark" size={13} color="#fff" />
            </Animated.View>
          </LinearGradient>
        ) : (
          <View style={[styles.box, { backgroundColor: theme.surface, borderColor: theme.border, borderWidth: 1.5 }]} />
        )}
      </View>
      <Text style={[type.callout, { color: theme.textTertiary, flex: 1, lineHeight: 19 }]}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "flex-start", gap: spacing.sm },
  boxWrap: { marginTop: 1 },
  box: {
    width: 20,
    height: 20,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  boxGlow: {
    shadowOpacity: 0.5,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
    elevation: 4,
  },
});
