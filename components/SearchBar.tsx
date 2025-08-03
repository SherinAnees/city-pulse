import { View, TextInput, StyleSheet } from "react-native";
import React from "react";

interface Props {
  keyword: string;
  setKeyword: (text: string) => void;
}

const SearchBar = ({ keyword, setKeyword }: Props) => {
  return (
    <View style={styles.container}>
      <TextInput
        value={keyword}
        onChangeText={setKeyword}
        placeholder="Search events..."
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
  },
});
