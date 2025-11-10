import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const MENU_ITEMS = [
  { id: "1", name: "Tomato Soup", course: "Starter", price: 60 },
  { id: "2", name: "Grilled Chicken", course: "Main", price: 120 },
  { id: "3", name: "Chocolate Cake", course: "Dessert", price: 75 },
  { id: "4", name: "Salad", course: "Starter", price: 55 },
];

export default function Home() {
  const router = useRouter();

  const averages = useMemo(() => {
    const groups: Record<string, { sum: number; count: number }> = {};
    for (const it of MENU_ITEMS) {
      const key = it.course ?? "Other";
      if (!groups[key]) groups[key] = { sum: 0, count: 0 };
      groups[key].sum += it.price;
      groups[key].count++;
    }
    const result: { course: string; average: number }[] = [];
    for (const key in groups) {
      result.push({ course: key, average: groups[key].sum / groups[key].count });
    }
    return result;
  }, []);

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

      <View style={styles.averagesContainer}>
        <Text style={styles.averagesTitle}>Course Price Averages</Text>
        {averages.map((avg) => (
          <Text key={avg.course} style={styles.averageText}>
            {avg.course}: R{avg.average.toFixed(2)}
          </Text>
        ))}
      </View>
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
  averagesContainer: { marginTop: 40, width: "100%" },
  averagesTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  averageText: { fontSize: 16, textAlign: "center", color: "black" },
});
