import React, { useState } from "react";
import CreatePostPage from "../components/TextEditor";
import TextEditor from "../components/TextEditor";

export default function EditorPage() {
  return (
    <div>
      <h1>Write your article here</h1>
      <TextEditor />
    </div>
  );
}
