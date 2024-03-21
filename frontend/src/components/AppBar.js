"use client";
import React, { useState, useEffect } from "react";
import Router from "next/router"
 
import Cookies from "js-cookie";
 
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AdbIcon from "@mui/icons-material/Adb";
 
const settings = ["Profile", "Account","Logout"];
 
function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [userName, setUser] = useState({})
 
  const pages = [];
 
  const [category, setCategory] = useState([]);
 
  useEffect(() => {
    const fetchCategory = async () =>{
      const response = await fetch('api/category/', {
        method: 'GET',
        headers: {'Content-Type': 'application/json',},
      })
      if(response.ok){
        const result = await response.json();
        console.log(result);
        setCategory(result);
      }else{
        console.log(response);
        throw new Error('Network response was not ok');
      }
    }
    
    fetchCategory();
  }, []);
 
  console.log("category", category)
 
  category.map((elem) => {
    console.log("category elem", pages.push(elem?.name));
  })
 
 
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
 
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
 
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
 
  useEffect(() => {
    const user = Cookies.get("user");
    if(user){
      const userJson = JSON.parse(user)
      setUser(userJson)
      setAuthenticated(true)
    }else{
      setAuthenticated(false);
    }
  }, []);
 
  
  const handleLogout = async () => {
    const response = await fetch('/api/auth/logout', {
      method:'POST',
      headers: {'Content-Type': 'application/json'},
    })
    if(response.ok){
      Cookies.remove("user");
      setAuthenticated(false);
      Router.push("/login");
    }
    else{
      alert(`Error ${response.status}`)
    }
  };
 
 
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
 
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
              <Button
                key={page}
                href={`#${page.toLowerCase}`}
                sx={{ my: 2, color: "white", display: "block" }}
              >{page}</Button>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          {pages.map((page) => (
              <Button
                key={page}
                href={`#${page.toLowerCase}`}
                sx={{ my: 2, color: "white", display: "block" }}
              >{page}</Button>
              ))}
          </Box>
          {isAuthenticated ? (
            <Box sx={{ flexGrow: 0 }}>
              <Typography>{`Welcome ${userName?.name}`}</Typography>
              <Box sx={{display:'flex', justifyContent:'center'}}>
              <Tooltip title="Open settings" sx={{marginLeft:'10px'}}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp">{userName?.name.charAt(0)}</Avatar>
                </IconButton>
              </Tooltip>
              </Box>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={setting === "Logout" ? handleLogout : handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 0 }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "white",
                  color: "#19857b",
                  fontSize: "16px",
                  width:"140%",
                  "&:hover": {
                    color: "white",
                  },
                }}
                onClick={() => {Router.push("/login")}}
              >
                LOG IN
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;