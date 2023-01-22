import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import { setCurrentUser } from "../../redux/reducers/userReducers";

export default function AccountMenue2() {
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState("");
  //const [currentUser,setCurrentUser]=useState(useAppSelector((state) => state.userReducer.currentUser))
  let currentUser = useAppSelector((state) => state.userReducer.currentUser);
  const [currentUserEmail,setCurrentUserEmail]=useState(currentUser)
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  // const data=localStorage.getItem('currentUser')
  //  if (data!==null) setCurrentUserEmail (JSON.parse(data));
  // console.log('uuuuuu',currentUser)
  // if(!currentUser)
  // return
  // else{
  // if (localStorage.getItem('currentUser')==null){
  //   return
  // }
  //   else {
  //   currentUser.email =(localStorage.getItem('currentUser')as string); }
  // }

    
  useEffect(() => {
   if (currentUser) {
    setAvatar(currentUser?.avatar);
  } 
  }, [avatar]);

  useEffect(() => {
    const data =localStorage.getItem('currentUser')
    console.log('pppppppppppppppp',data)
    console.log('gggggg',currentUser)
    if(data!==null ) //setCurrentUserEmail(JSON.parse(data))
   // if (currentUserEmail)
    dispatch(setCurrentUser(JSON.parse(data)))
    console.log('fffff',currentUser)
  }, [currentUser]);

  // useEffect(() => {
  //   const data =localStorage.getItem('currentUser')
  //   if(data!==null ) setCurrentUserEmail(JSON.parse(data))
    
  // }, [currentUserEmail]);
  // useEffect(() => {
  //   if (currentUserEmail)
  //   localStorage.setItem('currentUser',currentUserEmail);
    
  // }, [currentUserEmail]);
  // useEffect(() => {
  //   if(!currentUser)
  // return
  // else{
  // if (localStorage.getItem('currentUser')==null){
  //   return
  // }
  //   else {
  //   currentUser.email =(localStorage.getItem('currentUser')as string); }
  // }
  //  }, [currentUser]);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleProfile = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    if (currentUser) {
      console.log('profileppppppp',currentUser?.email)
      if (currentUser)
      setAvatar(currentUser?.avatar);
      
    }
    navigate("/profile");
  };
  const handleLogout = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    navigate("/logout");
  };
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar src={avatar} sx={{ width: 35, height: 35 }} />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={(e) => handleProfile(e)}>
          <Avatar src={avatar} sx={{ width: 35, height: 35 }} /> Profile
        </MenuItem>
        <Divider />

        <MenuItem onClick={(e) => handleLogout(e)}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
