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
export const modules = {
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

export const formats = [
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
