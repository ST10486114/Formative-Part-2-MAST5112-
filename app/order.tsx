import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function Order() {
  const { selected } = useLocalSearchParams();
  const router = useRouter();
  const items = selected ? JSON.parse(selected as string) : [];

  const [quantities, setQuantities] = useState(items.map(() => 1));

  const updateQty = (index: number, delta: number) => {
    const newQty = [...quantities];
    newQty[index] = Math.max(1, newQty[index] + delta);
    setQuantities(newQty);
  };

  const total = items.reduce((sum: number, item: any, i: number) => sum + item.price * quantities[i], 0);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Order</Text>

      {items.map((item: any, index: number) => (
        <View key={item.id} style={styles.row}>
          <Text style={styles.dish}>{item.name}</Text>
          <View style={styles.qtyBox}>
            <TouchableOpacity onPress={() => updateQty(index, -1)}>
              <Text style={styles.qtyBtn}>-</Text>
            </TouchableOpacity>
            <Text style={styles.qty}>{quantities[index]}</Text>
            <TouchableOpacity onPress={() => updateQty(index, 1)}>
              <Text style={styles.qtyBtn}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      <Text style={styles.total}>Total: R{total}</Text>

      <TouchableOpacity style={styles.nextButton} onPress={() => router.push("/Summary")}>
        <Text style={styles.nextText}>Place Order</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  header: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 15 },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginVertical: 8 },
  dish: { fontSize: 18 },
  qtyBox: { flexDirection: "row", alignItems: "center" },
  qtyBtn: { backgroundColor: "#ddd", padding: 6, borderRadius: 5, fontSize: 18 },
  qty: { marginHorizontal: 10, fontSize: 18 },
  total: { fontSize: 20, fontWeight: "bold", textAlign: "center", marginTop: 20 },
  nextButton: { backgroundColor: "#E91E63", padding: 15, borderRadius: 10, marginTop: 20 },
  nextText: { color: "#fff", fontWeight: "bold", textAlign: "center", fontSize: 16 },
});
