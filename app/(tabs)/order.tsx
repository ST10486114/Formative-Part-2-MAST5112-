import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const MENU_ITEMS = [
  { id: "1", name: "Tomato Soup", price: 60 },
  { id: "2", name: "Grilled Chicken", price: 120 },
  { id: "3", name: "Chocolate Cake", price: 75 },
  { id: "4", name: "Salad", price: 55 },
];

export default function Order() {
  const params = useLocalSearchParams() as { order?: string };
  const router = useRouter();

  // safe parse of incoming order param -> array of ids (may contain duplicates)
  let ids: string[] = [];
  try {
    if (params?.order) ids = JSON.parse(params.order as string);
  } catch (e) {
    ids = [];
  }

  // build quantity summary { id: qty }
  const summary = ids.reduce<Record<string, number>>((acc, id) => {
    acc[id] = (acc[id] || 0) + 1;
    return acc;
  }, {});

  // map to items with qty and line total
  const data = Object.entries(summary).map(([id, qty]) => {
    const it = MENU_ITEMS.find((m) => m.id === id);
    return {
      id,
      name: it?.name ?? "Unknown",
      price: it?.price ?? 0,
      qty,
      lineTotal: (it?.price ?? 0) * qty,
    };
  });

  const total = data.reduce((s, it) => s + it.lineTotal, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Order</Text>

      <FlatList
        data={data}
        keyExtractor={(i) => i.id}
        ListEmptyComponent={<Text style={styles.empty}>No items in order</Text>}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.itemText}>
              {item.name} x{item.qty}
            </Text>
            <Text style={styles.itemText}>R{item.lineTotal}</Text>
          </View>
        )}
      />

      <View style={styles.footer}>
        <Text style={styles.total}>Total: R{total}</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  row: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 8, borderBottomWidth: 1, borderColor: "#eee" },
  itemText: { fontSize: 16 },
  empty: { textAlign: "center", marginTop: 20, color: "#666" },
  footer: { marginTop: 12 },
  total: { fontWeight: "bold", fontSize: 16, textAlign: "right" },
  backButton: { marginTop: 8, backgroundColor: "#007bff", padding: 10, borderRadius: 8, alignItems: "center" },
  backText: { color: "#fff", fontWeight: "bold" },
});
