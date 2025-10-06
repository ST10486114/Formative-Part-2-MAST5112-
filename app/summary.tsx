import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function Summary() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Order Placed</Text>
      <Text style={styles.text}>Thank you for your order!</Text>

      <TouchableOpacity style={styles.homeButton} onPress={() => router.push("/Home")}>
        <Text style={styles.homeText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  text: { fontSize: 18, marginBottom: 30 },
  homeButton: { backgroundColor: "#E91E63", padding: 15, borderRadius: 10 },
  homeText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
