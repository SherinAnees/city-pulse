import { useCallback, useEffect, useState } from "react";
import { TICKETMASTER_BASE_URL, TICKETMASTER_API_KEY } from "../constants";
import { EventItem } from "../types/event";

export const useFetchEvents = (keyword = "", city = "") => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchEvents = async (reset = false) => {
    setLoading(true);
    try {
      let url = `${TICKETMASTER_BASE_URL}?apikey=${TICKETMASTER_API_KEY}&page=${reset ? 0 : page}`;

      if (initialLoad) {
        url += `&countryCode=AE`;
      } else {
        if (keyword) url += `&keyword=${encodeURIComponent(keyword)}`;
        if (city) url += `&city=${encodeURIComponent(city)}`;
      }

      const res = await fetch(url);
      const data = await res.json();

      const eventList: EventItem[] = data?._embedded?.events || [];
      const totalPages = data?.page?.totalPages || 1;

      setEvents(prev =>
        reset ? eventList : [...prev, ...eventList]
      );

      setHasMore((reset ? 1 : page + 1) < totalPages);
      if (reset) {
        setPage(1);
      } else {
        setPage(prev => prev + 1);
      }
    } catch (error) {
      console.error("Failed to fetch events", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents(true);
  }, []);
 useEffect(() => {
    const debounce = setTimeout(() => {
      if (keyword.trim() === "" && city.trim() === "") {
        setInitialLoad(true);
      } else {
        setInitialLoad(false);
      }
      setPage(0);
      fetchEvents(true);
    }, 300);

    return () => clearTimeout(debounce);
  }, [keyword, city]);
  const refetchEvents = useCallback(() => {
    setInitialLoad(false);
    setPage(0);
    fetchEvents(true);
  }, [keyword, city]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      fetchEvents();
    }
  }, [page, loading, hasMore]);

  return { events, loading, refetchEvents, loadMore, hasMore };
};
