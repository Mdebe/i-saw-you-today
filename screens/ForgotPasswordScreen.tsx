import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<RootStackParamList, "ForgotPassword">;

export default function ForgotPasswordScreen({ navigation }: Props) {
  const [email, setEmail] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      <TextInput placeholder="Email" placeholderTextColor="#00ffdd80" style={styles.input} value={email} onChangeText={setEmail} />
      <TouchableOpacity style={styles.button} onPress={() => alert("Reset link sent!")}>
        <Text style={styles.buttonText}>Send Reset Link</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.link}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#001f3f", justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 28, fontWeight: "bold", color: "#00ffdd", marginBottom: 20 },
  input: { width: "100%", padding: 12, borderRadius: 10, borderWidth: 1, borderColor: "#00ffdd", color: "#00ffdd", marginBottom: 15 },
  button: { width: "100%", backgroundColor: "#00ffdd", padding: 15, borderRadius: 12, alignItems: "center", marginBottom: 10 },
  buttonText: { color: "#001f3f", fontWeight: "bold" },
  link: { color: "#00ffdd", marginTop: 10, textDecorationLine: "underline" },
});