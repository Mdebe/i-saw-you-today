// screens/MessagesScreen.tsx

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const dummyChats = [
  { id: "1", name: "Sipho", lastMessage: "Saw you at Gateway 👀", unread: true },
  { id: "2", name: "Thando", lastMessage: "Hey! Are you nearby?", unread: false },
  { id: "3", name: "Lindiwe", lastMessage: "Let’s connect ✨", unread: true },
];

export default function MessagesScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.appBar}>
        <Text style={styles.title}>Messages</Text>
      </View>

      <FlatList
        data={dummyChats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.chatItem}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={28} color="#00ffe1" />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.message}>{item.lastMessage}</Text>
            </View>

            {item.unread && <View style={styles.unreadDot} />}
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#001a33" },
  appBar: {
    height: 70,
    backgroundColor: "#002b55",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: { color: "#00ffe1", fontSize: 20, fontWeight: "bold" },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 0.5,
    borderColor: "#00ffe133",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#003d66",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  name: { color: "#00ffe1", fontSize: 16, fontWeight: "600" },
  message: { color: "#00ffe199", fontSize: 14 },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#00ffe1",
  },
});