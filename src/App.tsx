import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "./hooks/reduxHook";
import { fetchAllProducts } from "./redux/reducers/productReducers";
import Home from "./pages/home";
import Cart from "./pages/cart";
import Products from "./pages/products";
import Profile from "./pages/Profile";
import Root from "./pages/root";
import SingleProduct from "./pages/SingleProduct";
import LoginForm from "./components/users/LoginForm";
import RegisterationForm from "./components/users/RegisterationForm";
import LogoutForm from "./pages/LogoutForm";
import FeaturedProducts from "./components/products/FeaturedProducts";
import UserPage from "./pages/UserPage";

const App = () => {
  const products = useAppSelector((state) => state.productReducer);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Root />}>
          <Route path="" element={<Home />} />
          <Route path="/products">
            <Route path="" element={<Products />} />
          </Route>
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/users" element={<UserPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/logout" element={<LogoutForm />} />
          <Route path="/register" element={<RegisterationForm />} />
          <Route path="/products/:id" element={<SingleProduct />} />
          <Route
            path="/categories/:id/products"
            element={<FeaturedProducts />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
