import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useTheme } from "@theme/index";
import { spacing, radius } from "@theme/spacing";
import { type } from "@theme/typography";
import { Button, Checkbox, Input, ParticleField, useToast } from "@components/index";
import { useAuth } from "@context/AuthContext";
import { AuthStackParamList } from "@navigation/types";

type Props = NativeStackScreenProps<AuthStackParamList, "SignUp">;

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export function SignUpScreen({ navigation }: Props) {
  const { theme } = useTheme();
  const { signUp } = useAuth();
  const { show } = useToast();

  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const setField = (key: keyof FormState) => (value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const validate = () => {
    const next: typeof errors = {};
    if (!form.firstName.trim()) next.firstName = "Obrigatório.";
    if (!form.lastName.trim()) next.lastName = "Obrigatório.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "E-mail inválido.";
    if (form.phone.replace(/\D/g, "").length < 10) next.phone = "Telefone inválido.";
    if (form.password.length < 6) next.password = "Mínimo de 6 caracteres.";
    if (form.confirmPassword !== form.password) next.confirmPassword = "As senhas não coincidem.";
    setErrors(next);
    if (Object.keys(next).length > 0) return false;
    if (!acceptedTerms) {
      show("Aceite os termos para continuar.", "error");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      await signUp(form);
      show("Conta criada com sucesso!", "success");
    } catch {
      show("Não foi possível criar a conta.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ParticleField count={14} />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Animated.View entering={FadeInDown.duration(400)}>
            <Pressable
              onPress={() => navigation.goBack()}
              style={[styles.backBtn, { backgroundColor: theme.surface, borderColor: theme.border }]}
              hitSlop={8}
            >
              <Ionicons name="chevron-back" size={20} color={theme.textSecondary} />
            </Pressable>
          </Animated.View>

          <Animated.View entering={FadeInDown.duration(500).delay(40)} style={styles.header}>
            <View style={styles.eyebrowRow}>
              <View style={[styles.dot, { backgroundColor: theme.tint, shadowColor: theme.tint }]} />
              <Text style={[type.overline, { color: theme.tintSoft }]}>NOVA CONTA</Text>
            </View>
            <Text style={[type.title1, { color: theme.textPrimary, marginTop: spacing.sm }]}>
              Criar sua conta
            </Text>
            <Text style={[type.body, { color: theme.textTertiary, marginTop: spacing.sm }]}>
              Leva menos de um minuto para começar.
            </Text>
          </Animated.View>

          <Animated.View entering={FadeInDown.duration(500).delay(100)} style={styles.row}>
            <View style={{ flex: 1 }}>
              <Input
                label="Nome"
                icon="person-outline"
                placeholder="Nome"
                value={form.firstName}
                onChangeText={setField("firstName")}
                error={errors.firstName}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Input
                label="Sobrenome"
                placeholder="Sobrenome"
                value={form.lastName}
                onChangeText={setField("lastName")}
                error={errors.lastName}
              />
            </View>
          </Animated.View>

          <Animated.View entering={FadeInDown.duration(500).delay(150)} style={styles.field}>
            <Input
              label="E-mail"
              icon="mail-outline"
              placeholder="voce@email.com"
              autoCapitalize="none"
              keyboardType="email-address"
              value={form.email}
              onChangeText={setField("email")}
              error={errors.email}
            />
          </Animated.View>

          <Animated.View entering={FadeInDown.duration(500).delay(200)} style={styles.field}>
            <Input
              label="Telefone"
              icon="call-outline"
              placeholder="(11) 90000-0000"
              keyboardType="phone-pad"
              value={form.phone}
              onChangeText={setField("phone")}
              error={errors.phone}
            />
          </Animated.View>

          <Animated.View entering={FadeInDown.duration(500).delay(250)} style={styles.field}>
            <Input
              label="Senha"
              icon="lock-closed-outline"
              placeholder="Crie uma senha"
              secure
              value={form.password}
              onChangeText={setField("password")}
              error={errors.password}
            />
          </Animated.View>

          <Animated.View entering={FadeInDown.duration(500).delay(300)} style={styles.field}>
            <Input
              label="Confirmar senha"
              icon="lock-closed-outline"
              placeholder="Repita a senha"
              secure
              value={form.confirmPassword}
              onChangeText={setField("confirmPassword")}
              error={errors.confirmPassword}
            />
          </Animated.View>

          <Animated.View entering={FadeInDown.duration(500).delay(340)} style={styles.termsRow}>
            <Checkbox checked={acceptedTerms} onToggle={setAcceptedTerms}>
              Li e aceito os Termos de Uso e a Política de Privacidade.
            </Checkbox>
          </Animated.View>

          <Animated.View entering={FadeInDown.duration(500).delay(380)}>
            <Button label="Criar conta" onPress={handleSubmit} loading={loading} fullWidth />
          </Animated.View>

          <Animated.View entering={FadeInDown.duration(500).delay(420)} style={styles.switchRow}>
            <Text style={[type.body, { color: theme.textTertiary }]}>
              Já tem conta?{" "}
              <Text style={{ color: theme.tintSoft, fontWeight: "700" }} onPress={() => navigation.goBack()}>
                Entrar
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
  scroll: { paddingHorizontal: spacing.xl, paddingTop: 64, paddingBottom: spacing.xxxl },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: radius.sm + 2,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.xl,
  },
  header: { marginBottom: spacing.xl },
  eyebrowRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  dot: { width: 6, height: 6, borderRadius: 3, shadowOpacity: 0.9, shadowRadius: 6, elevation: 3 },
  row: { flexDirection: "row", gap: spacing.md, marginBottom: spacing.lg },
  field: { marginBottom: spacing.lg },
  termsRow: { marginBottom: spacing.xl, marginTop: spacing.xs },
  switchRow: { alignItems: "center", marginTop: spacing.lg },
});
