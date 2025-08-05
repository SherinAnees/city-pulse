import { FlatList, View, Text, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import {
  fetchFavouritesFromFirestore,
  fetchFavouritesFromStorage,
} from "../redux/slices/favouriteSlice";
import EventCard from "../components/EventCard";

const FavouriteScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { favouriteEvents } = useSelector(
    (state: RootState) => state.favourites
  );
  const user = useSelector((state: RootState) => state.auth.user);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = () => {
    if (user) {
      dispatch(fetchFavouritesFromFirestore(user.uid));
    } else {
      dispatch(fetchFavouritesFromStorage());
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
    setTimeout(() => setRefreshing(false), 1000);
  };

  if (favouriteEvents?.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No favourite events yet.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={favouriteEvents}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <EventCard event={item} />}
      contentContainerStyle={{ padding: 16 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
};

export default FavouriteScreen;
