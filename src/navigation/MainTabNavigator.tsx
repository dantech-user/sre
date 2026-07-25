import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MainTabParamList } from "./types";
import { CustomTabBar } from "./CustomTabBar";
import { HomeScreen } from "@screens/HomeScreen";
import { ServicesScreen } from "@screens/ServicesScreen";
import { MapScreen } from "@screens/MapScreen";
import { NotificationsScreen } from "@screens/NotificationsScreen";
import { ProfileScreen } from "@screens/ProfileScreen";

const Tab = createBottomTabNavigator<MainTabParamList>();

/** 5 tabs, glass floating bar, no drawer — per the HydraCity spec. */
export function MainTabNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Services" component={ServicesScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
