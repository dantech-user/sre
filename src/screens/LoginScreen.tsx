import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useTheme } from "@theme/index";
import { spacing } from "@theme/spacing";
import { type } from "@theme/typography";
import { Button, HydraLogo, Input, ParticleField, useToast } from "@components/index";
import { useAuth } from "@context/AuthContext";
import { AuthStackParamList } from "@navigation/types";

type Props = NativeStackScreenProps<AuthStackParamList, "Login">;

export function LoginScreen({ navigation }: Props) {
  const { theme } = useTheme();
  const { login } = useAuth();
  const { show } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const next: typeof errors = {};
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Informe um e-mail válido.";
    if (password.length < 6) next.password = "Mínimo de 6 caracteres.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      await login(email, password);
      show("Bem-vindo de volta!", "success");
      // RootNavigator swaps to the Main tabs automatically once isAuthenticated flips.
    } catch {
      show("Não foi possível entrar. Tente novamente.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ParticleField count={18} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Animated.View entering={FadeInDown.duration(500).springify().damping(18)} style={styles.header}>
            <HydraLogo size={52} animated={false} />
            <View style={styles.eyebrowRow}>
              <View style={[styles.dot, { backgroundColor: theme.tint, shadowColor: theme.tint }]} />
              <Text style={[type.overline, { color: theme.tintSoft }]}>BEM-VINDO DE VOLTA</Text>
            </View>
            <Text style={[type.title1, { color: theme.textPrimary, marginTop: spacing.sm }]}>
              Entrar na sua{"\n"}conta
            </Text>
            <Text style={[type.body, { color: theme.textTertiary, marginTop: spacing.sm }]}>
              Acesse sua cidade inteligente e continue de onde parou.
            </Text>
          </Animated.View>

          <Animated.View entering={FadeInDown.duration(500).delay(80).springify().damping(18)}>
            <Input
              label="E-mail"
              icon="mail-outline"
              placeholder="voce@email.com"
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              error={errors.email}
            />
          </Animated.View>

          <Animated.View
            entering={FadeInDown.duration(500).delay(150).springify().damping(18)}
            style={{ marginTop: spacing.lg }}
          >
            <Input
              label="Senha"
              icon="lock-closed-outline"
              placeholder="••••••••"
              secure
              value={password}
              onChangeText={setPassword}
              error={errors.password}
            />
          </Animated.View>

          <Animated.View
            entering={FadeInDown.duration(500).delay(200)}
            style={styles.forgotRow}
          >
            <Text
              style={[type.callout, { color: theme.tintSoft, fontWeight: "600" }]}
              onPress={() => navigation.navigate("ForgotPassword")}
            >
              Esqueceu a senha?
            </Text>
          </Animated.View>

          <Animated.View entering={FadeInDown.duration(500).delay(260)}>
            <Button label="Entrar" onPress={handleLogin} loading={loading} fullWidth />
          </Animated.View>

          <Animated.View
            entering={FadeInDown.duration(500).delay(320)}
            style={styles.dividerRow}
          >
            <View style={[styles.line, { backgroundColor: theme.border }]} />
            <Text style={[type.caption, { color: theme.textTertiary }]}>HYDRACITY · SMART LIVING</Text>
            <View style={[styles.line, { backgroundColor: theme.border }]} />
          </Animated.View>

          <Animated.View entering={FadeInDown.duration(500).delay(360)} style={styles.switchRow}>
            <Text style={[type.body, { color: theme.textTertiary }]}>
              Ainda não tem conta?{" "}
              <Text
                style={{ color: theme.tintSoft, fontWeight: "700" }}
                onPress={() => navigation.navigate("SignUp")}
              >
                Criar conta
              </Text>
            </Text>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { paddingHorizontal: spacing.xl, paddingTop: 72, paddingBottom: spacing.xxxl },
  header: { marginBottom: spacing.xl },
  eyebrowRow: { flexDirection: "row", alignItems: "center", marginTop: spacing.lg, gap: 8 },
  dot: { width: 6, height: 6, borderRadius: 3, shadowOpacity: 0.9, shadowRadius: 6, elevation: 3 },
  forgotRow: { alignItems: "flex-end", marginTop: 2, marginBottom: spacing.xl },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    marginTop: spacing.xxl,
    marginBottom: spacing.lg,
  },
  line: { flex: 1, height: StyleSheet.hairlineWidth },
  switchRow: { alignItems: "center" },
});
