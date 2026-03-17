import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<RootStackParamList, "SendMessage">;

export default function SendMessageScreen({ navigation, route }: Props) {
  const { userName } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Send "I Saw You Today"?</Text>
      <Text style={styles.subtitle}>Let {userName} know you noticed them today!</Text>

      <Image
        source={{ uri: "https://i.pravatar.cc/150?img=12" }}
        style={styles.avatar}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("Match", {
            matchName: userName,
            matchPhoto: "https://i.pravatar.cc/150?img=12",
          })
        }
      >
        <Text style={styles.buttonText}>👀 I Saw You Today</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.cancelButton]}
        onPress={() => navigation.goBack()}
      >
        <Text style={[styles.buttonText, { color: "#3b5998" }]}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  subtitle: { fontSize: 16, color: "#555", marginBottom: 20, textAlign: "center" },
  avatar: { width: 120, height: 120, borderRadius: 60, marginBottom: 30 },
  button: {
    backgroundColor: "#3b5998",
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 25,
    marginVertical: 10,
  },
  cancelButton: {
    backgroundColor: "#f0f0f0",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});