import * as React from 'react';
import {Box,Checkbox,FormControlLabel,FormControl,FormGroup, FormLabel }from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

import { useState } from 'react';
import { BookmarkBorder, GifBoxOutlined } from '@mui/icons-material';

export default function ProductCategories() {
  const [categoryCkecked, setcategoryCkecked] = useState(false);
  const[category,setCategory]=useState(['All'])
      console.log({category})

  //const [category,setCategory]=useState(['All'])

  const handleChage = (event: React.ChangeEvent<HTMLInputElement>) => {
       setcategoryCkecked(event.target.checked)
  
  };
  
  const handlecategorychange = (event: React.ChangeEvent<HTMLInputElement>) => {
   const index=category.indexOf(event.target.value)
   if(index===-1){
    setCategory([...category,event.target.value])
  }else{
  setCategory(category.filter((category)=>category!==event.target.value))
  }

};

  const children = (
    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
         <FormControlLabel
        
          control={<Checkbox value='Clothes' checked={category.includes('Clothes')} onChange={handlecategorychange}/>}
          label="Clothes"
        />
      <FormControlLabel
       
        label="Electronics"
        control={<Checkbox  value='Electronics' checked={category.includes('Electronics') }onChange={handlecategorychange} />}
      />
      <FormControlLabel
      
        label="Furniture"
        control={<Checkbox  value='Furniture'checked={category.includes('Furniture')}onChange={handlecategorychange} />}
      />
      <FormControlLabel
     
        label="Shoes"
        control={<Checkbox   value='Shoes' checked={category.includes('Shoes')}onChange={handlecategorychange}/>}
      />
      <FormControlLabel
     
       label="Others"
        control={<Checkbox   value='Others' checked={category.includes('Others')}onChange={handlecategorychange}/>}
      />
    </Box>
  );

  return (
    <Box>
       <FormControlLabel
        label="Categories"
        control={
          <Checkbox
          
          />
        }
      />
      {children}
    </Box>
  );
}