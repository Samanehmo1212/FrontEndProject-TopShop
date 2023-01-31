import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

import { Category } from "../../types/category";

const initialState: Category[] = [];
export const fetchCategories = createAsyncThunk("fetchCategories", async () => {
  try {
    const res: AxiosResponse<Category[], Category[]> = await axios.get(
      "https://api.escuelajs.co/api/v1/categories"
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
});
const categorySlice = createSlice({
  name: "categoryReducer",
  initialState: initialState,
  reducers: {
    sortByName: (state, action: PayloadAction<"asc" | "desc">) => {
      if (action.payload === "asc") {
        state.sort((a, b) => a.name.localeCompare(b.name));
      } else {
        state.sort((a, b) => b.name.localeCompare(a.name));
      }
    },
    filterByName: (state, action) => {
      return state.filter((category) =>
        category.name.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
  },
  extraReducers: (build) => {
    build.addCase(fetchCategories.fulfilled, (state, action) => {
      if (action.payload) {
        return action.payload;
      } else {
        return state;
      }
    });
    build.addCase(fetchCategories.rejected, (state) => {
      console.log("Error fetching data");
      return state;
    });
    build.addCase(fetchCategories.pending, (state) => {
      console.log("Data is loading...");
      return state;
    });
  },
});

const categoryReducer = categorySlice.reducer;
export const { sortByName, filterByName } = categorySlice.actions;

export default categoryReducer;
