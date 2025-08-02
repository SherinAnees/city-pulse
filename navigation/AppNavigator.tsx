import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import EventDetailsScreen from "../screens/EventDetailsScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import { useEffect, useState } from "react";
import SplashScreen from "../screens/SplashScreen";
import LoginScreen from "../screens/LoginScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem("userToken");
      if (token) setIsLoggedIn(true);
      setIsLoading(false);
    };
    checkLoginStatus();
  }, []);

  const handleLogin = async (username: string) => {
    await AsyncStorage.setItem("userToken", username);
    setIsLoggedIn(true);
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("userToken");
    setIsLoggedIn(false);
  };
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLoading ? (
        <Stack.Screen name="Splash" component={SplashScreen} />
      ) : !isLoggedIn ? (
        <Stack.Screen name="Login">
          {(props) => <LoginScreen {...props} onLogin={handleLogin} />}
        </Stack.Screen>
      ) : (
        <Stack.Screen name="Main">
          {(props) => <TabNavigator {...props} onLogout={handleLogout} />}
        </Stack.Screen>
      )}
    </Stack.Navigator>
  );
}
