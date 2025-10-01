import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { store } from "../store";
import { checkAuth } from "../store/slices/authSlice";

// Composant pour la logique d'authentification
function AuthWrapper({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return children;
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <AuthWrapper>
        <StatusBar style="auto" />
        <Stack screenOptions={{ headerShown: false }} initialRouteName="(tabs)">
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
        </Stack>
      </AuthWrapper>
    </Provider>
  );
}
