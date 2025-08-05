import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

interface Props {
  keyword: string;
  setKeyword: (text: string) => void;
  city: string;
  setCity: (text: string) => void;
}

const SearchBar = ({ keyword, setKeyword, city, setCity }: Props) => {
  return (
    <View style={styles.container}>
      <TextInput
        value={keyword}
        onChangeText={setKeyword}
        placeholder="Search by event name"
        style={styles.input}
      />
      <TextInput
        value={city}
        onChangeText={setCity}
        placeholder="Enter city"
        style={styles.input}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  input: {
    backgroundColor: "#f3f4f6",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  countryPicker: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 12,
    backgroundColor: "#f3f4f6",
  },
});
