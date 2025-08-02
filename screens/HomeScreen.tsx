// src/screens/HomeScreen.tsx
import { View, Text, Button, StyleSheet } from "react-native";
import React from "react";

export default function HomeScreen({ onLogout }: { onLogout: () => void }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to City Pulse</Text>
      <Button title="Logout" onPress={onLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, marginBottom: 20 },
});
