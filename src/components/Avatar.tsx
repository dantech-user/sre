import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "@theme/index";
import { type } from "@theme/typography";

interface AvatarProps {
  uri?: string;
  initials?: string;
  size?: number;
  ring?: boolean;
}

export function Avatar({ uri, initials = "?", size = 44, ring = false }: AvatarProps) {
  const { theme } = useTheme();

  const inner = uri ? (
    <Image source={{ uri }} style={{ width: size, height: size, borderRadius: size / 2 }} />
  ) : (
    <LinearGradient
      colors={[theme.tint, theme.accent]}
      style={[styles.fallback, { width: size, height: size, borderRadius: size / 2 }]}
    >
      <Text style={[type.bodyMedium, { color: "#fff", fontSize: size * 0.38 }]}>{initials}</Text>
    </LinearGradient>
  );

  if (!ring) return inner;

  return (
    <View
      style={{
        padding: 2.5,
        borderRadius: size / 2 + 3,
        borderWidth: 1.5,
        borderColor: theme.tint,
      }}
    >
      {inner}
    </View>
  );
}

const styles = StyleSheet.create({
  fallback: { alignItems: "center", justifyContent: "center" },
});
