import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { ViewStyle } from "react-native";
import { colors } from "../utils/theme";

export default function GradientWrapper({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
}) {
  return (
    <LinearGradient
      colors={[colors.gradientStart, colors.gradientEnd]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={[{ flex: 1 }, style]}
    >
      {children}
    </LinearGradient>
  );
}
