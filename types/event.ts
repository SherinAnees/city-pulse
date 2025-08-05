export interface EventItem {
  id: string;
  name: string;
  dates: {
    start: {
      localDate: string;
    };
  };
  images: { url: string }[];
  _embedded?: {
    venues: { name: string; city: { name: string } }[];
  };
  info:string;
}
