import { CardTypeMap } from "@mui/material/Card";
import { Action, createSlice } from "@reduxjs/toolkit";
import { useState } from "react";
import { CartType } from "../../types/cartType";
import { Product } from "../../types/product";


const initialState:CartType[]=[]

//const dispatch=
//  function add(state:number):number{
//    return state=state+1;
//    // const cartItem=state.cartItems.find((cartItem:any)=>cartItem.id===action.payload.id);
//    // cartItem ?(cartItem.amount=cartItem.amount+1):state.cartItems.push({...action.payload,amount:1})
//  }



const cartSlice=createSlice({
  name:"cartSlice",
  initialState,
  reducers:{

    
    // increaseTotalCart:(state)=>{
    //   if(state.length!==0){
    //     for(let i=0;i<=state.length;i++)
    //     state[1].itemAmount
    //   }

    // },

    addItem: (state, action) => {
      if(state.some(item => item.cartItem.id === action.payload.id)) {
          state.map(product => {
              if (product.cartItem.id === action.payload.id ) {
                  product.itemAmount = product.itemAmount + 1;
                
              }
              return state
          })
      } else {
          
          state.push({cartItem:action.payload,itemAmount:1});
      }
      return state;
  }
  }
  //  addItem:(state:CartType[],action:Product)=>{
  //   const cartItem=state.find((item)=>item.cartItem.id===action.id)
  //   const cartItemIndex=state.findIndex((item)=>item.cartItem.id===action.id)
  //   if(cartItem) 
  //   {
  //     cartItem.itemAmount=cartItem.itemAmount+1
  //      state[cartItemIndex].itemAmount=cartItem.itemAmount
  //   } 
  //   }else{
  //       state.push({ cartItem:action.payload,itemAmount:1})
  //   }  
    
  
  }
)
 export const {addItem}=cartSlice.actions
const cartReducer=cartSlice.reducer
export default cartReducer