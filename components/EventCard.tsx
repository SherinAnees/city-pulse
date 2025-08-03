import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { EventItem } from "../types/event";

interface Props {
  event: EventItem;
}

const EventCard = ({ event }: Props) => {
  const imageUrl = event.images[0]?.url;

  return (
    <View style={styles.card}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <Text style={styles.title}>{event.name}</Text>
      <Text style={styles.date}>{event?.dates?.start?.localDate}</Text>
      <Text style={styles.venue}>
        {event._embedded?.venues?.[0]?.name},{" "}
        {event._embedded?.venues?.[0]?.city?.name}
      </Text>
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
