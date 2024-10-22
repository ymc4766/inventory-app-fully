import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createCategoryService,
  createUomService,
  getCategoryService,
  getUomService,
} from "../reduxService/productServices";
import { toast } from "react-toastify";

const initialState = {
  categories: [],
  Uom: [],
  isLoading: false,
  isError: false,
  message: "",
};

export const createUom = createAsyncThunk(
  "uom/create",
  async (formData, thunkAPI) => {
    try {
      return await createUomService(formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getUoms = createAsyncThunk("uom/getAll", async (_, thunkAPI) => {
  try {
    return await getUomService();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
    return thunkAPI.rejectWithValue(message);
  }
});

export const createCategory = createAsyncThunk(
  "category/create",
  async (formData, thunkApi) => {
    try {
      return await createCategoryService(formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const getCategories = createAsyncThunk(
  "category/All",
  async (_, thunkApi) => {
    try {
      return await getCategoryService();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.categories = action.payload;
        toast.success("New Category Added Succesfuly");
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.categories = action.payload.categories;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(createUom.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createUom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.Uom = action.payload;
        toast.success("UOM added successfully");
      })
      .addCase(createUom.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getUoms.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUoms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.Uom = action.payload.Uom;
      })
      .addCase(getUoms.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const {} = categorySlice.actions;

export default categorySlice.reducer;
