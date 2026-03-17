import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { RootStackParamList } from "./types"

import SplashScreen from "../screens/SplashScreen"
import AuthNavigator from "./AuthNavigator"
import TabNavigator from "./TabNavigator"

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function RootNavigator() {

  const isLoggedIn = false // replace later with auth state

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>

      <Stack.Screen
        name="Splash"
        component={SplashScreen}
      />

      {isLoggedIn ? (
        <Stack.Screen name="Main" component={TabNavigator} />
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}

    </Stack.Navigator>
  )
}