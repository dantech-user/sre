import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "@theme/index";
import { type } from "@theme/typography";

/**
 * Placeholder for the Settings screen.
 * Full layout, animation, and content land in a follow-up pass —
 * this scaffold wires it into theme + navigation now so the app runs end to end.
 */
export function SettingsScreen() {
  const { theme } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[type.title2, { color: theme.textPrimary }]}>Settings</Text>
      <Text style={[type.callout, { color: theme.textTertiary, marginTop: 8 }]}>
        Em construção — próxima etapa do build.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
});
