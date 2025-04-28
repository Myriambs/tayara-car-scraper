// carSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk pour récupérer les voitures depuis l'API
export const fetchCars = createAsyncThunk("car/fetchCars", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get("http://localhost:5000/api/cars");
    console.log(response.data);
    return response.data; // Retourner les données
  } catch (error) {
    return rejectWithValue(error.response.data || error.message);
  }
});

const carSlice = createSlice({
  name: "car",
  initialState: {
    cars: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.loading = false;
        state.cars = action.payload;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default carSlice.reducer;
