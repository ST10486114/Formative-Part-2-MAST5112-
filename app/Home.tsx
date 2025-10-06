import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Chef Menu </Text>
      <Image
        source={require("../assets/")}

        style={styles.image}
      />
      <TouchableOpacity style={styles.button} onPress={() => router.push("/Menu")}>
        <Text style={styles.buttonText}>View Menu</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  image: { width: 120, height: 120, marginBottom: 30 },
  button: { backgroundColor: "#E91E63", padding: 15, borderRadius: 10 },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});

