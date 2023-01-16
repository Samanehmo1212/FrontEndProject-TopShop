import * as React from "react";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputBase,
  InputLabel,
  Paper,
  TextField,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { createUser, fetchAllUsers } from "../redux/reducers/userReducers";
import { Value } from "sass";
import { iteratorSymbol } from "immer/dist/internal";
import { Search } from "@mui/icons-material";
import ProductCategories from "../components/ProductCategories";

const Users = () => {
  // /let users=useAppSelector(state=>state.userReducer)
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");
  // useEffect(()=>{
  //     dispatch(fetchAllUsers())
  // },[])
  //  const users=useAppSelector(state=>state.userReducer.filter(item=> {
  //    return item.name.toLowerCase().indexOf(search.toLowerCase())>-1
  // }))

  // useEffect(()=>{
  // },[search])

  const craeteuser = () => {
    dispatch(
      createUser({
        email: "nico111@gmail.com",
        password: "aassaaa",
        name: "Nicolas11",
        avatar: "https://api.lorem.space/image/face?w=640&h=480",
      })
    );
  };

  return (
    <Box>
      <Paper
        component="form"
        sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
      >
        <IconButton sx={{ p: "10px" }} aria-label="menu">
          <MenuIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Users Name"
          inputProps={{ "aria-label": "Search Users Name" }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton color="primary" sx={{ p: "10px" }} aria-label="directions">
          <DirectionsIcon />
        </IconButton>
      </Paper>

      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
          "& .avatar": { m: 1, width: "60ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <Box>
          <TextField
            required
            id="outlined-required"
            label="Name"
            //   defaultValue="Enter your name"
          />
          <TextField required id="outlined-disabled" label="Email" />
          <TextField
            required
            id="outlined-password-input"
            label="Password"
            type="Password"
            autoComplete="current-password"
          />
          <TextField required id="avatar" type="file" />

          <Button onClick={craeteuser}>Add new user</Button>
        </Box>
      </Box>

      {/* {users.map(user=>(
            <Box key={user.id}>
                <p>{user.name}</p>
            </Box>
        )
            )
        }  */}
    </Box>
  );
};

export default Users;
