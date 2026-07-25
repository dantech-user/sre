import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@theme/index";
import { radius, spacing } from "@theme/spacing";
import { type } from "@theme/typography";

const ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
  Home: "home",
  Services: "grid",
  Map: "map",
  Notifications: "notifications",
  Profile: "person",
};

/**
 * Floating glass bottom navigation bar. Replaces the old drawer entirely.
 * The active tab's icon scales up and glows; the label fades in beside it.
 */
export function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, spacing.md) }]}>
      <BlurView
        intensity={60}
        tint={theme.blurTint}
        style={[styles.bar, { backgroundColor: theme.surfaceStrong, borderColor: theme.border }]}
      >
        {state.routes.map((route, index) => {
          const focused = state.index === index;
          const iconName = ICONS[route.name] ?? "ellipse";

          const onPress = () => {
            Haptics.selectionAsync();
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            if (!focused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TabButton
              key={route.key}
              focused={focused}
              label={route.name}
              iconName={iconName}
              onPress={onPress}
            />
          );
        })}
      </BlurView>
    </View>
  );
}

function TabButton({
  focused,
  label,
  iconName,
  onPress,
}: {
  focused: boolean;
  label: string;
  iconName: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
}) {
  const { theme } = useTheme();

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(focused ? 1.15 : 1, { damping: 12, stiffness: 220 }) }],
  }));
  const labelStyle = useAnimatedStyle(() => ({
    opacity: withTiming(focused ? 1 : 0, { duration: 160 }),
  }));

  return (
    <Pressable onPress={onPress} style={styles.tab} hitSlop={8}>
      <Animated.View style={iconStyle}>
        <Ionicons
          name={focused ? (iconName as any) : (`${iconName}-outline` as any)}
          size={24}
          color={focused ? theme.tint : theme.textTertiary}
        />
      </Animated.View>
      <Animated.Text
        numberOfLines={1}
        style={[type.caption, labelStyle, { color: theme.tint, marginTop: 3 }]}
      >
        {label}
      </Animated.Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: spacing.lg,
    right: spacing.lg,
    bottom: 0,
  },
  bar: {
    flexDirection: "row",
    borderRadius: radius.xl,
    borderWidth: StyleSheet.hairlineWidth,
    paddingVertical: spacing.sm,
    overflow: "hidden",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
  },
});
