import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "../../firebaseConfig";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { EventItem } from "../../types/event";

interface FavouriteState {
  favouriteEvents: EventItem[];
}

const initialState: FavouriteState = {
  favouriteEvents: [],
};

export const fetchFavouritesFromFirestore = createAsyncThunk(
  "favourites/fetchFirestore",
  async (uid: string) => {
    const docRef = doc(collection(db, "favourites"), uid);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data().favourites : [];
  }
);

export const fetchFavouritesFromStorage = createAsyncThunk(
  "favourites/fetchStorage",
  async () => {
    const data = await AsyncStorage.getItem("guest_favourites");
    return data ? JSON.parse(data) : [];
  }
);

export const toggleFavourite = createAsyncThunk(
  "favourites/toggle",
  async (
    { event, user }: { event: EventItem; user: { uid: string } | null },
    { getState, dispatch }: any
  ) => {
    const state = getState().favourites;
    const exists = state.favouriteEvents.find((e: EventItem) => e.id === event.id);

    let updatedFavourites;

    if (exists) {
      updatedFavourites = state.favouriteEvents.filter((e: EventItem) => e.id !== event.id);
    } else {
      const minimalEvent = {
        id: event.id,
        name: event.name,
        images: event.images,
        dates: event.dates,
        _embedded: {
          venues: event._embedded?.venues?.map((venue) => ({
            name: venue.name,
            city: venue.city,
          })),
        },
      };
      updatedFavourites = [...state.favouriteEvents, minimalEvent];
    }

    if (user) {
      await setDoc(doc(db, "favourites", user.uid), {
        favourites: updatedFavourites,
      });
    } else {
      await AsyncStorage.setItem("guest_favourites", JSON.stringify(updatedFavourites));
    }

    return updatedFavourites;
  }
);

const favouriteSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavouritesFromFirestore.fulfilled, (state, action) => {
        state.favouriteEvents = action.payload;
      })
      .addCase(fetchFavouritesFromStorage.fulfilled, (state, action) => {
        state.favouriteEvents = action.payload;
      })
      .addCase(toggleFavourite.fulfilled, (state, action) => {
        state.favouriteEvents = action.payload;
      });
  },
});

export default favouriteSlice.reducer;
