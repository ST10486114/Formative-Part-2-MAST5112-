import { Tabs } from "expo-router";
import React from "react";

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen name="Home" options={{ title: "Home" }} />
      <Tabs.Screen name="Menu" options={{ title: "Menu" }} />
      <Tabs.Screen name="Order" options={{ title: "Order" }} />
      <Tabs.Screen name="Summary" options={{ title: "Summary" }} />
    </Tabs>
  );
}
