import * as React from 'react'
import { Box, Pagination } from '@mui/material'
import  { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook'
import { fetchAllProducts } from '../../redux/reducers/productReducers'


 
  const ProductPagination = () => {
    const pageSize = 10;
 const [pagination,setPagination]=useState({
  count:0,
  from:0,
  to:pageSize
})
  const products = useAppSelector(state => state.productReducer);
   useEffect(() => {
    console.log('hoooooooooooooooooooooooooooo')
    console.log(products.length)
    const data=products.slice(pagination.from,pagination.to)
    setPagination({...pagination,count:products.length})
    console.log(data)
  }, [pagination.from,pagination.to]);
  
  const handlePageChange=(event:React.ChangeEvent<unknown>,page:number)=>{
    const from=(page-1)*pageSize
    const to=(page-1)*pageSize+pageSize
    setPagination({...pagination,from:from,to:to})
  }
  return (
    <Box justifyContent={"center"} alignItems="center" display={"flex"}
        sx={{margin:"20px 0px"}}>
      <Pagination
      count={Math.ceil(pagination.count/pageSize)}
      //  count={Math.ceil(products.length/pageSize)}
        onChange={handlePageChange}
      

      />  
    </Box>     
  )

}

export default ProductPagination