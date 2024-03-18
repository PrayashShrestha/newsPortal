import React, { useState } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Button, Grid, Modal, Box } from "@mui/material";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
const ReactQuill = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  {
    ssr: false,
  }
);
export default function TextEditor() {
  const [editorValue, setEditorValue] = useState("");

  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleImageUpload = (file) => {
    console.log("Uploading image:", file);
    const formData = new FormData();
    formData.append("image", file);

    return fetch("/upload-image", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Image uploaded successfully:", data);
        return { data: { link: data.imageUrl } };
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
        throw new Error("Failed to upload image");
      });
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleSendForApproval = () => {
    setOpenModal(true);
  };

  const handleConfirmSend = () => {
    setOpenModal(false);
  };

  const handleEditorStateChange = (state) => {
    setEditorState(state);
  };

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { header: "3" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", "video"],
      ["clean"],
      ["left", "center", "right", "justify"],
    ],
    clipboard: {
      matchVisual: false,
    },
    handlers: {
      image: handleImageUpload,
    },
    // image: {
    //   uploadCallback: handleImageUpload,
    //   previewImage: true,
    //   alt: { present: true, mandatory: false },
    //   inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg",
    // }
    embedded: { defaultSize: { height: "auto", width: "100%" } },
  };
  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

  const saveContent = () => {
    const contentState = editorState.getCurrentContent();
    const content = JSON.stringify(convertToRaw(contentState));
    console.log("Saving content:", content);
    if (content.text) {
      setEditorValue(content.text);
    }
  };

  const handleChange = (newValue) => {
    setEditorValue(newValue);
    // if (editorValue) {
    //   onChange(newValue);
    // }
  };

  return (
    <div>
      <ReactQuill
        editorState={editorState}
        onEditorStateChange={handleEditorStateChange}
        value={editorValue}
        onChange={handleChange}
        theme="snow"
        formats={formats}
        modules={modules}
      />
      <Grid container justifyContent="flex-end" mt={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            saveContent();
            handleSendForApproval();
          }}
        >
          Save Content
        </Button>
      </Grid>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="send-for-approval-modal"
        aria-describedby="confirm-send-for-approval"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            maxWidth: 400,
          }}
        >
          <p id="confirm-send-for-approval">
            Are you sure you want to send this article for approval?
          </p>
          <Button
            onClick={handleConfirmSend}
            variant="contained"
            sx={{ mr: 2 }}
          >
            Confirm
          </Button>
          <Button onClick={handleCloseModal} variant="contained">
            Cancel
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
