import { EventItem } from "./event";

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Signup: undefined;
  Home: undefined;
   EventDetail: { event: EventItem};
 
};