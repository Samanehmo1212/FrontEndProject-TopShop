import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Link,
} from "@mui/material";
import { isAsyncThunkAction } from "@reduxjs/toolkit";
import axios from "axios";
import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { addItem } from "../redux/reducers/cartReducers";
import { fetchSingleProduct } from "../redux/reducers/productReducers";
import { Product } from "../types/product";

const SingleProduct = (props: any) => {
  const navigate = useNavigate();
  let { id } = useParams();
  const [product, setProduct] = useState({});

  const dispatch = useAppDispatch();

  const singleProductState = useAppSelector((state) =>
    state.productReducer.filter((item) => {
      if (id) {
        return item.id === parseInt(id);
      }
    })
  );
  const handleProducts = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    navigate("/products");
  };

  return (
    <>
      <Grid
        container
        pt="50px"
        justifyContent="center"
        alignItems="center"
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Card
          sx={{
            maxWidth: "60rem",
            margin: "10px",
            display: "flex",
            height: "25rem",
          }}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              sx={{
                justifyContent: "center",
                // maxWidth: '100%',
                objectFit: "cover",
                width: "400px",
                height: "200px",
              }}
              // image={singleProductState.images[0]}
              image={singleProductState[0].images[0]}
            />
            <CardContent>
              <Typography variant="h5" component="div">
                {singleProductState[0].title}
              </Typography>
              <Typography
                variant="h5"
                component="div"
              >{`${singleProductState[0].price} $`}</Typography>
              <Typography paragraph component="div">
                {singleProductState[0].description}
              </Typography>
              {/* <Button onClick={()=>additem(props) } size="small">+ Add To Cart</Button> */}
              {/* <Button onClick={()=>{props.history.push('/products')}} size="small">Products</Button> */}

              <Button
                onClick={(e) => {
                  handleProducts(e);
                }}
                size="small"
              >
                Products
              </Button>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </>
  );
};

export default SingleProduct;
