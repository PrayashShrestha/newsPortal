import React from "react";

import { Container, Paper } from "@mui/material";
import Chip from "@mui/material/Chip";

import DynamicTabs from "../components/Tab";
import DynamicVictoryChart from "../components/VictoryChart";
import DynamicTable from "../components/Table";
import ResponsiveAppBar from "../components/AppBar"
import PopoverForm from "../components/addEditor";

function admin() {
  const dashboardData = [
    { x: "John Doe", y: 10 },
    { x: "Hari Paudel", y: 10 },
    { x: "John wick", y: 15 },
    { x: "Will Smith", y: 10 },
  ];

  const dateNow = new Date().toDateString();
  const articlerows = [
    {
      articleId: "1",
      title: "Fire Engulfs City Block",
      author: "John Doe",
      date: dateNow,
      status: <Chip label="Posted" color="success" variant="outlined" />,
    },
    {
      articleId: "2",
      title: "Technology Trends: AI Advancements",
      author: "Hari Paudel",
      date: dateNow,
      status: <Chip label="Pending" color="warning" variant="outlined" />,
    },
    {
      articleId: "3",
      title: "World Politics: Summit Diplomacy",
      author: "John wick",
      date: dateNow,
      status: <Chip label="Pending" color="warning" variant="outlined" />,
    },
    {
      articleId: "4",
      title: "Health & Wellness: New Exercise Trends",
      author: "Will Smith",
      date: dateNow,
      status: <Chip label="Rejected" color="error" variant="outlined" />,
    },
  ];

  const articlecolumns = [
    { id: "articleId", label: "Article Id" },
    { id: "title", label: "Title" },
    { id: "author", label: "Author" },
    { id: "date", label: "Date Published" },
    {
      id: "status",
      label: "Status",
    },
  ];

  const authorrows = [
    {
      authorId: "1",
      author: "John Doe",
      email: "johndoe@miu.edu",
      noOfArticle: 10,
    },
    {
        authorId: "2",
        author: "John Wick",
        email: "johmWick@miu.edu",
        noOfArticle: 5,
      },
      {
        authorId: "3",
        author: "Will Smith",
        email: "willSmith@miu.edu",
        noOfArticle: 2,
      },
  ];

  const authorcolumns = [
    { id: "authorId", label: "Author Id" },
    { id: "author", label: "Author Name" },
    { id: "email", label: "Email" },
    { id: "noOfArticle", label: "Articles Published" },
  ];

  function handleButtonClick(row) {
    console.log("Button clicked for row:", row);
  }

  const tabsData = [
    {
      label: "DASHBOARD",
      component: (
        <div style={{width:'90%', height:'60%'}}>
          <DynamicVictoryChart datasets={dashboardData} />
        </div>
      ),
    },
    { label: "AUTHORS", component:(
    <div>
      <div style={{marginBottom:'10px', marginLeft:'20px'}}>
        <PopoverForm/>
      </div>
      <div>
        <DynamicTable
            rows={authorrows}
            columns={authorcolumns}
            button={true}
            buttonText="Details"
            onClick={handleButtonClick}
          />
      </div>

    </div>)  },
    {
      label: "ARTICLES",
      component: (
        <div>
          <DynamicTable
            rows={articlerows}
            columns={articlecolumns}
            button={true}
            buttonText="Details"
            onClick={handleButtonClick}
          />
        </div>
      ),
    },
  ];
  return (
    <div>
      <ResponsiveAppBar/>
    <Container sx={{ mt: "30px", padding: "50px" }}>
      <Paper elevation={5}>
        <DynamicTabs tabs={tabsData} />
      </Paper>
    </Container>
    </div>
  );
}

export default admin;
