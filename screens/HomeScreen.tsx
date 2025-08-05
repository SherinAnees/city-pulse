import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { logoutUser } from "../redux/slices/authSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "../components/SearchBar";
import EventCard from "../components/EventCard";
import { useFetchEvents } from "../hooks/useFetchEvents";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { colors } from "../utils/theme";

export default function HomeScreen({ navigation }: any) {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const [keyword, setKeyword] = useState("");
  const [city, setCity] = useState("");

  const { events, loading, refetchEvents, loadMore, hasMore } = useFetchEvents(
    keyword,
    city
  );

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigation.replace("Splash");
  };
  const handleLogin = () => {
    navigation.replace("Login");
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (keyword || city) {
        refetchEvents();
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [keyword, city]);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.navigate("Splash")}>
          <Ionicons name="arrow-back" size={24} style={{ marginLeft: 15 }} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>
          Welcome {user?.name ? user.name : "Guest"} !
        </Text>
        {user ? (
          <TouchableOpacity style={styles.authButton} onPress={handleLogout}>
            <FontAwesome5
              name="sign-out-alt"
              size={18}
              color="#333"
              style={styles.icon}
            />
            <Text style={styles.authButtonText}>Logout</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.authButton} onPress={handleLogin}>
            <FontAwesome5
              name="sign-in-alt"
              size={18}
              color="#333"
              style={styles.icon}
            />
            <Text style={styles.authButtonText}>Login</Text>
          </TouchableOpacity>
        )}
      </View>
      <SearchBar
        keyword={keyword}
        setKeyword={setKeyword}
        city={city}
        setCity={setCity}
      />

      {loading ? (
        <Text style={styles.loadingText}>Loading events...</Text>
      ) : (
        <FlatList
          data={events}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <EventCard
              event={item}
              onPress={() =>
                navigation.navigate("EventDetail", { event: item })
              }
            />
          )}
          contentContainerStyle={{ paddingBottom: 100 }}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={refetchEvents} />
          }
          ListEmptyComponent={
            !loading ? (
              <Text style={styles.loadingText}>No events found</Text>
            ) : null
          }
          onEndReached={() => {
            if (hasMore && !loading) {
              loadMore();
            }
          }}
          onEndReachedThreshold={0.5}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightBlueBg,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "600",
  },
  logout: {
    fontSize: 16,
    color: "red",
    padding: 2,
    outlineColor: "red",
  },
  login: {
    fontSize: 16,
    color: "green",
    padding: 2,
    outlineColor: "green",
  },
  list: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  loadingText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
  authButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    marginTop: 10,
  },

  authButtonText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 6,
  },

  icon: {
    marginRight: 4,
  },
});
