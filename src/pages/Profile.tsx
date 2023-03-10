import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import * as React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { setCurrentUser } from "../redux/reducers/userReducers";

const Profile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentUser = useAppSelector((state) => state.userReducer.currentUser);

  useEffect(() => {
    const data = localStorage.getItem("currentUser");
    if (data !== null) dispatch(setCurrentUser(JSON.parse(data)));
  }, [currentUser]);
  const handleProducts = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    navigate("/products");
  };
  const handleEdit = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    navigate("/products");
  };
  return (
    <Box
      sx={{
        margin: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card style={{ maxHeight: 450, width: 200 }}>
        <CardMedia
          component="img"
          alt=""
          image={currentUser?.avatar}
          style={{ height: 100, width: 100 }}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            <span>{currentUser?.name}</span>
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            <span>{currentUser?.email}</span>
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            <span>{currentUser?.role}</span>
          </Typography>
        </CardContent>
        <CardActions>
          <Box>
            <Button onClick={(e) => handleProducts(e)} size="small">
              Products
            </Button>
          </Box>
          <Box>
            <Button onClick={(e) => handleEdit(e)} size="small">
              Edit Profile
            </Button>
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
};

export default Profile;
