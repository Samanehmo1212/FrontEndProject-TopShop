import * as React from "react";
import {
  Autocomplete,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  InputBase,
  ListSubheader,
  Pagination,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import {
  fetchAllProducts,
  filterbyCategory,
  sortByName,
} from "../redux/reducers/productReducers";
import { addItem } from "../redux/reducers/cartReducers";
import InfoIcon from "@mui/icons-material/Info";
import Cart from "./cart";

import { Product } from "../types/product";
import formatCurrency from "../utilities/formatCurrency";
import { CartType } from "../types/cartType";
import Categories from "../components/ProductCategories";
import ProductCategories from "../components/ProductCategories";
import ProductPagination from "../components/products/ProductPagination";
import SingleProduct from "./SingleProduct";
import { Link, useNavigate } from "react-router-dom";
import { iteratorSymbol } from "immer/dist/internal";

const Products = () => {
  const navigate=useNavigate()
  const pageSize = 8;
  const [sortState, setSortState] = useState("");
  const sortBy = ["Name", "Price"];
  const categoryItems = [
    "Clothes",
    "Electronics",
    "Furniture",
    "Shoes",
    "Others",
  ];
  const [category, setCategory] = useState("");
  
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  });

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    const from = (page - 1) * pageSize;
    const to = (page - 1) * pageSize + pageSize;
    setPagination({ ...pagination, from: from, to: to });
  };

  const cart = useAppSelector((state) => state.cartReducer);
  const dispatch = useAppDispatch();
  //let [products,setProducts]=useState([])
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [search]);

  const products = useAppSelector((state) =>
    state.productReducer.filter((item) => {
      if (category) {
        return (
          item.title.toLowerCase().indexOf(search.toLowerCase()) > -1 &&
          item.category.name === category
        );
      } else if (category === "") {
        return item.title.toLowerCase().indexOf(search.toLowerCase()) > -1;
      }
    })
  );
  useEffect(() => {
    if (products) {
      const data = products.slice(pagination.from, pagination.to);

      setPagination({ ...pagination, count: products.length });
      console.log(data);
    }
  }, [pagination.from, pagination.to]);


  const additem = (product: Product) => {
    dispatch(addItem(product));
  };

  const handleShowDetails = (event:React.MouseEvent<HTMLElement>,id:number) => {
    event.preventDefault();
navigate(`/products/${id}`);
     // const singleProduct:Product=product
      <SingleProduct  />;
    

  };
  function sortByhandleChange(event: React.SyntheticEvent<Element, Event>,
    value: string | null): void {
    if (value) {
      setSortState(value);
      dispatch(sortByName(value));
    } else {
      setSortState("");
    }
  }
  const filterByCategory = (
    event: React.SyntheticEvent<Element, Event>,
    value: string | null
  ) => {
    if (value) {
      setCategory(value);
    } else {
      setCategory("");
    }
  };
  // useEffect(() => {
  //   dispatch(fetchAllProducts());
  // }, [category,search]);

  return (
    <>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: 1000,
        }}
      >
        <IconButton sx={{ p: "10px" }} aria-label="menu">
          <MenuIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Users Name"
          inputProps={{ "aria-label": "Search Users Name" }}
          value={search}
          //onChange={handleSearch}
          onChange={(e) => setSearch(e.target.value)}
        />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton color="primary" sx={{ p: "10px" }} aria-label="directions">
          <DirectionsIcon />
        </IconButton>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          onChange={sortByhandleChange}
          options={sortBy}
          sx={{ width: 300 }}
          renderInput={(params: any) => (
            <TextField {...params} label="Sort By " />
          )}
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          onChange={filterByCategory}
          options={categoryItems}
          sx={{ width: 300 }}
          renderInput={(params: any) => (
            <TextField {...params} label="Filter  " />
          )}
        />
      </Paper>

      <Grid container spacing={1} direction="row" xs={12} sx={{ margin: 1 }}>
        
        {products.slice(pagination.from, pagination.to).map((product) => (
          <Grid item lg={3} xs={3} key={product.id}>
            <Card style={{ maxHeight: 450 }}>
              <CardMedia
                component="img"
                alt={product.title}
                image={product.images[0]}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  <span>{product.title}</span>
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  <span>{formatCurrency(product.price)}</span>
                </Typography>
              </CardContent>
              <CardActions>
                <Box>
                  <Button onClick={() => additem(product)} size="small">
                    + Add To Cart
                  </Button>

   
                </Box>
                <Box>
                  {/* <Link to={`/products/${product.id}`}> */}
                    <Button onClick={(e) => handleShowDetails(e,product.id)} size="small">
                      Details
                    </Button>
                  {/* </Link> */}
                </Box>
              </CardActions>
            </Card>
          </Grid>
        ))}
        <Box justifyContent={"center"} alignItems="center" display={"flex"}>
          <Box
            justifyContent={"center"}
            alignItems="center"
            display={"flex"}
            sx={{ margin: "20px 0px" }}
          >
            <Pagination
              count={Math.ceil(pagination.count / pageSize)}
              onChange={handlePageChange}
            />
          </Box>
        </Box>
      </Grid>
    </>
  );
};
export default Products;
