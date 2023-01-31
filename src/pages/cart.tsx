import * as React from "react";
import {
  Box,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import {
  addItem,
  decreseItem,
  deleteItem,
} from "../redux/reducers/cartReducers";
import { Product } from "../types/product";

const Cart = () => {
  const cart = useAppSelector((state) => state.cartReducer);
  const dispatch = useAppDispatch();
  const handleAddItem = (item: Product) => {
    return (event: React.MouseEvent) => {
      event.preventDefault();
      dispatch(addItem(item));
    };
  };
  const handleDecreseItem = (item: Product) => {
    return (event: React.MouseEvent) => {
      event.preventDefault();
      dispatch(decreseItem(item));
    };
  };
  const handleDeleteItem = (item: Product) => {
    return (event: React.MouseEvent) => {
      event.preventDefault();
      dispatch(deleteItem(item));
      console.log("itemitemitem", item);
    };
  };
  const total = cart.reduce((a, b) => a + b.cartItem.price * b.itemAmount, 0);
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "15px",
      }}
    >
      <Grid container justifyContent="center" alignItems="center">
        <Grid item md={8}>
          <Typography textAlign="center">Checkout</Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell>Picture</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>SubTotal</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.map((item) => (
                  <TableRow key={item.cartItem.id}>
                    <TableCell>{item.cartItem.title}</TableCell>
                    <TableCell>
                      <img
                        srcSet={`${item.cartItem.images[0]}?w=20&h=20&auto=format&dpr=4 4x`}
                      />
                    </TableCell>
                    <TableCell>{item.cartItem.price}€</TableCell>
                    <TableCell>{item.itemAmount}</TableCell>
                    <TableCell>
                      {item.cartItem.price * item.itemAmount}€
                    </TableCell>
                    <TableCell>
                      <button onClick={handleAddItem(item.cartItem)}>+</button>
                      <button onClick={handleDecreseItem(item.cartItem)}>
                        -
                      </button>
                      <button onClick={handleDeleteItem(item.cartItem)}>
                        Delete
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell />
                  <TableCell />
                  <TableCell />
                  <TableCell>€{total}.00</TableCell>

                  <TableCell>
                    <button>Proceed to checkout</button>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
          <Divider variant="middle" />
        </Grid>
      </Grid>
    </Box>
  );
};
export default Cart;
