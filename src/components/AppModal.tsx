import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { FadeIn, ZoomIn } from "react-native-reanimated";
import { useTheme } from "@theme/index";
import { GlassCard } from "./GlassCard";
import { Button } from "./Button";
import { spacing } from "@theme/spacing";
import { type } from "@theme/typography";

interface AppModalProps {
  visible: boolean;
  title: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  children?: React.ReactNode;
}

/** Centered confirmation/alert dialog with spring scale-in. */
export function AppModal({
  visible,
  title,
  message,
  confirmLabel = "OK",
  cancelLabel,
  onConfirm,
  onCancel,
  children,
}: AppModalProps) {
  const { theme } = useTheme();
  if (!visible) return null;

  return (
    <Modal visible={visible} transparent animationType="none">
      <Animated.View entering={FadeIn.duration(180)} style={StyleSheet.absoluteFill}>
        <Pressable
          style={[StyleSheet.absoluteFill, { backgroundColor: theme.overlay }]}
          onPress={onCancel}
        />
        <View style={styles.center}>
          <Animated.View entering={ZoomIn.springify().damping(16)} style={{ width: "100%" }}>
            <GlassCard intensity={70} glow>
              <Text style={[type.title3, { color: theme.textPrimary, marginBottom: spacing.sm }]}>
                {title}
              </Text>
              {message ? (
                <Text style={[type.body, { color: theme.textSecondary, marginBottom: spacing.lg }]}>
                  {message}
                </Text>
              ) : null}
              {children}
              <View style={{ flexDirection: "row", marginTop: spacing.lg, gap: spacing.sm }}>
                {cancelLabel ? (
                  <View style={{ flex: 1 }}>
                    <Button label={cancelLabel} variant="secondary" onPress={onCancel} />
                  </View>
                ) : null}
                <View style={{ flex: 1 }}>
                  <Button label={confirmLabel} onPress={onConfirm} />
                </View>
              </View>
            </GlassCard>
          </Animated.View>
        </View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.xl,
  },
});
