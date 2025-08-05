import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";

interface User {
  uid: string;
  email: string;
  name?: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async ({ name, email, password }: { name: string; email: string; password: string }, thunkAPI) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await setDoc(doc(db, "users", user.uid), { uid: user.uid, name, email });
    return { uid: user.uid, name, email };
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }: { email: string; password: string }, thunkAPI) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const docRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(docRef);
    const userData = userDoc.data();

    return {
      uid: user.uid,
      email: user.email || "",
      name: userData?.name || "Guest",
    };
  }
);
export const updateUserProfile = createAsyncThunk(
  'auth/updateProfile',
  async ({ name, email }: { name: string; email: string }, thunkAPI) => {
    const user = auth.currentUser;
    if (user) {
      await updateProfile(user, { displayName: name });
      await updateDoc(doc(db, 'users', user.uid), { name, email });

      return { name, email };
    } else {
      throw new Error('User not logged in');
    }
  }
);
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  await signOut(auth);
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(updateUserProfile.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(updateUserProfile.fulfilled, (state, action) => {
      state.loading = false;
      if(state.user){
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
      }
    })
    .addCase(updateUserProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to update profile';
    });
  },
});

export default authSlice.reducer;
