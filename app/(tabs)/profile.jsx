// screens/ProfileScreen.tsx
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CommonHeader from "../../components/CommonHeader";
import ProtectedScreen from "../../components/ProtectedScreen";
import { COLORS } from "../../constants/colors";
import { logoutUser } from "../../store/slices/authSlice";

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    Alert.alert("Déconnexion", "Êtes-vous sûr de vouloir vous déconnecter ?", [
      {
        text: "Annuler",
        style: "cancel",
      },
      {
        text: "Se déconnecter",
        style: "destructive",
        onPress: () => dispatch(logoutUser()),
      },
    ]);
  };

  // Options du menu profil
  const profileOptions = [
    {
      icon: "person-outline",
      title: "Informations personnelles",
      description: "Modifiez vos coordonnées",
      comingSoon: true,
    },
    {
      icon: "lock-closed-outline",
      title: "Sécurité du compte",
      description: "Changez votre mot de passe",
      comingSoon: true,
    },
    {
      icon: "notifications-outline",
      title: "Notifications",
      description: "Gérez vos préférences",
      comingSoon: true,
    },
    {
      icon: "shield-checkmark-outline",
      title: "Confidentialité",
      description: "Paramètres de confidentialité",
      comingSoon: true,
    },
  ];

  const stats = [
    { label: "RDV à venir", value: "0", icon: "calendar" },
    { label: "RDV passés", value: "0", icon: "checkmark-done" },
  ];

  return (
    <ProtectedScreen>
      <ScrollView
        style={{ flex: 1, backgroundColor: COLORS.background }}
        showsVerticalScrollIndicator={false}
      >
        <CommonHeader
          title="Profile"
          subtitle="Gérez votre compte et préférences"
          showHomeButton={true}
        />

        <View style={{ padding: 24, marginTop: -30 }}>
          {/* Carte profil principale */}
          <View
            style={{
              backgroundColor: COLORS.white,
              borderRadius: 20,
              padding: 24,
              marginBottom: 24,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: 0.1,
              shadowRadius: 20,
              elevation: 8,
            }}
          >
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 20,
                gap: 20,
              }}
            >
              <View
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                  backgroundColor: COLORS.primary,
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 16,
                  shadowColor: COLORS.primary,
                  shadowOffset: { width: 0, height: 8 },
                  shadowOpacity: 0.3,
                  shadowRadius: 12,
                  elevation: 6,
                }}
              >
                <Text
                  style={{
                    color: COLORS.white,
                    fontSize: 24,
                    fontWeight: "bold",
                    letterSpacing: 1,
                  }}
                >
                  {user?.fullName
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: "700",
                    color: COLORS.black,
                    marginBottom: 4,
                  }}
                >
                  {user?.fullName}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 6,
                  }}
                >
                  <Ionicons name="mail-outline" size={16} color={COLORS.gray} />
                  <Text
                    style={{ fontSize: 14, color: COLORS.gray, marginLeft: 6 }}
                  >
                    {user?.email}
                  </Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons name="call-outline" size={16} color={COLORS.gray} />
                  <Text
                    style={{ fontSize: 14, color: COLORS.gray, marginLeft: 6 }}
                  >
                    {user?.phone}
                  </Text>
                </View>
              </View>
            </View>

            {/* Statistiques */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                backgroundColor: COLORS.grayLight + "40",
                borderRadius: 16,
                padding: 16,
              }}
            >
              {stats.map((stat, index) => (
                <View key={index} style={{ alignItems: "center" }}>
                  <View
                    style={{
                      backgroundColor: COLORS.primary + "15",
                      width: 44,
                      height: 44,
                      borderRadius: 22,
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: 8,
                    }}
                  >
                    <Ionicons
                      name={stat.icon}
                      size={20}
                      color={COLORS.primary}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "700",
                      color: COLORS.primary,
                    }}
                  >
                    {stat.value}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: COLORS.gray,
                      marginTop: 2,
                      fontWeight: "500",
                    }}
                  >
                    {stat.label}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Section support */}
          <View
            style={{
              backgroundColor: `linear-gradient(135deg, ${COLORS.primary}15, ${COLORS.secondary}15)`,
              borderRadius: 20,
              padding: 24,
              marginBottom: 24,
              borderWidth: 1,
              borderColor: COLORS.primary + "20",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <View
                style={{
                  backgroundColor: COLORS.primary,
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 16,
                }}
              >
                <Ionicons
                  name="help-buoy-outline"
                  size={24}
                  color={COLORS.white}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "700",
                    color: COLORS.black,
                    marginBottom: 4,
                  }}
                >
                  Centre d'aide
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: COLORS.gray,
                  }}
                >
                  Questions fréquentes et support
                </Text>
              </View>
            </View>
            <Text
              style={{
                fontSize: 13,
                color: COLORS.gray,
                lineHeight: 18,
                textAlign: "center",
                fontStyle: "italic",
              }}
            >
              Notre équipe support est disponible pour vous aider du lundi au
              vendredi, 9h-18h
            </Text>
          </View>

          {/* Bouton déconnexion */}
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.white,
              padding: 20,
              borderRadius: 16,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1.5,
              borderColor: COLORS.error + "30",
              shadowColor: COLORS.error,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 12,
              elevation: 4,
            }}
            onPress={handleLogout}
          >
            <Ionicons name="log-out-outline" size={22} color={COLORS.error} />
            <Text
              style={{
                color: COLORS.error,
                fontSize: 16,
                fontWeight: "700",
                marginLeft: 12,
              }}
            >
              Se déconnecter
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ProtectedScreen>
  );
}
