// screens/HomeScreen.tsx
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import CommonHeader from "../../components/CommonHeader";
import { COLORS } from "../../constants/colors";

export default function HomeScreen() {
  const { user } = useSelector((state) => state.auth);

  const quickActions = [
    {
      title: "Trouver un médecin",
      description: "Recherchez et prenez rendez-vous",
      icon: "medical",
      route: "/doctors",
      color: COLORS.primary,
    },
    {
      title: "Mes rendez-vous",
      description: "Consultez vos prochains rendez-vous",
      icon: "calendar",
      route: "/appointments",
      color: COLORS.secondary,
    },
    {
      title: "Mon profil",
      description: "Gérez vos informations personnelles",
      icon: "person",
      route: "/profile",
      color: COLORS.success,
    },
  ];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <CommonHeader
        title={`Bonjour${user ? `, ${user.fullName}` : ""} 👋`}
        subtitle="Comment pouvons-nous vous aider aujourd'hui ?"
      />

      {/* Actions rapides */}
      <View style={{ padding: 20 }}>
        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
            color: COLORS.black,
            marginBottom: 20,
          }}
        >
          Actions rapides
        </Text>

        {quickActions.map((action, index) => (
          <TouchableOpacity
            key={index}
            style={{
              backgroundColor: COLORS.white,
              borderRadius: 12,
              padding: 20,
              marginBottom: 16,
              flexDirection: "row",
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}
            onPress={() => router.push(action.route)}
          >
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                backgroundColor: action.color,
                justifyContent: "center",
                alignItems: "center",
                marginRight: 16,
              }}
            >
              <Ionicons name={action.icon} size={24} color={COLORS.white} />
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: COLORS.black,
                }}
              >
                {action.title}
              </Text>
              <Text style={{ fontSize: 14, color: COLORS.gray, marginTop: 4 }}>
                {action.description}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.gray} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Statistiques */}
      <View style={{ padding: 20, paddingTop: 0 }}>
        <View
          style={{
            backgroundColor: COLORS.white,
            borderRadius: 12,
            padding: 20,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: COLORS.black,
              marginBottom: 16,
            }}
          >
            Votre activité
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <View style={{ alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "bold",
                  color: COLORS.primary,
                }}
              >
                0
              </Text>
              <Text style={{ fontSize: 14, color: COLORS.gray }}>
                RDV à venir
              </Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "bold",
                  color: COLORS.success,
                }}
              >
                0
              </Text>
              <Text style={{ fontSize: 14, color: COLORS.gray }}>
                RDV passés
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
