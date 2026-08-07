// screens/ProfileSetupScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { supabase } from "../lib/supabase";

type Props = NativeStackScreenProps<RootStackParamList, "ProfileSetup">;

export default function ProfileSetupScreen({ navigation }: Props) {
  const [nickname, setNickname] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Pick image from gallery
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  // Upload image to Supabase storage
  const uploadAvatar = async (uri: string) => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error("No authenticated user");

      const fileName = `${userData.user.id}_${Date.now()}.png`;
      const response = await fetch(uri);
      const blob = await response.blob();

      const { data, error } = await supabase.storage
        .from("avatars")
        .upload(fileName, blob, { upsert: true });

      if (error) throw error;

      const url = supabase.storage.from("avatars").getPublicUrl(data.path).data.publicUrl;
      return url;
    } catch (err: any) {
      console.error("Avatar upload error:", err.message);
      return null;
    }
  };

  const handleSaveProfile = async () => {
    if (!nickname) {
      Alert.alert("Please enter a nickname");
      return;
    }

    setLoading(true);

    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error("No authenticated user");

      let avatar_url = null;
      if (avatar) {
        avatar_url = await uploadAvatar(avatar);
      }

      const { error } = await supabase
        .from("profiles")
        .upsert([{ id: userData.user.id, nickname, bio, avatar_url }]);

      if (error) throw error;

      navigation.replace("Home");
    } catch (err: any) {
      console.error("Profile save error:", err.message);
      Alert.alert("Error", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#001f3f", padding: 20 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Text style={styles.title}>Complete Your Profile</Text>

      <TouchableOpacity style={styles.avatarContainer} onPress={pickImage}>
        {avatar ? (
          <Image source={{ uri: avatar }} style={styles.avatar} />
        ) : (
          <Text style={styles.avatarPlaceholder}>Pick an Avatar</Text>
        )}
      </TouchableOpacity>

      <TextInput
        placeholder="Nickname"
        placeholderTextColor="#00ffdd80"
        style={styles.input}
        value={nickname}
        onChangeText={setNickname}
      />
      <TextInput
        placeholder="Bio (optional)"
        placeholderTextColor="#00ffdd80"
        style={[styles.input, { height: 80 }]}
        value={bio}
        onChangeText={setBio}
        multiline
      />

      <TouchableOpacity
        style={[styles.button, loading && { opacity: 0.6 }]}
        onPress={handleSaveProfile}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? "Saving..." : "Save Profile"}</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 28, fontWeight: "bold", color: "#00ffdd", marginBottom: 20 },
  input: {
    width: "100%",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#00ffdd",
    color: "#00ffdd",
    marginBottom: 15,
  },
  button: {
    width: "100%",
    backgroundColor: "#00ffdd",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#001f3f", fontWeight: "bold" },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#002b55",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    overflow: "hidden",
    alignSelf: "center",
  },
  avatar: { width: "100%", height: "100%" },
  avatarPlaceholder: { color: "#00ffdd", textAlign: "center" },
});