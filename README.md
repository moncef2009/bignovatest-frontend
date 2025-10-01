# Urdocto - Frontend Mobile

Application mobile pour la gestion des rendez-vous médicaux avec React Native et Expo.

## Technologies

- React Native & Expo
- Redux Toolkit pour la gestion d'état
- Expo Router pour la navigation
- Axios pour les requêtes API

## Structure

- `RootLayout.tsx` : wrapper Redux + auth
- `screens/` : écrans principaux (Home, Profile, Doctors, Appointments, Login, Register)
- `components/` : composants réutilisables (CommonHeader, DoctorCard, SearchBar, etc.)
- `store/` : slices Redux (auth, doctors)
- `constants/colors.ts` : palette de couleurs

## Fonctionnalités

- Authentification (email / téléphone)
- Gestion du profil utilisateur
- Liste et recherche de médecins
- Vue des rendez-vous (bientôt disponible)
- Navigation par onglets

## Lancement

```bash
npm install
expo start
```
