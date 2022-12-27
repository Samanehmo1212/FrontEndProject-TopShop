import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useAppDispatch, useAppSelector } from './hooks/reduxHook'
import { fetchAllProducts } from './redux/reducers/productReducers'

const App = () => {
  const products=useAppSelector(state=>state.productReducer)
  console.log(products)
  const dispatch=useAppDispatch()
  useEffect(()=>{
    dispatch(fetchAllProducts())
  },[])

  
  return (
    <div>App</div>
  )
}

export default App