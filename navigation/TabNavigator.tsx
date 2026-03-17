import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Ionicons from "@expo/vector-icons/Ionicons"

import { MainTabParamList } from "./types"

import HomeScreen from "../screens/HomeScreen"
import CrossedPathsScreen from "../screens/CrossedPathsScreen"
import MessagesScreen from "../screens/MessagesScreen"
import ProfileScreen from "../screens/ProfileScreen"

const Tab = createBottomTabNavigator<MainTabParamList>()

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,

        tabBarStyle: {
          backgroundColor: "#002b55",
          height: 70,
          borderTopWidth: 0,
          elevation: 0
        },

        tabBarActiveTintColor: "#00ffe1",
        tabBarInactiveTintColor: "#00ffe188",

        tabBarIcon: ({ color, size, focused }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home"

          if (route.name === "Home") {
            iconName = "home"
          } else if (route.name === "Scan") {
            iconName = "radio"
          } else if (route.name === "Messages") {
            iconName = "chatbubble"
          } else if (route.name === "Profile") {
            iconName = "person"
          }

          return (
            <Ionicons
              name={iconName}
              size={route.name === "Scan" ? 30 : 26}
              color={color}
            />
          )
        }
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
      />

      <Tab.Screen
        name="Home"
        component={HomeScreen} // replace later with CrossedPathsScreen
      />

      <Tab.Screen
        name="Messages"
        component={MessagesScreen}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  )
}