import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  title: string;
  onMenuPress?: () => void;
  onRightPress?: () => void;
};

export default function AppHeader({ title, onMenuPress, onRightPress }: Props) {
  return (
    <View style={styles.container}>
      
      {/* Hamburger Menu */}
      <TouchableOpacity onPress={onMenuPress}>
        <Ionicons name="menu" size={26} color="white" />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Right Icon */}
      <TouchableOpacity onPress={onRightPress}>
        <Ionicons name="notifications-outline" size={24} color="white" />
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    paddingHorizontal: 20,
    backgroundColor: "#0f172a",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#1e293b"
  },

  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
    letterSpacing: 1
  }
});