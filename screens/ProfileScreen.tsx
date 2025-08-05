import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, updateUserProfile } from "../redux/slices/authSlice";
import { fetchFavouritesFromFirestore } from "../redux/slices/favouriteSlice";
import { AppDispatch, RootState } from "../redux/store";
import EventCard from "../components/EventCard";

const ProfileScreen = ({ navigation }: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const favourites = useSelector(
    (state: RootState) => state.favourites.favouriteEvents
  );

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  useEffect(() => {
    if (user) {
      dispatch(fetchFavouritesFromFirestore(user.uid));
    }
  }, [user]);

  const handleUpdateProfile = () => {
    if (!name || !email) {
      Alert.alert("Error", "Name and email are required.");
      return;
    }

    dispatch(updateUserProfile({ name, email }))
      .unwrap()
      .then(() => Alert.alert("Success", "Profile updated."))
      .catch(() => Alert.alert("Error", "Failed to update profile."));
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigation.replace("Splash");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>My Profile</Text>

      <Text>Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text>Email</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} />

      <Button title="Update Profile" onPress={handleUpdateProfile} />

      <View style={styles.section}>
        <Text style={styles.subHeading}>Saved Events</Text>
        {favourites?.length === 0 ? (
          <Text>No saved events</Text>
        ) : (
          favourites?.map((event) => <EventCard key={event.id} event={event} />)
        )}
      </View>

      <Button title="Logout" onPress={handleLogout} color="red" />
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  section: {
    marginTop: 20,
  },
});
