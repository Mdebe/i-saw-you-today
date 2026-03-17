// screens/ProfileScreen.tsx

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.appBar}>
        <Text style={styles.title}>My Profile</Text>
      </View>

      <View style={styles.profileSection}>
        <Image
          source={require("../assets/avatar.png")}
          style={styles.avatar}
        />

        <Text style={styles.name}>Mdebe Useyiphisi</Text>
        <Text style={styles.bio}>Tech lover • Durban • Explorer 🌍</Text>

        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>24</Text>
          <Text style={styles.statLabel}>Connections</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Crossed</Text>
        </View>
      </View>
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

  profileSection: {
    alignItems: "center",
    marginTop: 30,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#00ffe1",
  },
  name: {
    color: "#00ffe1",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  bio: {
    color: "#00ffe199",
    marginTop: 5,
  },
  editButton: {
    marginTop: 15,
    backgroundColor: "#00ffe1",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  editText: {
    color: "#001a33",
    fontWeight: "bold",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 40,
  },
  statCard: {
    backgroundColor: "#003d66",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    width: 120,
  },
  statNumber: {
    color: "#00ffe1",
    fontSize: 22,
    fontWeight: "bold",
  },
  statLabel: {
    color: "#00ffe199",
    marginTop: 5,
  },
});