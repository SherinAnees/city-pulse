import { View, Text, Button, StyleSheet } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { logoutUser } from "../redux/slices/authSlice";

export default function HomeScreen({ navigation }: any) {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigation.replace("Splash");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to City Pulse</Text>
      <Text style={styles.welcome}>
        Welcome{user?.name ? `, ${user.name}` : ""}!
      </Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, marginBottom: 20 },
  welcome: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
