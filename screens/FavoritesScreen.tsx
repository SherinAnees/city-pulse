import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import { AppDispatch, RootState } from "../redux/store";
import { EventItem } from "../types/event";
import { fetchFavouritesFromFirestore } from "../redux/slices/favouriteSlice";
import { TICKETMASTER_API_PARAMS, TICKETMASTER_BASE_URL } from "../constants";
import { FlatList } from "react-native";

export default function FavoritesScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const favouriteIds = useSelector(
    (state: RootState) => state.favourites.favouriteIds
  );
  const [events, setEvents] = useState<EventItem[]>([]);

  useEffect(() => {
    if (user) {
      dispatch(fetchFavouritesFromFirestore(user.uid));
    } else {
      const localFaves = JSON.parse(
        localStorage.getItem("guest_favourites") || "[]"
      );
      dispatch({ type: "favourites/fetch/fulfilled", payload: localFaves });
    }
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `${TICKETMASTER_BASE_URL}?size=50${TICKETMASTER_API_PARAMS}`
      );
      const data = await res.json();
      const favEvents =
        data._embedded?.events.filter((ev: any) =>
          favouriteIds.includes(ev.id)
        ) || [];
      setEvents(favEvents);
    };
    if (favouriteIds.length > 0) fetchData();
  }, [favouriteIds]);

  return (
    <FlatList
      data={events}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <EventCard event={item} />}
      contentContainerStyle={{ paddingBottom: 100 }}
    />
  );
}
