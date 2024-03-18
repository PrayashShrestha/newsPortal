import React, { useState } from "react";
import CreatePostPage from "../components/TextEditor";
import TextEditor from "../components/TextEditor";
import { Container } from "@mui/material";
import ResponsiveAppBar from "../components/AppBar";

export default function EditorPage() {
  return (
    <>
      <ResponsiveAppBar />{" "}
      <Container maxWidth="md" sx={{ marginY: 2, marginX: "auto" }}>
        <h1>Write your article here</h1>
        <TextEditor />
      </Container>
    </>
  );
}
