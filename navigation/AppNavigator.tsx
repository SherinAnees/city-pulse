import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import EventDetailsScreen from "../screens/EventDetailsScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import { useEffect, useState } from "react";
import SplashScreen from "../screens/SplashScreen";
import LoginScreen from "../screens/LoginScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomeScreen from "../screens/HomeScreen";
import SignupScreen from "../screens/SignupScreen";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const guestFaves = JSON.parse(
      localStorage.getItem("guest_favourites") || "[]"
    );
    dispatch({ type: "favourites/fetch/fulfilled", payload: guestFaves });
  }, []);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />

      {!user ? (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
        </>
      ) : (
        <Stack.Screen name="Home" component={TabNavigator} />
      )}
    </Stack.Navigator>
  );
}
