import React, { useState } from "react";

import Image from "next/image";
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Link,
} from "@mui/material";
import loginPic from "../public/assets/loginPic.png";
import Cookies from "js-cookie";
import Router from "next/router";

export default function LoginPage() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });
      if (response.ok) {
        const { _, name, role, userId } = await response.json();
        const userData = {
          name: name,
          role: role,
          userId: userId,
        };
        Cookies.set("user", JSON.stringify(userData), { expires: 7 });
        if (role === "Admin") {
          Router.push("/admin");
        } else if (role === "Editor") {
          Router.push("/editor");
        } else {
          alert("Login Failed");
        }
      } else {
        alert("Wrong username or password");
      }
    } catch (error) {
      alert("An error occurred, please try again.");
    }
  };

  return (
    <Container
      component="main"
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box sx={{ position: "relative", width: "100%", maxWidth: "900px" }}>
        <Box
          sx={{
            position: "absolute",
            top: "43px",
            left: "-250px",
            height: "100%",
            width: "80%",
            overflow: "hidden",
            zIndex: 2,
          }}
        >
          <Image
            src={loginPic}
            alt="Login"
            layout="fill"
            objectFit="scale-down"
          />
        </Box>
        <Paper
          elevation={4}
          sx={{
            position: "relative",
            display: "flex",
            justifyContent: "flex-end",
            height: "auto",
            minHeight: "400px",
            width: "100%",
            zIndex: 1,
            bgcolor: "background.paper",
            padding: { xs: 3, md: 6 },
            boxSizing: "border-box",
          }}
        >
          <Box sx={{ width: { xs: "100%", md: "50%" } }}>
            <Typography component="h1" variant="h5" textAlign="center">
              LOGIN
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={loginData.email}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={loginData.password}
                onChange={handleChange}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleLogin}
              >
                Login
              </Button>
              <Box display="flex" justifyContent={"center"}>
                <Link href="/forgotPassword" variant="body2">
                  Forgot password?
                </Link>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
