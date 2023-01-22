import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/header'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHook';
import { logoutUser, setCurrentUser } from '../redux/reducers/userReducers';

const LogoutForm = () => {
  console.log('logouttttttt')
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.userReducer.currentUser);
  
  console.log('logout',currentUser)
    const navigate=useNavigate()
    localStorage.removeItem('token')
    localStorage.removeItem('currentUser')
    useEffect(() => {
      dispatch(logoutUser())
    });
    
    navigate('/products');
    <Header/>
    //window.location.href="/"
  return (
     null
  )
}

export default LogoutForm