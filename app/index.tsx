import { Redirect } from "expo-router";
import React from "react";

// Redirect root to the Home tab (change "/Home" to "/Menu" or another route if you prefer)
export default function IndexRedirect() {
  return <Redirect href="/Home" />;
}