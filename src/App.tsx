import React, { useEffect } from 'react'
import { Provider, useDispatch } from 'react-redux'

import { useAppDispatch, useAppSelector } from './hooks/reduxHook'
import { fetchAllProducts } from './redux/reducers/productReducers'
import Home from './pages/home'
import Cart from './pages/cart'
import Products from './pages/products'
import Profile from './pages/profile'
import { createStore } from './redux/store'
import { BrowserRouter ,Routes, Route} from 'react-router-dom'
import Product from './pages/SingleProduct'
import Root from './pages/root'
import NotFound from './pages/notFound'
import { redirect } from "react-router-dom";
import Users from './pages/users'
import UserPage from './pages/UserPage'
import SingleProduct from './pages/SingleProduct'



const App = () => {
   const products=useAppSelector(state=>state.productReducer)
  // console.log(products)
     const dispatch=useAppDispatch()
    useEffect(()=>{
      dispatch(fetchAllProducts())
      },[])
    //  console.log(products)
     

  return (
    
    //  <div>
    // {products.map(p=>(<p key={p.id}>{p.title}</p>))}
    // </div>
  
  
    <BrowserRouter>
      <Routes>
        <Route path='' element={<Root/>}>
        <Route path='' element ={<Home/>}/>
        <Route path='/products'>
           <Route path='' element ={<Products/>}/>
           {/* <Route path=':id' render ={(props:any)=><SingleProduct {...props}/>}/> */}
        </Route>
        <Route path='/profile' element ={<Profile/>}/>
        <Route path='/notfound' element ={<NotFound/>}/>
        <Route path='/cart' element ={<Cart/>}/>
        <Route path='/users' element ={<UserPage/>}/>
        <Route path='/products/:id' element ={<SingleProduct/>}/>
        {/* <redirect to ="/NotFound" /> */}
      </Route>
      </Routes>
    </BrowserRouter>
   

  )
}

export default App