import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import React from "react";

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>City Pulse</Text>
      <ActivityIndicator size="large" color="#00ADEF" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 28, marginBottom: 16 },
});
