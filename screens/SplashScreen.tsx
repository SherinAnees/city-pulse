import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../types/types";
import GradientWrapper from "../components/GradientWrapper";
import { colors } from "../utils/theme";

type SplashScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Splash"
>;

export default function SplashScreen({ navigation }: any) {
  return (
    <GradientWrapper style={styles.container}>
      <FontAwesome5
        name="city"
        size={100}
        color="#ffffff"
        style={styles.icon}
      />

      <Text style={styles.title}>Welcome to City Pulse</Text>
      <Text style={styles.subtitle}>
        Discover exciting local events near you !!
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </GradientWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  icon: {
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: colors.textSecondary,
    textAlign: "center",
    marginBottom: 40,
  },
  button: {
    backgroundColor: colors.buttonBackground,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
  },
  buttonText: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: "600",
  },
});
