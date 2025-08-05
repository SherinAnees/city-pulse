import {  TICKETMASTER_API_KEY, TICKETMASTER_BASE_URL } from "../constants";

export const fetchAllEvents = async () => {
  const res = await fetch(`${TICKETMASTER_BASE_URL}?apikey=${TICKETMASTER_API_KEY}`);
  const data = await res.json();
  return data._embedded?.events || [];
};