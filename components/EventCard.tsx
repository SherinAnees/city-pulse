import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { EventItem } from "../types/event";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import {
  saveFavouritesToFirestore,
  toggleFavourite,
} from "../redux/slices/favouriteSlice";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Props {
  event: EventItem;
}

const EventCard = ({ event }: Props) => {
  const imageUrl = event.images[0]?.url;
  const dispatch = useDispatch<AppDispatch>();
  const { favouriteIds } = useSelector((state: RootState) => state.favourites);
  const user = useSelector((state: RootState) => state.auth.user);

  const isFavourite = favouriteIds.includes(event.id);

  const toggle = () => {
    dispatch(toggleFavourite(event.id));
    if (user) {
      dispatch(
        saveFavouritesToFirestore({
          uid: user.uid,
          favourites: updateLocalStorage(),
        })
      );
    } else {
      updateLocalStorage();
    }
  };

  const updateLocalStorage = () => {
    const updated = isFavourite
      ? favouriteIds.filter((id) => id !== event.id)
      : [...favouriteIds, event.id];
    AsyncStorage.setItem("guest_favourites", JSON.stringify(updated));
    return updated;
  };
  return (
    <View style={styles.card}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <Text style={styles.title}>{event.name}</Text>
      <Text style={styles.date}>{event?.dates?.start?.localDate}</Text>
      <Text style={styles.venue}>
        {event._embedded?.venues?.[0]?.name},{" "}
        {event._embedded?.venues?.[0]?.city?.name}
      </Text>
      <TouchableOpacity onPress={toggle}>
        <Ionicons
          name={isFavourite ? "heart" : "heart-outline"}
          size={24}
          color="red"
        />
      </TouchableOpacity>
    </View>
  );
};

export default EventCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  image: {
    width: "100%",
    height: 160,
    borderRadius: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 8,
  },
  date: {
    color: "#555",
    marginTop: 4,
  },
  venue: {
    color: "#777",
    fontStyle: "italic",
    marginTop: 2,
  },
});
