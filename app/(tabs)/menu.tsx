import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const MENU_ITEMS = [
  { id: "1", name: "Tomato Soup", course: "Starter", price: 60 },
  { id: "2", name: "Grilled Chicken", course: "Main", price: 120 },
  { id: "3", name: "Chocolate Cake", course: "Dessert", price: 75 },
  { id: "4", name: "Salad", course: "Starter", price: 55 },
];

// Simple local Dropdown fallback so the file doesn't rely on an external Dropdown component
const Dropdown: React.FC<{ selectedValue: string; onValueChange: (v: string) => void }> = ({
  selectedValue,
  onValueChange,
}) => {
  const options = ["All", "Starter", "Main", "Dessert"];
  return (
    <View style={{ marginBottom: 12, flexDirection: "row" }}>
      {options.map((opt) => (
        <TouchableOpacity
          key={opt}
          style={[
            styles.fallbackOption,
            selectedValue === opt ? styles.fallbackSelected : null,
            { marginRight: 8 },
          ]}
          onPress={() => onValueChange(opt)}
        >
          <Text style={{ color: selectedValue === opt ? "#fff" : "#000" }}>{opt}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default function Menu() {
  const [selectedCourse, setSelectedCourse] = useState("All");
  const [order, setOrder] = useState<string[]>([]);
  const router = useRouter();

  const filteredItems =
    selectedCourse === "All"
      ? MENU_ITEMS
      : MENU_ITEMS.filter((item) => item.course === selectedCourse);

  const addToOrder = (id: string) => setOrder((prev) => [...prev, id]);
  const removeOneFromOrder = (id: string) => {
    setOrder((prev) => {
      const idx = prev.lastIndexOf(id);
      if (idx === -1) return prev;
      const next = [...prev];
      next.splice(idx, 1);
      return next;
    });
  };
  const removeAllFromOrder = (id: string) => setOrder((prev) => prev.filter((x) => x !== id));
  const countInOrder = (id: string) => order.filter((x) => x === id).length;
  const goToOrder = () => router.push({ pathname: "/order", params: { order: JSON.stringify(order) } });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu</Text>

      <Text style={styles.filterLabel}>Filter by course:</Text>
      <Dropdown selectedValue={selectedCourse} onValueChange={setSelectedCourse} />

      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const qty = countInOrder(item.id);
          return (
            <View style={styles.item}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.itemText}>
                  {item.name} - R{item.price}
                </Text>
                {qty > 0 && (
                  <View style={styles.qtyBadge}>
                    <Text style={styles.qtyText}>{qty}</Text>
                  </View>
                )}
              </View>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity style={styles.addButton} onPress={() => addToOrder(item.id)}>
                  <Text style={styles.addText}>Add</Text>
                </TouchableOpacity>

                {qty > 0 && (
                  <>
                    <TouchableOpacity style={styles.smallBtn} onPress={() => removeOneFromOrder(item.id)}>
                      <Text style={styles.smallBtnText}>−</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => removeAllFromOrder(item.id)} style={{ marginLeft: 8 }}>
                      <Text style={styles.removeAllText}>Remove all</Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </View>
          );
        }}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
      />

      <TouchableOpacity style={styles.viewOrderButton} onPress={goToOrder}>
        <Text style={styles.viewOrderText}>View Order ({order.length})</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  filterLabel: { fontWeight: "bold", marginBottom: 6 },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#fff",
    elevation: 1,
  },
  itemText: { fontSize: 16, color: "#333" },
  qtyBadge: {
    backgroundColor: "#007bff",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginLeft: 8,
  },
  qtyText: { color: "#fff", fontWeight: "bold" },
  addButton: {
    backgroundColor: "#28a745",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  addText: { color: "#fff", fontWeight: "bold" },
  smallBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
  },
  smallBtnText: { color: "#fff", fontWeight: "bold", fontSize: 18 },
  removeAllText: { color: "#dc3545", fontWeight: "bold", marginLeft: 8 },
  viewOrderButton: {
    marginTop: 16,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "#007bff",
    alignItems: "center",
  },
  viewOrderText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  pickerFallback: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 12,
  },
  fallbackOption: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: "#f7f7f7",
  },
  fallbackSelected: {
    backgroundColor: "#007bff",
  },
});