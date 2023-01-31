import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  CreateProduct,
  CreateProductWithForm,
  ModifyProduct,
  Product,
} from "../../types/product";
import axios, { AxiosError, AxiosResponse } from "axios";
import axiosInstance from "../../common/axiosInstance";
const initialState: Product[] = [];
export const fetchAllProducts = createAsyncThunk(
  "fetchAllProducts",
  async () => {
    try {
      const response = await axiosInstance.get("products");
      return response.data;
    } catch (e: any) {
      console.log(e.response.status, e.response.statusText);
    }
  }
);
export const fetchProductsByCategory = createAsyncThunk(
  "fetchProductsByCategory",
  async (id: string) => {
    try {
      const res: AxiosResponse<Product[], Product[]> = await axios.get(
        `https://api.escuelajs.co/api/v1/categories/${id}/products`
      );
      return res.data;
    } catch (e: any) {
      console.log(e);
    }
  }
);
export const fetchSingleProduct = createAsyncThunk(
  "fetchSingleProduct",
  async (productId: string) => {
    try {
      // const productid=productId.t
      const response = await axios.get(
        `https://api.escuelajs.co/api/v1/products/${productId}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const createProductWithForm = createAsyncThunk(
  "createProductWithForm",
  async ({ images, product }: CreateProductWithForm) => {
    let location: string[] = [];
    try {
      for (let i = 0; i < images.length; i++) {
        const response = await axiosInstance.post("files/upload", images[i]);
        const data = response.data.location;
        console.log("dataaaaa", data);
        location.push(data);
      }

      const productResponse = await axiosInstance.post("products", {
        ...product,
        images: [...product.images, ...location],
      });
      console.log(productResponse.data);
      return productResponse.data;
    } catch (e) {
      const error = e as AxiosError;
      if (error.request) {
        console.log("error from request");
        console.log(error.request.data);
      } else {
        if (error.response) {
          console.log("error from response");
        } else {
          console.log(error.config);
        }
      }
    }
  }
);
export const createProduct = createAsyncThunk(
  "createProduct",
  async (product: CreateProduct) => {
    try {
      const response: AxiosResponse<Product, any> = await axiosInstance.post(
        "products/",
        product
      );
      return response.data;
    } catch (e: any) {
      console.log(e.response.status, e.response.statusText);
    }
  }
);
export const modifyProduct = createAsyncThunk(
  "modifyProduct",
  async ({ id, update }: ModifyProduct) => {
    try {
      const response: AxiosResponse<Product, any> = await axiosInstance.put(
        `products/${id}`,
        update
      );
      return response.data;
    } catch (e: any) {
      console.log(e.response.status, e.response.statusText);
    }
  }
);
const productSlice = createSlice({
  name: "productSlice",
  initialState: initialState,
  reducers: {
    sortByName: (state, action) => {
      if (action.payload === "Name")
        state.sort((a, b) => a.title.localeCompare(b.title));
      else if (action.payload === "Price") {
        state.sort(function (a, b) {
          return a.price - b.price;
        });
      }
    },
    filterbyCategory: (state, action) => {
      if (action.payload === "Clothes") {
        console.log("filteeeeer", state);
        state = state.filter((item) => {
          return item.category.name === action.payload;
        });
      } else if (action.payload === "Electronics") {
        state = state.filter((p) => p.category.name === action.payload);
        console.log("Electonic", state);
      } else if (action.payload === "Shoes") {
      } else if (action.payload === "Furnitures") {
      } else if (action.payload === "Others") {
      }
    },
  },
  extraReducers: (build) => {
    build.addCase(fetchAllProducts.fulfilled, (state, action) => {
      if (action.payload && "message" in action.payload) {
        return state;
      } else if (!action.payload) {
        return state;
      }
      return action.payload;
    });
    build.addCase(fetchSingleProduct.fulfilled, (state, action) => {
      if (action.payload && "message" in action.payload) {
        return state;
      } else if (!action.payload) {
        return state;
      }
      return action.payload;
    });
    build.addCase(fetchAllProducts.rejected, (state, action) => {
      console.log("error in fetching");
      return state;
    });
    build.addCase(fetchAllProducts.pending, (state, action) => {
      console.log("data is loading");
      return state;
    });
    build.addCase(createProduct.fulfilled, (state, action) => {
      if (action.payload) {
        console.log(action.payload);
        state.push(action.payload);
      } else {
        return state;
      }
    });
    build.addCase(createProductWithForm.fulfilled, (state, action) => {
      if (action.payload) {
        console.log(action.payload);
        state.push(action.payload);
      } else {
        return state;
      }
    });
    build.addCase(fetchProductsByCategory.fulfilled, (state, action) => {
      if (action.payload) {
        return action.payload;
      } else {
        return state;
      }
    });
    build.addCase(fetchProductsByCategory.rejected, (state, action) => {
      console.log("Error fetching data");
      return state;
    });
    build.addCase(fetchProductsByCategory.pending, (state, action) => {
      console.log("Data is loading...");
      return state;
    });

    build.addCase(modifyProduct.fulfilled, (state, action) => {
      return state.map((product) => {
        if (product.id === action.payload?.id) {
          return action.payload;
        } else {
          return product;
        }
      });
    });
  },
});
const productReducer = productSlice.reducer;
export default productReducer;
export const { sortByName, filterbyCategory } = productSlice.actions;
