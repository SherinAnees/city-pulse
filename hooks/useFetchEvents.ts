import { useEffect, useState } from 'react';
import { TICKETMASTER_BASE_URL, TICKETMASTER_API_PARAMS } from '../constants';
import { EventItem } from '../types/event';

export const useFetchEvents = (keyword = '') => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${TICKETMASTER_BASE_URL}?keyword=${keyword}${TICKETMASTER_API_PARAMS}`);
        const data = await res.json();
        const eventList = data?._embedded?.events || [];
        setEvents(eventList);
      } catch (error) {
        console.error('Failed to fetch events', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [keyword]);

  return { events, loading };
};
