import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { EventItem } from "../types/event";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { toggleFavourite } from "../redux/slices/favouriteSlice";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../utils/theme";

interface Props {
  event: EventItem;
  onPress?: () => void;
}

const EventCard = ({ event, onPress }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { favouriteEvents } = useSelector(
    (state: RootState) => state.favourites
  );
  const user = useSelector((state: RootState) => state.auth.user);

  const isFavourite = favouriteEvents?.some((fav) => fav.id === event.id);

  const toggle = () => {
    dispatch(toggleFavourite({ event, user }));
  };

  const imageUrl = event.images?.[0]?.url;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
        elevation: 4,
      }}
    >
      <Image
        source={{ uri: imageUrl }}
        style={{ width: "100%", height: 160, borderRadius: 12 }}
      />
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          marginTop: 8,
          color: colors.dark,
        }}
      >
        {event.name}
      </Text>
      <Text style={{ color: "#555", marginTop: 4 }}>
        {event.dates?.start?.localDate}
      </Text>
      <Text style={{ color: "#777", fontStyle: "italic", marginTop: 2 }}>
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
    </TouchableOpacity>
  );
};

export default EventCard;
