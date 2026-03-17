import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated, Image, FlatList, Dimensions } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ResizeMode, Video } from "expo-av";
import { RootStackParamList } from "../App";
import { Ionicons } from "@expo/vector-icons";

type Props = NativeStackScreenProps<RootStackParamList, "CrossedPaths">;

const radarSize = 300;
const { width, height } = Dimensions.get("window");

// Mock users
const mockUsers = [
  { id: "1", name: "Sipho", location: "KwaMashu Mall", time: "2:30 PM", photo: "https://i.pravatar.cc/50?img=11" },
  { id: "2", name: "Thandi", location: "uShaka Beach", time: "1:15 PM", photo: "https://i.pravatar.cc/50?img=12" },
  { id: "3", name: "Mthokozisi", location: "Durban CBD", time: "11:45 AM", photo: "https://i.pravatar.cc/50?img=13" },
  { id: "4", name: "Nomsa", location: "Umhlanga Rocks", time: "12:50 PM", photo: "https://i.pravatar.cc/50?img=14" },
  { id: "5", name: "Bongani", location: "Gateway Theatre", time: "3:10 PM", photo: "https://i.pravatar.cc/50?img=15" },
];

export default function CrossedPathsScreen({ navigation }: Props) {
  const [detectedUsers, setDetectedUsers] = useState<any[]>([]);
  const [isScanning, setIsScanning] = useState(false);

  const pulseAnim = useRef(new Animated.Value(0)).current;
  const sweepAnim = useRef(new Animated.Value(0)).current;

  const particleCount = 30;
  const particles = useRef([...Array(particleCount)].map(() => new Animated.ValueXY({ x: Math.random() * width, y: Math.random() * height }))).current;

  const startScan = () => {
    setDetectedUsers([]);
    setIsScanning(true);

    Animated.loop(
      Animated.timing(sweepAnim, { toValue: 360, duration: 4000, useNativeDriver: true })
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1, duration: 1500, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 0, duration: 1500, useNativeDriver: true }),
      ])
    ).start();

    let index = 0;
    const interval = setInterval(() => {
      if (index < mockUsers.length) {
        setDetectedUsers((prev) => [...prev, mockUsers[index]]);
        index++;
      } else {
        setIsScanning(false);
        clearInterval(interval);
      }
    }, 1200);
  };

  useEffect(() => {
    startScan();
    // Animate particles
    particles.forEach((particle) => {
      const animate = () => {
        Animated.sequence([
          Animated.timing(particle, { toValue: { x: Math.random() * width, y: Math.random() * height }, duration: 8000 + Math.random() * 4000, useNativeDriver: false }),
        ]).start(() => animate());
      };
      animate();
    });
  }, []);

  const getBlipPosition = () => {
    const r = Math.random() * radarSize * 0.45;
    const theta = Math.random() * 2 * Math.PI;
    return { x: r * Math.cos(theta), y: r * Math.sin(theta) };
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Background Video */}
      <Video
        source={require("../assets/bg.mp4")} // add your video file in assets
        style={StyleSheet.absoluteFill}
        resizeMode={ResizeMode.COVER}
        shouldPlay
        isLooping
        isMuted
      />

      {/* Overlay to darken video */}
      <View style={styles.overlay} />

      {/* Particles */}
      {particles.map((p, i) => (
        <Animated.View
          key={i}
          style={{
            position: "absolute",
            width: 4,
            height: 4,
            borderRadius: 2,
            backgroundColor: "#00ffdd",
            top: p.y,
            left: p.x,
            opacity: 0.5 + Math.random() * 0.5,
          }}
        />
      ))}

      {/* App Bar */}
      <View style={styles.appBar}>
        <Text style={styles.appTitle}>I Saw You Today</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Ionicons name="person-circle-outline" size={28} color="#00ffdd" />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <TouchableOpacity style={styles.scanButton} onPress={startScan}>
          <Text style={styles.scanButtonText}>🔄 Scan Now</Text>
        </TouchableOpacity>

        {/* Radar */}
        <View style={styles.radarContainer}>
          <Image
            source={require('../assets/bg.jpg')}
            style={styles.mapBackground}
            resizeMode="cover"
          />

          <Animated.View
            style={[
              styles.pulseCircle,
              {
                transform: [{ scale: pulseAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 1.6] }) }],
                opacity: pulseAnim.interpolate({ inputRange: [0, 1], outputRange: [0.3, 0] }),
              },
            ]}
          />

          <Animated.View
            style={[
              styles.sweepLine,
              {
                transform: [{ rotate: sweepAnim.interpolate({ inputRange: [0, 360], outputRange: ["0deg", "360deg"] }) }],
              },
            ]}
          />

          {detectedUsers.map((user) => {
            const pos = getBlipPosition();
            return (
              <Animated.View key={user.id} style={[styles.blip, { top: radarSize / 2 + pos.y, left: radarSize / 2 + pos.x }]}>
                <Image source={{ uri: user.photo }} style={styles.avatar} />
              </Animated.View>
            );
          })}
        </View>

        {isScanning && <Text style={styles.scanningText}>Scanning nearby users...</Text>}

        <FlatList
          data={detectedUsers}
          keyExtractor={(item) => item.id}
          style={{ width: "100%", marginBottom: 80 }}
          renderItem={({ item }) => (
            <View style={styles.listCard}>
              <Image source={{ uri: item.photo }} style={styles.listAvatar} />
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.listName}>{item.name}</Text>
                <Text style={styles.listDetails}>{`${item.location} · ${item.time}`}</Text>
              </View>
              <TouchableOpacity
                style={styles.listButton}
                onPress={() => alert(`You said "I Saw You Today" to ${item.name}!`)}
              >
                <Text style={styles.listButtonText}>Say "I Saw You Today"</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>

      {/* Bottom Nav */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Home")}>
          <Ionicons name="home-outline" size={24} color="#00ffdd" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("CrossedPaths")}>
          <Ionicons name="people-outline" size={24} color="#00ffdd" />
          <Text style={styles.navText}>Crossed Paths</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Messages")}>
          <Ionicons name="chatbubble-outline" size={24} color="#00ffdd" />
          <Text style={styles.navText}>Messages</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Profile")}>
          <Ionicons name="person-outline" size={24} color="#00ffdd" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0, 0, 20, 0.79)" },
  appBar: {
    height: 60,
    width: "100%",
    backgroundColor: "#001f3f80",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#00ffdd",
  },
  appTitle: { fontSize: 20, fontWeight: "bold", color: "#00ffdd" },
  container: { flex: 1, alignItems: "center", paddingTop: 10 },
  scanButton: { backgroundColor: "#00ffdd", padding: 10, borderRadius: 25, marginBottom: 15 },
  scanButtonText: { color: "#001f3f", fontWeight: "bold" },
  radarContainer: {
    width: radarSize,
    height: radarSize,
    borderRadius: radarSize / 2,
    borderWidth: 2,
    borderColor: "#00ffdd",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    overflow: "hidden",
  },
  mapBackground: { position: "absolute", width: radarSize, height: radarSize, borderRadius: radarSize / 2, opacity: 0.2 },
  pulseCircle: { position: "absolute", width: radarSize, height: radarSize, borderRadius: radarSize / 2, backgroundColor: "#1b0ceb3a" },
  sweepLine: { position: "absolute", width: 2, height: radarSize / 2, backgroundColor: "#00ffdd", top: radarSize / 2, left: radarSize / 2, transformOrigin: "bottom" },
  blip: { position: "absolute", width: 30, height: 30, borderRadius: 15, overflow: "hidden", borderWidth: 1, borderColor: "#fff" },
  avatar: { width: "100%", height: "100%" },
  scanningText: { fontSize: 14, color: "#00ffdd", marginBottom: 10 },
  listCard: { flexDirection: "row", alignItems: "center", padding: 10, marginVertical: 4, marginHorizontal: 10, backgroundColor: "#001f3f70", borderRadius: 12 },
  listAvatar: { width: 50, height: 50, borderRadius: 25 },
  listName: { fontSize: 16, fontWeight: "bold", color: "#00ffdd" },
  listDetails: { fontSize: 12, color: "#00ffdd" },
  listButton: { backgroundColor: "#00ffdd", paddingHorizontal: 10, paddingVertical: 6, borderRadius: 20 },
  listButtonText: { color: "#001f3f", fontSize: 12 },
  bottomNav: {
    height: 60,
    width: "100%",
    backgroundColor: "#001f3f80",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#00ffdd",
    position: "absolute",
    bottom: 0,
  },
  navItem: { alignItems: "center" },
  navText: { color: "#00ffdd", fontSize: 12, marginTop: 2 },
});