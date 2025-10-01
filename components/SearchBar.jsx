import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TextInput, View } from "react-native";
import { COLORS } from "../constants/colors";

const SearchBar = ({
  value,
  onChangeText,
  placeholder = "Rechercher un médecin...",
}) => {
  return (
    <View
      style={{
        backgroundColor: COLORS.white,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 12,
        margin: 16,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}
    >
      <Ionicons name="search" size={20} color={COLORS.gray} />
      <TextInput
        style={{
          flex: 1,
          marginLeft: 12,
          fontSize: 16,
          color: COLORS.black,
        }}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.gray}
      />
    </View>
  );
};

export default SearchBar;
