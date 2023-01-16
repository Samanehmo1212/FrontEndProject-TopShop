import {
  Box,
  Grid,
  IconButton,
  Link,
  List,
  ListItem,
  Badge,
  MenuItem,
  Avatar,
  Divider,
  ListItemIcon,
  Menu,
  Tooltip,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LoginIcon from "@mui/icons-material/Login";

import LogoutIcon from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";
import * as React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { useEffect, useState } from "react";
import { CartType } from "../types/cartType";

import { Logout, PersonAdd } from "@mui/icons-material";
import AccountMenue from "./users/AccountMenue1";
import AccountMenue1 from "./users/AccountMenue1";
import AccountMenue2 from "./users/AccountMenue2";

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentUser = useAppSelector((state) => state.userReducer.currentUser);
  let [totalCart, settotalCart] = useState(0);

  const cart = useAppSelector((state) => state.cartReducer);
  const [badge, setBadge] = useState(0);

  const handleBadge = () => {
    let sum = 0;
    cart.forEach((item) => {
      sum += item.itemAmount;
    });

    setBadge(sum);
  };

  useEffect(() => {
    handleBadge();
  });

  useEffect(() => {
    if (cart.length !== 0) totalCart = cart[1].itemAmount;
  }, [totalCart]);

  const handleCart = () => {
    navigate("cart");
  };
  return (
    <Grid
      container
      direction="row"
      spacing={0}
      sx={{ padding: 1, borderBottom: 1, borderColor: "divider" }}
    >
      <Grid item xs={1}>
        <NavLink style={{ fontSize:25,marginLeft: 15, textDecoration: "none" }} to="">
        {`    Home   `}
          
        </NavLink>
      </Grid>
      <Grid item xs={1}>
        <NavLink style={{fontSize:25, margin: 0, textDecoration: "none" }} to="Products">
        {`    Products   `}
        </NavLink>
      </Grid>
      <Grid item xs={8}justifyContent="center"alignItems="center" style={{textAlign: "center"}}>
        <h1  style={{ marginTop: 0 }}>TopShop</h1>
        {/* <NavLink style={{ margin: 0, textDecoration: "none" }} to="#">
         <img src="./pic/logo.png"/>
        </NavLink> */}
      </Grid>
      <Grid item xs={1}>
        <IconButton
          size="large"
          aria-label="Cart"
          color="inherit"
          onClick={handleCart}
        >
          <Badge badgeContent={badge} color="info">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Grid>
      {currentUser ? (
        <>
          <AccountMenue2 />
        </>
      ) : (
        <>
          <Grid item xs={1}>
            <AccountMenue1 />
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default Header;
