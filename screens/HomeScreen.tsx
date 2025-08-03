import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { logoutUser } from "../redux/slices/authSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "../components/SearchBar";
import EventCard from "../components/EventCard";
import { useFetchEvents } from "../hooks/useFetchEvents";

export default function HomeScreen({ navigation }: any) {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const [keyword, setKeyword] = useState("");
  const { events, loading, refetchEvents } = useFetchEvents(keyword);
  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigation.replace("Splash");
  };
  console.log(user);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>
          Welcome {user?.name ? user.name : "Guest"}!
        </Text>
        {user && (
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.logout}>Logout</Text>
          </TouchableOpacity>
        )}
      </View>

      <SearchBar keyword={keyword} setKeyword={setKeyword} />

      {loading ? (
        <Text style={styles.loadingText}>Loading events...</Text>
      ) : (
        <FlatList
          data={events}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <EventCard event={item} />}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={refetchEvents} />
          }
          ListEmptyComponent={
            !loading ? (
              <Text style={styles.loadingText}>No events found</Text>
            ) : null
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "600",
  },
  logout: {
    fontSize: 16,
    color: "red",
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
});
