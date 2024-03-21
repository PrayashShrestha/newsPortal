import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import userService from "../services/userService";
import Image from "next/image";
import LETSS from "../public/assets/LETSS.png";
import Router from "next/router";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleForgotPassword = async () => {
    try {
      const response = await userService.forgotPassword({ email });
      setMessage(response.message);
      setOpenSnackbar(true);
      setTimeout(() => {
        setMessage("");
        setOpenSnackbar(false);
        Router.push("/login");
      }, 4000);
    } catch (error) {
      console.error("Error:", error.response.data.error);
      setMessage("An error occurred while sending the password reset link.");
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
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
            top: "45px",
            left: "-550px",
            height: "100%",
            width: "100%",
            overflow: "hidden",
            zIndex: 2,
          }}
        >
          <Image
            src={LETSS}
            alt="forgot"
            layout="fill"
            objectFit="scale-down"
          />
        </Box>
        <Box sx={{ width: { xs: "100%", md: "50%" } }}>
          <Typography component="h1" variant="h5" textAlign="center">
            Forgot Password
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
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />

            <Button
              variant="contained"
              type="submit"
              fullWidth
              sx={{ mt: 3, mb: 2 }}
              onClick={(e) => {
                e.preventDefault();
                handleForgotPassword();
              }}
            >
              Send Email
            </Button>
          </Box>
        </Box>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        message={message}
      />
    </Container>
  );
};

export default ForgotPassword;
