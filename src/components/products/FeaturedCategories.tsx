import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import { fetchCategories } from "../../redux/reducers/categoryReducers";

export default function ()  {
  const categories = useAppSelector((state) => state.categoryReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  const handleImage = (
    event: React.MouseEvent<HTMLElement>,
    categoryId: number
  ) => {
    event.preventDefault();
    navigate(`/categories/${categoryId}/products`);
  }
    return (
      <div>
        <ImageList sx={{ margin: 10, width: 900, height: 450 }} cols={5}>
          {categories.map((item) => (
            <ImageListItem key={item.id}>
              <img
                src={`${item.image}?w=248&fit=crop&auto=format`}
                srcSet={`${item.image}?w=248&fit=crop&auto=format&dpr=5 5x`}
                alt={item.name}
                loading="lazy"
                onClick={(e) => handleImage(e, item.id)}
              />
              <ImageListItemBar
                title={item.name}
                actionIcon={
                  <IconButton
                    sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                    aria-label={`info about ${item.name}`}
                  >
                    <InfoIcon />
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
      </div>
    );
  };


