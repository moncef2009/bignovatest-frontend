import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doctorsAPI } from "../../services/api";

// Charger les docteurs avec filtres
export const fetchDoctors = createAsyncThunk(
  "doctors/fetchDoctors",
  async (filters = {}, { rejectWithValue }) => {
    try {
      const response = await doctorsAPI.getDoctors(filters);
      return response.data.doctors; // backend envoie { success, data: { doctors, count } }
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Charger les spécialités
export const fetchSpecialties = createAsyncThunk(
  "doctors/fetchSpecialties",
  async (_, { rejectWithValue }) => {
    try {
      const response = await doctorsAPI.getSpecialties();
      return response.data.specialties; // backend envoie { success, data: { specialties } }
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const doctorsSlice = createSlice({
  name: "doctors",
  initialState: {
    doctors: [],
    specialties: [],
    isLoading: false,
    searchQuery: "",
    selectedSpecialty: "all",
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSelectedSpecialty: (state, action) => {
      state.selectedSpecialty = action.payload;
    },
    clearFilters: (state) => {
      state.searchQuery = "";
      state.selectedSpecialty = "all";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.doctors = action.payload;
      })
      .addCase(fetchDoctors.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchSpecialties.fulfilled, (state, action) => {
        state.specialties = action.payload;
      });
  },
});

export const { setSearchQuery, setSelectedSpecialty, clearFilters } =
  doctorsSlice.actions;

export default doctorsSlice.reducer;
