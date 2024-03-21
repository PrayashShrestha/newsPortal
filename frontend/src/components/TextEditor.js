import React, { useState } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Button, Grid, Modal, Box } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import TextField from "@material-ui/core/TextField";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import dynamic from "next/dynamic";
import editorServices from "../services/editorService";
import "react-quill/dist/quill.snow.css";
import { formats, modules } from "../utils/textEditor";
const ReactQuill = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  {
    ssr: false,
  }
);
export default function TextEditor() {
  const [editorValue, setEditorValue] = useState("");
  const [postImage, setPostImage] = useState(null);

  const [openModal, setOpenModal] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [title, setTitle] = useState("");
  const [category, setCategory] = React.useState("");

  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleConfirmSend = async () => {
    setOpenModal(false);
    const content = editorValue?.blocks?.map((block) => {
      let contentText = "";
      contentText += block?.text;
      return contentText;
    });

    const data = {
      title: title,
      content: content,
      categoryId: category,
    };
    const postData = JSON.stringify(data);

    editorServices.postArticle(postImage, postData);
    setOpenModal(false);
  };

  const handleEditorStateChange = (state) => {
    setEditorState(state);
  };
  const handleTitle = (e) => {
    //console.log(value)
    setTitle(e.target.value);
  };

  const saveContent = () => {
    setOpenModal(true);
    // const contentState = editorState.getCurrentContent();
    // const content = JSON.stringify(convertToRaw(contentState));
    // console.log("Saving content:", content);
    // if (content.text) {
    //   setEditorValue(content.text);
    // }
  };

  const handleChange = (newValue) => {
    setEditorValue(newValue);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setPostImage(file);
  };

  return (
    <div>
      {" "}
      <div style={{ position: "absolute", top: -30, right: 300 }}>
        <Box sx={{ minWidth: 150, itemAlign: "center" }}>
          <FormControl fullWidth>
            <InputLabel
              id="demo-simple-select-label"
              sx={{
                marginTop: "-7px",
              }}
            >
              Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              sx={{ paddingLeft: "10px" }}
              value={category}
              label="Category"
              onChange={handleChangeCategory}
            >
              <MenuItem value={1}>Sports</MenuItem>
              <MenuItem value={2}>Entertainment</MenuItem>
              <MenuItem value={3}>Politics</MenuItem>
              <MenuItem value={4}>National</MenuItem>
              <MenuItem value={5}>International</MenuItem>
            </Select>
          </FormControl>
        </Box>{" "}
      </div>
      <label
        htmlFor="post-image"
        style={{ position: "absolute", top: -30, right: -5 }}
      >
        <Button
          variant="outlined"
          component="span"
          startIcon={<CloudUploadIcon />}
          onChange={handleImageChange}
        >
          Upload Cover Image
        </Button>
      </label>
      <input
        accept="image/*"
        id="post-image"
        type="file"
        onChange={handleImageChange}
        style={{ display: "none" }}
      />
      <TextField
        id="title"
        label="Title"
        style={{ margin: 8 }}
        placeholder="Write the title here..."
        helperText=""
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
        onChange={handleTitle}
      />
      <ReactQuill
        editorState={editorState}
        onEditorStateChange={handleEditorStateChange}
        value={editorValue}
        placeholder="Write your article here..."
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
