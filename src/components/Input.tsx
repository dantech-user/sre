import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@theme/index";
import { radius, spacing } from "@theme/spacing";
import { type } from "@theme/typography";

interface InputProps extends TextInputProps {
  label?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  error?: string;
  secure?: boolean;
}

/**
 * Modern floating-focus text field: border and label glow blue on focus,
 * with an animated error message and optional password visibility toggle.
 */
export function Input({ label, icon, error, secure, style, ...rest }: InputProps) {
  const { theme } = useTheme();
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(!!secure);

  const borderAnimStyle = useAnimatedStyle(() => ({
    borderColor: withTiming(
      error ? theme.danger : focused ? theme.tint : theme.border,
      { duration: 180 }
    ),
  }));

  return (
    <View style={styles.wrapper}>
      {label ? (
        <Text style={[type.caption, { color: theme.textSecondary, marginBottom: spacing.xs }]}>
          {label}
        </Text>
      ) : null}
      <Animated.View
        style={[
          styles.field,
          borderAnimStyle,
          { backgroundColor: theme.surface },
        ]}
      >
        {icon ? (
          <Ionicons
            name={icon}
            size={18}
            color={focused ? theme.tint : theme.textTertiary}
            style={{ marginRight: spacing.sm }}
          />
        ) : null}
        <TextInput
          {...rest}
          secureTextEntry={hidden}
          placeholderTextColor={theme.textTertiary}
          onFocus={(e) => {
            setFocused(true);
            rest.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            rest.onBlur?.(e);
          }}
          style={[type.body, { flex: 1, color: theme.textPrimary }, style]}
        />
        {secure ? (
          <Ionicons
            name={hidden ? "eye-off-outline" : "eye-outline"}
            size={18}
            color={theme.textTertiary}
            onPress={() => setHidden((v) => !v)}
            suppressHighlighting
          />
        ) : null}
      </Animated.View>
      {error ? (
        <Text style={[type.caption, { color: theme.danger, marginTop: spacing.xs }]}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { width: "100%" },
  field: {
    flexDirection: "row",
    alignItems: "center",
    height: 54,
    borderRadius: radius.md,
    borderWidth: 1.5,
    paddingHorizontal: spacing.lg,
  },
});
