import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { COLORS } from "../../constants/colors";
import { clearError, registerUser } from "../../store/slices/authSlice";

export default function Register() {
  const dispatch = useDispatch();
  const { isLoading, error, accessToken } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (error) {
      Alert.alert("Erreur", error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (accessToken) {
      router.replace("/(tabs)");
    }
  }, [accessToken]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Nom complet requis";
    }

    if (!formData.email) {
      newErrors.email = "Email requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email invalide";
    }

    if (!formData.phone) {
      newErrors.phone = "Téléphone requis";
    } else if (!/^[0-9+\-\s()]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Numéro de téléphone invalide";
    }

    if (!formData.password) {
      newErrors.password = "Mot de passe requis";
    } else if (formData.password.length < 6) {
      newErrors.password =
        "Le mot de passe doit contenir au moins 6 caractères";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirmation du mot de passe requise";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = () => {
    if (validateForm()) {
      const userData = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      };
      dispatch(registerUser(userData));
    }
  };

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ flex: 1, backgroundColor: COLORS.white, padding: 20 }}>
          <View
            style={{ alignItems: "center", marginTop: 40, marginBottom: 30 }}
          >
            {/* Section des boutons de navigation */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                marginBottom: 20,
              }}
            >
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
                onPress={() => router.replace("/(tabs)")}
              >
                <Ionicons
                  name="home-outline"
                  size={24}
                  color={COLORS.primary}
                />
                <Text style={{ color: COLORS.primary, marginLeft: 8 }}>
                  Accueil
                </Text>
              </TouchableOpacity>
            </View>

            <Text
              style={{
                fontSize: 28,
                fontWeight: "bold",
                color: COLORS.primary,
              }}
            >
              Créer un compte
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: COLORS.gray,
                marginTop: 8,
                textAlign: "center",
              }}
            >
              Rejoignez Urdocto et prenez rendez-vous facilement
            </Text>
          </View>

          <View style={{ marginBottom: 16 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                marginBottom: 8,
                color: COLORS.black,
              }}
            >
              Nom complet *
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: errors.fullName ? COLORS.error : COLORS.grayLight,
                backgroundColor: COLORS.grayLight,
                borderRadius: 12,
                padding: 16,
                fontSize: 16,
              }}
              placeholder="Mohamed Bensalem"
              value={formData.fullName}
              onChangeText={(text) => updateFormData("fullName", text)}
            />
            {errors.fullName && (
              <Text style={{ color: COLORS.error, fontSize: 14, marginTop: 4 }}>
                {errors.fullName}
              </Text>
            )}
          </View>

          <View style={{ marginBottom: 16 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                marginBottom: 8,
                color: COLORS.black,
              }}
            >
              Email *
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: errors.email ? COLORS.error : COLORS.grayLight,
                backgroundColor: COLORS.grayLight,
                borderRadius: 12,
                padding: 16,
                fontSize: 16,
              }}
              placeholder="votre@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
              value={formData.email}
              onChangeText={(text) => updateFormData("email", text)}
            />
            {errors.email && (
              <Text style={{ color: COLORS.error, fontSize: 14, marginTop: 4 }}>
                {errors.email}
              </Text>
            )}
          </View>

          <View style={{ marginBottom: 16 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                marginBottom: 8,
                color: COLORS.black,
              }}
            >
              Téléphone *
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: errors.phone ? COLORS.error : COLORS.grayLight,
                backgroundColor: COLORS.grayLight,
                borderRadius: 12,
                padding: 16,
                fontSize: 16,
              }}
              placeholder="0550123456"
              keyboardType="phone-pad"
              value={formData.phone}
              onChangeText={(text) => updateFormData("phone", text)}
            />
            {errors.phone && (
              <Text style={{ color: COLORS.error, fontSize: 14, marginTop: 4 }}>
                {errors.phone}
              </Text>
            )}
          </View>

          <View style={{ marginBottom: 16 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                marginBottom: 8,
                color: COLORS.black,
              }}
            >
              Mot de passe *
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: errors.password ? COLORS.error : COLORS.grayLight,
                backgroundColor: COLORS.grayLight,
                borderRadius: 12,
                padding: 16,
                fontSize: 16,
              }}
              placeholder="Votre mot de passe"
              secureTextEntry
              value={formData.password}
              onChangeText={(text) => updateFormData("password", text)}
            />
            {errors.password && (
              <Text style={{ color: COLORS.error, fontSize: 14, marginTop: 4 }}>
                {errors.password}
              </Text>
            )}
          </View>

          <View style={{ marginBottom: 24 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                marginBottom: 8,
                color: COLORS.black,
              }}
            >
              Confirmer le mot de passe *
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: errors.confirmPassword
                  ? COLORS.error
                  : COLORS.grayLight,
                backgroundColor: COLORS.grayLight,
                borderRadius: 12,
                padding: 16,
                fontSize: 16,
              }}
              placeholder="Confirmez votre mot de passe"
              secureTextEntry
              value={formData.confirmPassword}
              onChangeText={(text) => updateFormData("confirmPassword", text)}
            />
            {errors.confirmPassword && (
              <Text style={{ color: COLORS.error, fontSize: 14, marginTop: 4 }}>
                {errors.confirmPassword}
              </Text>
            )}
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: COLORS.primary,
              padding: 16,
              borderRadius: 12,
              alignItems: "center",
              marginBottom: 20,
              opacity: isLoading ? 0.7 : 1,
            }}
            onPress={handleRegister}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={COLORS.white} />
            ) : (
              <Text
                style={{ color: COLORS.white, fontSize: 16, fontWeight: "600" }}
              >
                Créer mon compte
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={{ alignItems: "center", padding: 16 }}
            onPress={() => router.back()}
          >
            <Text
              style={{ color: COLORS.primary, fontSize: 16, fontWeight: "600" }}
            >
              Déjà un compte ? Se connecter
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
