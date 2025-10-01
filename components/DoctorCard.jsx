import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { COLORS, SHADOWS } from "../constants/colors";

const DoctorCard = ({ doctor, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: COLORS.white,
        borderRadius: 12,
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 16,
        ...SHADOWS.medium,
      }}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {doctor.avatar ? (
          <Image
            source={{ uri: doctor.avatar }}
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              marginRight: 16,
            }}
          />
        ) : (
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: COLORS.primary,
              justifyContent: "center",
              alignItems: "center",
              marginRight: 16,
            }}
          >
            <Text
              style={{ color: COLORS.white, fontSize: 20, fontWeight: "bold" }}
            >
              {doctor.firstName?.[0]}
              {doctor.lastName?.[0]}
            </Text>
          </View>
        )}

        <View style={{ flex: 1 }}>
          <Text
            style={{ fontSize: 18, fontWeight: "bold", color: COLORS.black }}
          >
            Dr. {doctor.firstName} {doctor.lastName}
          </Text>
          <Text style={{ fontSize: 14, color: COLORS.primary, marginTop: 4 }}>
            {doctor.specialty}
          </Text>
          {doctor.address && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 4,
              }}
            >
              <Ionicons name="location-outline" size={14} color={COLORS.gray} />
              <Text style={{ fontSize: 12, color: COLORS.gray, marginLeft: 4 }}>
                {doctor.address}
              </Text>
            </View>
          )}
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: COLORS.primary,
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 20,
          }}
          onPress={() => console.log("Réserver avec", doctor.id)}
        >
          <Text
            style={{ color: COLORS.white, fontSize: 12, fontWeight: "600" }}
          >
            Réserver
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default DoctorCard;
