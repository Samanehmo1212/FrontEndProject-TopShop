import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardActions,
  CardMedia,
  Button,
  Typography,
  CardContent,
} from "@mui/material";
import { Box } from "@mui/system";

import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import { Product } from "../../types/product";
import { addItem } from "../../redux/reducers/cartReducers";
import SingleProduct from "../../pages/SingleProduct";
const FeaturedProducts = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  let { id } = useParams();
  const [category, setCategory] = useState(id);
  const products = useAppSelector((state) =>
    state.productReducer.filter((item) => {
      if (category) {
        console.log("categorycategory", category);
        return item.category.id === parseInt(category);
      } else if (category === "") {
        return;
      }
    })
  );
  const additem = (product: Product) => {
    dispatch(addItem(product));
  };
  const handleShowDetails = (
    event: React.MouseEvent<HTMLElement>,
    id: number
  ) => {
    event.preventDefault();
    navigate(`/products/${id}`);
    <SingleProduct />;
  };
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {products.map((product) => (
        <Box key={product.id} justifyContent="center" alignItems="center">
          <Card sx={{ maxWidth: 345, height: 425, margin: 2 }}>
            <CardMedia
              sx={{ height: 140 }}
              image={product.images[0]}
              title={product.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {product.title} €{product.price}.00
              </Typography>
              <Typography variant="h6">{product.category.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {product.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button onClick={() => additem(product)} size="small">
                + Add To Cart
              </Button>
              <Button
                onClick={(e) => handleShowDetails(e, product.id)}
                size="small"
              >
                Details
              </Button>
            </CardActions>
          </Card>
        </Box>
      ))}
    </Box>
  );
};

export default FeaturedProducts;
