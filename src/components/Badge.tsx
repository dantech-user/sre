import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "@theme/index";
import { radius, spacing } from "@theme/spacing";
import { type } from "@theme/typography";

type Tone = "tint" | "success" | "warning" | "danger" | "neutral";

export function Badge({ label, tone = "tint" }: { label: string; tone?: Tone }) {
  const { theme } = useTheme();
  const colors: Record<Tone, string> = {
    tint: theme.tint,
    success: theme.success,
    warning: theme.warning,
    danger: theme.danger,
    neutral: theme.textTertiary,
  };
  const color = colors[tone];

  return (
    <View style={[styles.badge, { backgroundColor: color + "22", borderColor: color + "55" }]}>
      <View style={[styles.dot, { backgroundColor: color }]} />
      <Text style={[type.caption, { color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.pill,
    borderWidth: StyleSheet.hairlineWidth,
  },
  dot: { width: 6, height: 6, borderRadius: 3, marginRight: 6 },
});
