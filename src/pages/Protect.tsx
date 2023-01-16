import {Route,redirect} from 'react-router-dom'

// const Protect = ({component:Component,...restprops}) => {
  const Protect = ({...restprops}) => {
  const isAuth=localStorage.getItem('token')

  return (
    <>
  {/* //  <Route{...restprops} render={(props:any)=>{
  //   return isAuth? <Component{...props}/>:<redirect to='login'/>
  // }}/> */}
   </>
  )
}

export default Protect