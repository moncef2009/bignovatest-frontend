import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../constants/colors";

const SpecialtyFilter = ({
  specialties,
  selectedSpecialty,
  onSelectSpecialty,
}) => {
  return (
    <View style={{ marginBottom: 20 }}>
      {/* Titre de la section */}
      <View style={{ paddingHorizontal: 16, marginBottom: 12 }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "700",
            color: COLORS.black,
            letterSpacing: -0.5,
          }}
        >
          Spécialités
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: COLORS.gray,
            marginTop: 2,
          }}
        >
          Filtrez par domaine médical
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ paddingHorizontal: 16 }}
        contentContainerStyle={{ paddingRight: 16 }}
      >
        {/* Bouton "Tous" avec icône */}
        <TouchableOpacity
          style={{
            backgroundColor:
              selectedSpecialty === "all" ? COLORS.primary : COLORS.white,
            paddingHorizontal: 20,
            paddingVertical: 12,
            borderRadius: 25,
            marginRight: 10,
            flexDirection: "row",
            alignItems: "center",
            borderWidth: selectedSpecialty === "all" ? 0 : 1.5,
            borderColor: COLORS.grayLight,
          }}
          onPress={() => onSelectSpecialty("all")}
          activeOpacity={0.7}
        >
          <Ionicons
            name="grid-outline"
            size={16}
            color={selectedSpecialty === "all" ? COLORS.white : COLORS.primary}
            style={{ marginRight: 6 }}
          />
          <Text
            style={{
              color:
                selectedSpecialty === "all" ? COLORS.white : COLORS.primary,
              fontWeight: "700",
              fontSize: 14,
              letterSpacing: -0.3,
            }}
          >
            Tous
          </Text>
        </TouchableOpacity>

        {/* Boutons des spécialités */}
        {specialties.map((specialty, index) => (
          <TouchableOpacity
            key={specialty}
            style={{
              backgroundColor:
                selectedSpecialty === specialty ? COLORS.primary : COLORS.white,
              paddingHorizontal: 18,
              paddingVertical: 12,
              borderRadius: 25,
              marginRight: 10,
              borderWidth: selectedSpecialty === specialty ? 0 : 1.5,
              borderColor: COLORS.grayLight,
              shadowColor:
                selectedSpecialty === specialty ? COLORS.primary : "#000",
              shadowOffset: {
                width: 0,
                height: selectedSpecialty === specialty ? 4 : 2,
              },
              shadowOpacity: selectedSpecialty === specialty ? 0.3 : 0.1,
              shadowRadius: selectedSpecialty === specialty ? 8 : 4,
              elevation: selectedSpecialty === specialty ? 6 : 2,
              transform: [
                {
                  scale: selectedSpecialty === specialty ? 1.02 : 1,
                },
              ],
            }}
            onPress={() => onSelectSpecialty(specialty)}
            activeOpacity={0.7}
          >
            <Text
              style={{
                color:
                  selectedSpecialty === specialty
                    ? COLORS.white
                    : COLORS.primary,
                fontWeight: "600",
                fontSize: 14,
                letterSpacing: -0.3,
                textAlign: "center",
              }}
            >
              {specialty}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default SpecialtyFilter;
