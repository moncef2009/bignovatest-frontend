// screens/AppointmentsScreen.tsx
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import CommonHeader from "../../components/CommonHeader";
import ProtectedScreen from "../../components/ProtectedScreen";
import { COLORS } from "../../constants/colors";

export default function AppointmentsScreen() {
  return (
    <ProtectedScreen>
      <ScrollView style={{ flex: 1, backgroundColor: COLORS.background }}>
        <CommonHeader
          title="Rendez-vous"
          subtitle="Gérez vos rendez-vous médicaux"
          showHomeButton={true}
        />

        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 40,
          }}
        >
          <Ionicons name="calendar-outline" size={80} color={COLORS.gray} />
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: COLORS.primary,
              marginTop: 20,
              marginBottom: 10,
            }}
          >
            Rendez-vous
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: COLORS.grayDark,
              textAlign: "center",
              marginBottom: 16,
            }}
          >
            Cette fonctionnalité sera disponible prochainement
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: COLORS.gray,
              textAlign: "center",
              lineHeight: 20,
            }}
          >
            Vous pourrez bientôt voir et gérer tous vos rendez-vous médicaux
            dans cette section.
          </Text>
        </View>
      </ScrollView>
    </ProtectedScreen>
  );
}
