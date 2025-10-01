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
import { clearError, loginUser } from "../../store/slices/authSlice";

export default function Login() {
  const dispatch = useDispatch();
  const { isLoading, error, accessToken } = useSelector((state) => state.auth);
  const [loginMethod, setLoginMethod] = useState("email");
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
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

    if (!formData.email && !formData.phone) {
      newErrors.identity = "Email ou téléphone requis";
    }

    if (loginMethod === "email" && !formData.email) {
      newErrors.email = "Email requis";
    } else if (
      loginMethod === "email" &&
      !/\S+@\S+\.\S+/.test(formData.email)
    ) {
      newErrors.email = "Email invalide";
    }

    if (loginMethod === "phone" && !formData.phone) {
      newErrors.phone = "Téléphone requis";
    } else if (
      loginMethod === "phone" &&
      !/^[0-9+\-\s()]{10,}$/.test(formData.phone)
    ) {
      newErrors.phone = "Numéro de téléphone invalide";
    }

    if (!formData.password) {
      newErrors.password = "Mot de passe requis";
    } else if (formData.password.length < 6) {
      newErrors.password =
        "Le mot de passe doit contenir au moins 6 caractères";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {
    if (validateForm()) {
      const credentials = {
        password: formData.password,
      };

      if (loginMethod === "email") {
        credentials.email = formData.email;
      } else {
        credentials.phone = formData.phone;
      }

      dispatch(loginUser(credentials));
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
        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.white,
            padding: 20,
            paddingTop: 50,
          }}
        >
          {/* Bouton de retour à l'accueil */}
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
            onPress={() => router.replace("/(tabs)")}
          >
            <Ionicons name="home-outline" size={24} color={COLORS.primary} />
            <Text style={{ color: COLORS.primary, marginLeft: 8 }}>
              Accueil
            </Text>
          </TouchableOpacity>

          <View
            style={{ alignItems: "center", marginTop: 20, marginBottom: 40 }}
          >
            <Text
              style={{
                fontSize: 28,
                fontWeight: "bold",
                color: COLORS.primary,
              }}
            >
              Urdocto
            </Text>
            <Text style={{ fontSize: 16, color: COLORS.gray, marginTop: 8 }}>
              Connectez-vous à votre compte
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              marginBottom: 20,
              backgroundColor: COLORS.grayLight,
              borderRadius: 12,
              padding: 4,
            }}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                paddingVertical: 12,
                alignItems: "center",
                backgroundColor:
                  loginMethod === "email" ? COLORS.primary : "transparent",
                borderRadius: 8,
              }}
              onPress={() => setLoginMethod("email")}
            >
              <Text
                style={{
                  color:
                    loginMethod === "email" ? COLORS.white : COLORS.grayDark,
                  fontWeight: "600",
                }}
              >
                Email
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                paddingVertical: 12,
                alignItems: "center",
                backgroundColor:
                  loginMethod === "phone" ? COLORS.primary : "transparent",
                borderRadius: 8,
              }}
              onPress={() => setLoginMethod("phone")}
            >
              <Text
                style={{
                  color:
                    loginMethod === "phone" ? COLORS.white : COLORS.grayDark,
                  fontWeight: "600",
                }}
              >
                Téléphone
              </Text>
            </TouchableOpacity>
          </View>

          {loginMethod === "email" ? (
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
                <Text
                  style={{ color: COLORS.error, fontSize: 14, marginTop: 4 }}
                >
                  {errors.email}
                </Text>
              )}
            </View>
          ) : (
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
                <Text
                  style={{ color: COLORS.error, fontSize: 14, marginTop: 4 }}
                >
                  {errors.phone}
                </Text>
              )}
            </View>
          )}

          <View style={{ marginBottom: 24 }}>
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

          {errors.identity && (
            <Text
              style={{
                color: COLORS.error,
                fontSize: 14,
                marginBottom: 16,
                textAlign: "center",
              }}
            >
              {errors.identity}
            </Text>
          )}

          <TouchableOpacity
            style={{
              backgroundColor: COLORS.primary,
              padding: 16,
              borderRadius: 12,
              alignItems: "center",
              marginBottom: 20,
              opacity: isLoading ? 0.7 : 1,
            }}
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={COLORS.white} />
            ) : (
              <Text
                style={{ color: COLORS.white, fontSize: 16, fontWeight: "600" }}
              >
                Se connecter
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={{ alignItems: "center", padding: 16 }}
            onPress={() => router.push("/(auth)/register")}
          >
            <Text
              style={{ color: COLORS.primary, fontSize: 16, fontWeight: "600" }}
            >
              Créer un compte
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
