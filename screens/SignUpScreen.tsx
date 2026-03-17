import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { supabase } from "../lib/supabase";

type Props = NativeStackScreenProps<RootStackParamList, "SignUp">;

export default function SignUpScreen({ navigation }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (loading) return;

    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: password,
      });

      if (error) {
        console.log("SUPABASE SIGNUP ERROR:", error);

        if (error.message.includes("rate limit")) {
          Alert.alert(
            "Too Many Requests",
            "Please wait a minute before trying again."
          );
        } else {
          Alert.alert("Signup Failed", error.message);
        }

        setLoading(false);
        return;
      }

      Alert.alert("Success", "Account created successfully!");
      navigation.replace("Home");
    } catch (err) {
      console.log(err);
      Alert.alert("Unexpected Error", "Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Join I Saw You Today</Text>

        <TextInput
          placeholder="Full Name"
          placeholderTextColor="#00ffdd80"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />

        <TextInput
          placeholder="Email"
          placeholderTextColor="#00ffdd80"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#00ffdd80"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor="#00ffdd80"
          secureTextEntry
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleSignUp}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#001f3f" />
          ) : (
            <Text style={styles.buttonText}>Sign Up</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.link}>
            Already have an account? Login
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#001f3f",
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#00ffdd",
    marginBottom: 5,
  },

  subtitle: {
    fontSize: 16,
    color: "#00ffddaa",
    marginBottom: 25,
  },

  input: {
    width: "100%",
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#00ffdd55",
    color: "#00ffdd",
    marginBottom: 15,
    backgroundColor: "#002b55",
    fontSize: 16,
  },

  button: {
    width: "100%",
    backgroundColor: "#00ffdd",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 5,
    shadowColor: "#00ffe1",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
  },

  buttonDisabled: {
    opacity: 0.6,
  },

  buttonText: {
    color: "#001f3f",
    fontWeight: "bold",
    fontSize: 16,
  },

  link: {
    color: "#00ffdd",
    marginTop: 15,
    textDecorationLine: "underline",
    fontSize: 14,
  },
});