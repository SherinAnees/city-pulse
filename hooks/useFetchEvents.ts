import { useCallback, useEffect, useState } from "react";
import { TICKETMASTER_BASE_URL, TICKETMASTER_API_KEY } from "../constants";
import { EventItem } from "../types/event";

export const useFetchEvents = (keyword = "", city = "") => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true); 

  const fetchEvents = async () => {
    setLoading(true);
    try {
      let url = `${TICKETMASTER_BASE_URL}?apikey=${TICKETMASTER_API_KEY}`;

      if (initialLoad) {
       
        url += `&countryCode=AE`;
      } else {//for global
        if (keyword) url += `&keyword=${keyword}`;
        if (city) url += `&city=${city}`;
      }

      const res = await fetch(url);
      const data = await res.json();
      const eventList = data?._embedded?.events || [];
      setEvents(eventList);
    } catch (error) {
      console.error("Failed to fetch events", error);
    } finally {
      setLoading(false);
    }
  };

  const refetchEvents = useCallback(() => {
    setInitialLoad(false); 
    fetchEvents();
  }, [keyword, city]);

  useEffect(() => {
    fetchEvents();
  }, []); 

  return { events, loading, refetchEvents };
};
