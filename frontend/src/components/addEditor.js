import React, { useState } from "react";
import {
  Button,
  Popover,
  TextField,
  Box,
  InputAdornment,
  IconButton,
  Paper,
} from "@mui/material";
import VpnKeyIcon from "@mui/icons-material/VpnKey";

function generatePassword(length = 10) {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}

export default function PopoverForm() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "" });

  const [password, setPassword] = useState("");
  console.log(formData, password)

  const handleGeneratePassword = () => {
    const newPassword = generatePassword(12);
    setPassword(newPassword);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log(
      `Saved data: Name - ${formData.name}, Email - ${formData.email}`
    );
    handleClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        Add New Editor
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        sx={{
          width: "50%",
          "& .MuiPaper-root": {
            maxHeight: "100%",
            overflowY: "auto",
            backdropFilter: "blur(10px)",
          },
        }}
      >
        <Paper elevation={20}>
        <Box p={2} component="form" noValidate autoComplete="off">
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleGeneratePassword}>
                    <VpnKeyIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              onClick={handleSubmit}
              color="primary"
              variant="contained"
              sx={{ mt: "20px" }}
            >
              Add Editor
            </Button>
          </Box>
        </Box>
        </Paper>
      </Popover>
    </div>
  );
}
