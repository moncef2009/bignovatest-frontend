import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { authAPI } from "../../services/api";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authAPI.register(userData);
      await SecureStore.setItemAsync(
        "accessToken",
        response.data.tokens.accessToken
      );
      await SecureStore.setItemAsync(
        "refreshToken",
        response.data.tokens.refreshToken
      );
      return response;
    } catch (error) {
      // Récupérer le message d'erreur détaillé de la réponse
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Erreur lors de l'inscription";
      return rejectWithValue(errorMessage);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authAPI.login(credentials);
      await SecureStore.setItemAsync(
        "accessToken",
        response.data.tokens.accessToken
      );
      await SecureStore.setItemAsync(
        "refreshToken",
        response.data.tokens.refreshToken
      );
      return response;
    } catch (error) {
      // Récupérer le message d'erreur détaillé de la réponse
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Erreur lors de la connexion";
      return rejectWithValue(errorMessage);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const refreshToken = state.auth.refreshToken;

      if (refreshToken) {
        await authAPI.logout(refreshToken);
      }

      await SecureStore.deleteItemAsync("accessToken");
      await SecureStore.deleteItemAsync("refreshToken");
    } catch (error) {
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Erreur lors de la déconnexion";
      return rejectWithValue(errorMessage);
    }
  }
);

export const checkAuth = createAsyncThunk(
  "auth/check",
  async (_, { rejectWithValue }) => {
    try {
      const accessToken = await SecureStore.getItemAsync("accessToken");
      const refreshToken = await SecureStore.getItemAsync("refreshToken");

      if (accessToken && refreshToken) {
        const response = await authAPI.getProfile();
        return {
          user: response.data.user,
          accessToken,
          refreshToken,
        };
      } else {
        // Retourne un objet vide plutôt que undefined
        return {
          user: null,
          accessToken: null,
          refreshToken: null,
        };
      }
    } catch (error) {
      await SecureStore.deleteItemAsync("accessToken");
      await SecureStore.deleteItemAsync("refreshToken");
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Erreur de vérification d'authentification";
      return rejectWithValue(errorMessage);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    accessToken: null,
    refreshToken: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data.user;
        state.accessToken = action.payload.data.tokens.accessToken;
        state.refreshToken = action.payload.data.tokens.refreshToken;
        router.replace("/(tabs)");
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // Utilise action.payload au lieu de action.error.message
      })
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data.user;
        state.accessToken = action.payload.data.tokens.accessToken;
        state.refreshToken = action.payload.data.tokens.refreshToken;
        router.replace("/(tabs)");
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // Utilise action.payload au lieu de action.error.message
      })
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.error = null;
        router.replace("/(auth)/login");
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload?.user ?? null;
        state.accessToken = action.payload?.accessToken ?? null;
        state.refreshToken = action.payload?.refreshToken ?? null;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.error = action.payload;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
