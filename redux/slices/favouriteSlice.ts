
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";

interface FavouriteState {
  favouriteIds: string[];
  loading: boolean;
}

const initialState: FavouriteState = {
  favouriteIds: [],
  loading: false,
};

export const fetchFavouritesFromFirestore = createAsyncThunk(
  "favourites/fetch",
  async (uid: string) => {
    const ref = doc(db, "favourites", uid);
    const snap = await getDoc(ref);
    return snap.exists() ? (snap.data().favouriteIds as string[]) : [];
  }
);

export const saveFavouritesToFirestore = createAsyncThunk(
  "favourites/save",
  async ({ uid, favourites }: { uid: string; favourites: string[] }) => {
    const ref = doc(db, "favourites", uid);
    await setDoc(ref, { favouriteIds: favourites });
    return favourites;
  }
);

const favouriteSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    toggleFavourite: (state, action: PayloadAction<string>) => {
      const eventId = action.payload;
      if (state.favouriteIds.includes(eventId)) {
        state.favouriteIds = state.favouriteIds.filter((id) => id !== eventId);
      } else {
        state.favouriteIds.push(eventId);
      }
    },
    clearFavourites: (state) => {
      state.favouriteIds = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavouritesFromFirestore.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFavouritesFromFirestore.fulfilled, (state, action) => {
        state.favouriteIds = action.payload;
        state.loading = false;
      })
      .addCase(fetchFavouritesFromFirestore.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { toggleFavourite, clearFavourites } = favouriteSlice.actions;
export default favouriteSlice.reducer;
