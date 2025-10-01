import { Ionicons } from "@expo/vector-icons";
import React, { useCallback, useEffect } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CommonHeader from "../../components/CommonHeader";
import DoctorCard from "../../components/DoctorCard";
import SearchBar from "../../components/SearchBar";
import SpecialtyFilter from "../../components/SpecialtyFilter";
import { COLORS } from "../../constants/colors";
import { logoutUser } from "../../store/slices/authSlice";
import {
  fetchDoctors,
  fetchSpecialties,
  setSearchQuery,
  setSelectedSpecialty,
} from "../../store/slices/doctorsSlice";

export default function DoctorsScreen() {
  const dispatch = useDispatch();
  const { doctors, specialties, isLoading, searchQuery, selectedSpecialty } =
    useSelector((state) => state.doctors);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = useCallback(async () => {
    try {
      await Promise.all([
        dispatch(
          fetchDoctors({ search: searchQuery, specialty: selectedSpecialty })
        ),
        dispatch(fetchSpecialties()),
      ]);
    } catch (error) {
      Alert.alert("Erreur", "Impossible de charger les données");
    }
  }, [dispatch, searchQuery, selectedSpecialty]);

  const handleSearch = (text) => {
    dispatch(setSearchQuery(text));
    dispatch(fetchDoctors({ search: text, specialty: selectedSpecialty }));
  };

  const handleSpecialtySelect = (specialty) => {
    dispatch(setSelectedSpecialty(specialty));
    dispatch(fetchDoctors({ search: searchQuery, specialty }));
  };

  const handleRefresh = () => {
    loadData();
  };

  const handleLogout = () => {
    Alert.alert("Déconnexion", "Êtes-vous sûr de vouloir vous déconnecter ?", [
      { text: "Annuler", style: "cancel" },
      {
        text: "Déconnexion",
        style: "destructive",
        onPress: () => dispatch(logoutUser()),
      },
    ]);
  };

  const renderDoctorItem = ({ item }) => <DoctorCard doctor={item} />;

  const renderEmptyList = () => (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <Ionicons name="search-outline" size={64} color={COLORS.gray} />
      <Text
        style={{
          fontSize: 18,
          color: COLORS.gray,
          marginTop: 16,
          textAlign: "center",
        }}
      >
        {searchQuery || selectedSpecialty !== "all"
          ? "Aucun médecin ne correspond à vos critères"
          : "Aucun médecin disponible"}
      </Text>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      {/* Header */}

      <CommonHeader
        title="Médecins"
        subtitle={`Bonjour${user ? `, ${user.fullName}` : ""} 👋`}
        showHomeButton={true}
      />

      {/* Barre de recherche */}
      <SearchBar
        value={searchQuery}
        onChangeText={handleSearch}
        placeholder="Rechercher un médecin par nom..."
      />

      {/* Filtres par spécialité */}
      {specialties.length > 0 && (
        <SpecialtyFilter
          specialties={specialties}
          selectedSpecialty={selectedSpecialty}
          onSelectSpecialty={handleSpecialtySelect}
        />
      )}

      {/* Liste des médecins */}
      {isLoading && doctors.length === 0 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={{ marginTop: 16, color: COLORS.gray }}>
            Chargement des médecins...
          </Text>
        </View>
      ) : (
        <FlatList
          data={doctors}
          renderItem={renderDoctorItem}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={handleRefresh}
              colors={[COLORS.primary]}
            />
          }
          ListEmptyComponent={renderEmptyList}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 20,
          }}
        />
      )}
    </View>
  );
}
