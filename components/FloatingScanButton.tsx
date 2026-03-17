import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";

export default function FloatingScanButton({ children, onPress }: any) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.button}>{children}</View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    top: -25,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#00ffe1",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#00ffe1",
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 12,
  },
});