// components/CommonHeader.jsx
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { COLORS } from "../constants/colors";

export default function CommonHeader({
  title,
  subtitle,
  showProfileIcon = true,
  showUserGreeting = false,
  backgroundColor = COLORS.primary,
  showHomeButton = false, // <- paramètre pour afficher le bouton accueil
  onHomePress, // <- possibilité de personnaliser l'action
}) {
  const { user } = useSelector((state) => state.auth);

  return (
    <View
      style={{
        backgroundColor,
        paddingTop: 60,
        paddingHorizontal: 24,
        paddingBottom: 40,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ flex: 1 }}>
          {/* Bouton accueil si demandé */}
          {showHomeButton && (
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
              }}
              onPress={onHomePress || (() => router.replace("/(tabs)"))}
            >
              <Ionicons name="home-outline" size={24} color={COLORS.white} />
              <Text
                style={{
                  color: COLORS.white,
                  marginLeft: 8,
                  fontSize: 16,
                  fontWeight: "600",
                }}
              >
                Accueil
              </Text>
            </TouchableOpacity>
          )}

          {/* Titre */}
          <Text
            style={{
              fontSize: 32,
              fontWeight: "800",
              color: COLORS.white,
              letterSpacing: -0.5,
            }}
          >
            {title}
          </Text>

          {/* Sous-titre ou Bonjour user */}
          <Text
            style={{
              fontSize: 16,
              color: COLORS.white,
              opacity: 0.9,
              marginTop: 6,
              fontWeight: "500",
            }}
          >
            {subtitle ||
              (showUserGreeting
                ? `Bonjour${user ? ` ${user.fullName}` : ""}`
                : "")}
          </Text>
        </View>

        {showProfileIcon && (
          <View
            style={{
              backgroundColor: "rgba(255,255,255,0.2)",
              width: 44,
              height: 44,
              borderRadius: 22,
              justifyContent: "center",
              alignItems: "center",
              marginLeft: 16,
            }}
          >
            <Ionicons name="person" size={24} color={COLORS.white} />
          </View>
        )}
      </View>
    </View>
  );
}
