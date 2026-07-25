import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { useTheme } from "@theme/index";
import { radius, spacing } from "@theme/spacing";
import { type } from "@theme/typography";

interface ChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
}

/** Filter/category chip used in Services search & category rows. */
export function Chip({ label, selected = false, onPress }: ChipProps) {
  const { theme } = useTheme();
  const scale = useSharedValue(1);
  const animStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <Animated.View style={animStyle}>
      <Pressable
        onPress={onPress}
        onPressIn={() => (scale.value = withSpring(0.94))}
        onPressOut={() => (scale.value = withSpring(1))}
        style={[
          styles.chip,
          {
            backgroundColor: selected ? theme.tint : theme.surface,
            borderColor: selected ? theme.tint : theme.border,
          },
        ]}
      >
        <Text style={[type.callout, { color: selected ? "#fff" : theme.textSecondary }]}>
          {label}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    borderWidth: 1,
    marginRight: spacing.sm,
  },
});
