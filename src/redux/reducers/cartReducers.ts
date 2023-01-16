import { useState } from "react";
import { Action, createSlice } from "@reduxjs/toolkit";
import { CardTypeMap } from "@mui/material/Card";

import { CartType } from "../../types/cartType";
import { Product } from "../../types/product";

const initialState: CartType[] = [];
const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addItem: (state, action) => {
      if (state.some((item) => item.cartItem.id === action.payload.id)) {
        state.map((product) => {
          if (product.cartItem.id === action.payload.id) {
            product.itemAmount = product.itemAmount + 1;
          }
          return state;
        });
      } else {
        state.push({ cartItem: action.payload, itemAmount: 1 });
      }
      return state;
    },
    deleteItem: (state, action) => {
      console.log("state", state.length);
      const deleteItemIndex = state.findIndex(
        (i) => i.cartItem.id === action.payload.id
      );

      console.log("deleteitem", deleteItemIndex);
      if (deleteItemIndex > -1) {
        state.splice(deleteItemIndex, 1);

        return state;
      }
    },
    decreseItem: (state, action) => {
      if (state.some((item) => item.cartItem.id === action.payload.id)) {
        state.map((product) => {
          if (product.cartItem.id === action.payload.id) {
            product.itemAmount = product.itemAmount - 1;
            if (product.itemAmount === -1) {
              state = state.filter((i) => i === action.payload);
            }
          }
          return state;
        });
      } else {
        return state;
      }
      return state;
    },
  },
});
export const { addItem, decreseItem, deleteItem } = cartSlice.actions;
const cartReducer = cartSlice.reducer;
export default cartReducer;
