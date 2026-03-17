import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import AppHeader from "../components/AppHeader";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  const [refreshing, setRefreshing] = useState(false);

  const [connections, setConnections] = useState(24);
  const [messages, setMessages] = useState(12);
  const [encountersToday, setEncountersToday] = useState(3);

  const peopleToday = ["Sipho", "Thando", "Ayanda", "Sibusiso", "Lerato"];

  const onRefresh = async () => {
    setRefreshing(true);

    // later fetch from supabase
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  useEffect(() => {
    // future supabase fetch here
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader
        title="I Saw You Today"
        onMenuPress={() => console.log("open menu")}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Welcome */}
        <View style={styles.section}>
          <Text style={styles.welcome}>Welcome Back 👋</Text>
          <Text style={styles.subText}>
            You crossed paths with {encountersToday} people today
          </Text>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{connections}</Text>
            <Text style={styles.statLabel}>Connections</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{messages}</Text>
            <Text style={styles.statLabel}>Messages</Text>
          </View>
        </View>

        {/* People Seen Today */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>People Seen Today</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {peopleToday.map((name, i) => (
              <View key={i} style={styles.storyCard}>
                <View style={styles.storyAvatar} />
                <Text style={styles.storyName}>{name}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate("CrossedPaths")}
          >
            <Ionicons name="radio-outline" size={26} color="#00ffe1" />
            <Text style={styles.actionText}>Scan Nearby</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate("Messages")}
          >
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={26}
              color="#00ffe1"
            />
            <Text style={styles.actionText}>Open Messages</Text>
          </TouchableOpacity>
        </View>

        {/* Nearby Encounters */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nearby Encounters</Text>

          <View style={styles.personCard}>
            <View style={styles.avatar} />
            <View>
              <Text style={styles.personName}>Thabo</Text>
              <Text style={styles.personLocation}>Gateway Mall • 5 min ago</Text>
            </View>
          </View>

          <View style={styles.personCard}>
            <View style={styles.avatar} />
            <View>
              <Text style={styles.personName}>Nomsa</Text>
              <Text style={styles.personLocation}>
                Campus Square • 10 min ago
              </Text>
            </View>
          </View>
        </View>

        {/* Trending Locations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trending Locations</Text>

          <View style={styles.locationCard}>
            <Text style={styles.locationName}>Gateway Mall</Text>
            <Text style={styles.locationPeople}>32 people crossed paths</Text>
          </View>

          <View style={styles.locationCard}>
            <Text style={styles.locationName}>Hatfield Square</Text>
            <Text style={styles.locationPeople}>18 people crossed paths</Text>
          </View>
        </View>

        {/* Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>

          <View style={styles.activityCard}>
            <Text style={styles.activityText}>
              You crossed paths with Sipho at Gateway Mall
            </Text>
          </View>

          <View style={styles.activityCard}>
            <Text style={styles.activityText}>
              Thando viewed your profile
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={24} color="#00ffe1" />
          <Text style={styles.navTextActive}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("CrossedPaths")}
        >
          <Ionicons name="radio-outline" size={24} color="#00ffe1aa" />
          <Text style={styles.navText}>Scan</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("Messages")}
        >
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={24}
            color="#00ffe1aa"
          />
          <Text style={styles.navText}>Messages</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("Profile")}
        >
          <Ionicons name="person-outline" size={24} color="#00ffe1aa" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#001a33",
  },

  section: {
    paddingHorizontal: 20,
    marginTop: 25,
  },

  welcome: {
    color: "#00ffe1",
    fontSize: 22,
    fontWeight: "bold",
  },

  subText: {
    color: "#00ffe199",
    marginTop: 5,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },

  statCard: {
    backgroundColor: "#003d66",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    width: 140,
    borderWidth: 1,
    borderColor: "#00ffe155",
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

  sectionTitle: {
    color: "#00ffe1",
    fontSize: 18,
    marginBottom: 15,
    fontWeight: "600",
  },

  storyCard: {
    alignItems: "center",
    marginRight: 15,
  },

  storyAvatar: {
    width: 65,
    height: 65,
    borderRadius: 40,
    backgroundColor: "#004a80",
    marginBottom: 5,
    borderWidth: 2,
    borderColor: "#00ffe1",
  },

  storyName: {
    color: "#00ffe1",
    fontSize: 12,
  },

  actionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#003d66",
    padding: 18,
    borderRadius: 15,
    marginBottom: 15,
    gap: 15,
    borderWidth: 1,
    borderColor: "#00ffe155",
  },

  actionText: {
    color: "#00ffe1",
    fontSize: 16,
  },

  personCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#002b55",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: "#004a80",
  },

  personName: {
    color: "#00ffe1",
    fontSize: 16,
    fontWeight: "600",
  },

  personLocation: {
    color: "#00ffe199",
    fontSize: 13,
  },

  locationCard: {
    backgroundColor: "#002b55",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },

  locationName: {
    color: "#00ffe1",
    fontSize: 16,
    fontWeight: "600",
  },

  locationPeople: {
    color: "#00ffe199",
    fontSize: 13,
  },

  activityCard: {
    backgroundColor: "#002b55",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },

  activityText: {
    color: "#00ffe1cc",
  },

  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 70,
    backgroundColor: "#002b55",
    borderTopWidth: 1,
    borderColor: "#00ffe133",
  },

  navItem: {
    alignItems: "center",
  },

  navText: {
    color: "#00ffe1aa",
    fontSize: 12,
    marginTop: 3,
  },

  navTextActive: {
    color: "#00ffe1",
    fontSize: 12,
    marginTop: 3,
  },
});