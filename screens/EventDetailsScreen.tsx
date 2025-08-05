import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../types/types";
import { colors } from "../utils/theme";
import { Ionicons } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";

type EventDetailRouteProp = RouteProp<RootStackParamList, "EventDetail">;

export default function EventDetailsScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute<EventDetailRouteProp>();
  const { event } = route.params;

  const venue = event._embedded?.venues?.[0];
  // const latitude = venue?.location?.latitude ? parseFloat(venue.location.latitude) : null;
  //   const longitude = venue?.location?.longitude ? parseFloat(venue.location.longitude) : null;

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Ionicons name="arrow-back" size={24} color={colors.dark} />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <Image source={{ uri: event.images[0]?.url }} style={styles.image} />

      <Text style={styles.title}>{event.name}</Text>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Date:</Text>
        <Text style={styles.value}>
          {event.dates?.start?.localDate || "N/A"}
        </Text>

        <Text style={styles.label}>Venue:</Text>
        <Text style={styles.value}>{venue?.name || "N/A"}</Text>

        <Text style={styles.label}>City:</Text>
        <Text style={styles.value}>{venue?.city?.name || "N/A"}</Text>

        <Text style={styles.label}>Description:</Text>
        <Text style={styles.value}>
          {event.info || "No description available"}
        </Text>
      </View>

      {/* Map-Integration */}
      {/* {latitude && longitude ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          scrollEnabled={false}
          zoomEnabled={false}
        >
          <Marker coordinate={{ latitude, longitude }} title={venue?.name} />
        </MapView>
      ) : (
        <Text style={styles.noMapText}>Location map not available</Text>
      )} */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightBlueBg,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  backText: {
    marginLeft: 8,
    fontSize: 16,
    color: colors.dark,
  },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    color: colors.dark,
  },
  infoBox: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  label: {
    fontWeight: "600",
    color: "#333",
    marginTop: 8,
  },
  value: {
    fontSize: 15,
    color: "#555",
    marginBottom: 4,
  },
});
