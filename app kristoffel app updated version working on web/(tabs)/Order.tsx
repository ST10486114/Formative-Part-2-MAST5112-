import { useLocalSearchParams } from "expo-router";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

const MENU_ITEMS = [
  { id: "1", name: "Tomato Soup", price: 60 },
  { id: "2", name: "Grilled Chicken", price: 120 },
  { id: "3", name: "Chocolate Cake", price: 75 },
  { id: "4", name: "Salad", price: 55 },
];

export default function Order() {
  const { order } = useLocalSearchParams();
  const selectedIds = order ? JSON.parse(order as string) : [];

  const orderedItems = MENU_ITEMS.filter((item) =>
    selectedIds.includes(item.id)
  );

  const total = orderedItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Order</Text>
      <FlatList
        data={orderedItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={styles.item}>
            {item.name} - R{item.price}
          </Text>
        )}
      />
      <Text style={styles.total}>Total: R{total}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  item: { fontSize: 16, marginBottom: 5 },
  total: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15,
    textAlign: "right",
  },
});
