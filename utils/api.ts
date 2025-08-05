import { TICKETMASTER_API_FAV_BY_ID, TICKETMASTER_API_KEY } from "../constants";

export const fetchEventById = async (id: string) => {
  const res = await fetch(`${TICKETMASTER_API_FAV_BY_ID}/${id}.json?apikey=${TICKETMASTER_API_KEY}`);
  const data = await res.json();
  return data;
};