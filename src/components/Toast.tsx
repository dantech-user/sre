import React, { createContext, useCallback, useContext, useRef, useState } from "react";
import { StyleSheet, Text } from "react-native";
import Animated, { FadeInDown, FadeOutUp } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@theme/index";
import { GlassCard } from "./GlassCard";
import { spacing } from "@theme/spacing";
import { type } from "@theme/typography";

type ToastKind = "success" | "error" | "info";
interface ToastState { id: number; message: string; kind: ToastKind }

const ToastContext = createContext<{ show: (message: string, kind?: ToastKind) => void } | undefined>(
  undefined
);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<ToastState | null>(null);
  const counter = useRef(0);

  const show = useCallback((message: string, kind: ToastKind = "info") => {
    const id = ++counter.current;
    setToast({ id, message, kind });
    setTimeout(() => {
      setToast((current) => (current?.id === id ? null : current));
    }, 2600);
  }, []);

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      {toast ? <ToastView key={toast.id} message={toast.message} kind={toast.kind} /> : null}
    </ToastContext.Provider>
  );
}

function ToastView({ message, kind }: { message: string; kind: ToastKind }) {
  const { theme } = useTheme();
  const icon = kind === "success" ? "checkmark-circle" : kind === "error" ? "close-circle" : "information-circle";
  const color = kind === "success" ? theme.success : kind === "error" ? theme.danger : theme.tint;

  return (
    <Animated.View
      entering={FadeInDown.springify().damping(16)}
      exiting={FadeOutUp.duration(200)}
      style={styles.container}
      pointerEvents="none"
    >
      <GlassCard intensity={60} contentStyle={styles.card}>
        <Ionicons name={icon as any} size={18} color={color} style={{ marginRight: spacing.sm }} />
        <Text style={[type.callout, { color: theme.textPrimary, flexShrink: 1 }]}>{message}</Text>
      </GlassCard>
    </Animated.View>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 60,
    left: spacing.xl,
    right: spacing.xl,
    zIndex: 999,
  },
  card: { flexDirection: "row", alignItems: "center" },
});
