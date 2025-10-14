import { useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🍳 Welcome to Chef Christoffel’s Menu</Text>

      <Image
        source={{ uri: "https://cdn-icons-png.flaticon.com/512/857/857681.png" }}
        style={styles.image}
      />

      <Text style={styles.subtitle}>Explore our dishes and order your favorites!</Text>

      <Pressable
        style={({ pressed }) => [styles.button, pressed && { opacity: 0.7 }]}
        onPress={() => router.push({ pathname: "/menu", params: { order: JSON.stringify([]) } })}
      >
        <Text style={styles.buttonText}>Go to Menu</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff", padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  subtitle: { fontSize: 16, textAlign: "center", color: "gray", marginTop: 10, marginBottom: 30 },
  image: { width: 120, height: 120 },
  button: { backgroundColor: "#FF6347", paddingVertical: 12, paddingHorizontal: 30, borderRadius: 8, alignItems: "center" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
