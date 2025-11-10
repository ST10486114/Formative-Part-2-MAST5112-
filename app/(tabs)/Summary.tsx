import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Summary() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Summary</Text>
      <Text style={styles.text}>
        Thank you for using Chef Christoffel’s Menu App!
      </Text>
      <Text style={styles.text}>
        This screen will display the final summary and confirmation.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  text: { fontSize: 16, textAlign: "center", color: "gray" },
});
