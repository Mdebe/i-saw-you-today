import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<RootStackParamList, "Match">;

export default function MatchScreen({ navigation, route }: Props) {
  const { matchName, matchPhoto } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>It's a Match!</Text>

      <View style={styles.avatarContainer}>
        <Image source={{ uri: matchPhoto }} style={styles.avatar} />
      </View>

      <Text style={styles.subtitle}>You can now chat and exchange details with {matchName}.</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => alert("Open Chat screen (to implement)")}
      >
        <Text style={styles.buttonText}>Start Chatting</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.viewProfileButton]}
        onPress={() => alert("View Profile screen (to implement)")}
      >
        <Text style={[styles.buttonText, { color: "#3b5998" }]}>View Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6e5ce8",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: { fontSize: 32, fontWeight: "bold", color: "#fff", marginBottom: 20 },
  avatarContainer: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 120,
    marginBottom: 20,
  },
  avatar: { width: 120, height: 120, borderRadius: 60 },
  subtitle: { fontSize: 16, color: "#fff", textAlign: "center", marginBottom: 30 },
  button: {
    backgroundColor: "#fff",
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 25,
    marginVertical: 10,
  },
  viewProfileButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#fff",
  },
  buttonText: { color: "#3b5998", fontSize: 16, fontWeight: "600" },
});