// app/(tabs)/Menu.tsx
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

/**
 * Web-friendly Dropdown component.
 * On web it renders a <select>.
 * On native it renders a simple View list fallback.
 */
const Dropdown = ({ selectedValue, onValueChange }: { selectedValue: string; onValueChange: (v: string) => void; }) => {
  const options = ["All", "Starter", "Main", "Dessert"];

  if (Platform.OS === "web") {
    return (
      <select
        value={selectedValue}
        onChange={(e) => onValueChange((e.target as HTMLSelectElement).value)}
        style={{
          padding: 8,
          borderRadius: 8,
          borderColor: "#ccc",
          borderWidth: 1,
          width: "100%",
        }}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt === "All" ? "All Courses" : opt}
          </option>
        ))}
      </select>
    );
  }

  // Native fallback UI (simple buttons)
  return (
    <View style={styles.pickerFallback}>
      {options.map((opt) => (
        <TouchableOpacity
          key={opt}
          onPress={() => onValueChange(opt)}
          style={[styles.fallbackOption, selectedValue === opt && styles.fallbackSelected]}
        >
          <Text style={selectedValue === opt ? { color: "#fff" } : undefined}>
            {opt === "All" ? "All Courses" : opt}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const MENU_ITEMS = [
  { id: "1", name: "Tomato Soup", course: "Starter", price: 60 },
  { id: "2", name: "Grilled Chicken", course: "Main", price: 120 },
  { id: "3", name: "Chocolate Cake", course: "Dessert", price: 75 },
  { id: "4", name: "Salad", course: "Starter", price: 55 },
];

export default function Menu() {
  const [selectedCourse, setSelectedCourse] = useState("All");
  const [order, setOrder] = useState<string[]>([]);
  const router = useRouter();

  const filteredItems =
    selectedCourse === "All"
      ? MENU_ITEMS
      : MENU_ITEMS.filter((item) => item.course === selectedCourse);

  const addToOrder = (id: string) => {
    setOrder((prev) => [...prev, id]);
  };

  const goToOrder = () => {
    router.push({
  pathname: "/Order",
  params: { order: JSON.stringify(order) },
});

  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu</Text>

      <Text style={styles.filterLabel}>Filter by course:</Text>
      <Dropdown selectedValue={selectedCourse} onValueChange={setSelectedCourse} />

      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>
              {item.name} - R{item.price}
            </Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => addToOrder(item.id)}
            >
              <Text style={styles.addText}>Add</Text>
            </TouchableOpacity>
          </View>
        )}
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
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  itemText: { fontSize: 16 },
  addButton: {
    backgroundColor: "#28a745",
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 8,
  },
  addText: { color: "#fff" },
  viewOrderButton: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },
  viewOrderText: { color: "#fff", fontWeight: "bold" },

  // fallback styles for native picker replacement
  pickerFallback: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 12,
  },
  fallbackOption: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ddd",
    marginRight: 8,
    marginBottom: 8,
  },
  fallbackSelected: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
});
