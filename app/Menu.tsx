import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

const dishes = [
  { id: 1, name: "Dish 1", price: 40 },
  { id: 2, name: "Dish 2", price: 55 },
  { id: 3, name: "Dish 3", price: 60 },
  { id: 4, name: "Dish 4", price: 45 },
];

export default function Menu() {
  const [selected, setSelected] = useState<any[]>([]);
  const router = useRouter();

  const addDish = (dish: any) => {
    if (!selected.includes(dish)) {
      setSelected([...selected, dish]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Menu</Text>
      {dishes.map((dish) => (
        <TouchableOpacity key={dish.id} style={styles.card} onPress={() => addDish(dish)}>
          <Text style={styles.dish}>{dish.name}</Text>
          <Text style={styles.price}>R{dish.price}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push({ pathname: "/Order", params: { selected: JSON.stringify(selected) } })}
      >
        <Text style={styles.addButtonText}>Add to Order</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  header: { fontSize: 26, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  card: { backgroundColor: "#f5f5f5", padding: 15, marginVertical: 5, borderRadius: 8 },
  dish: { fontSize: 18 },
  price: { fontSize: 16, color: "#888" },
  addButton: { backgroundColor: "#E91E63", padding: 15, borderRadius: 10, marginTop: 20 },
  addButtonText: { textAlign: "center", color: "#fff", fontWeight: "bold", fontSize: 16 },
});
