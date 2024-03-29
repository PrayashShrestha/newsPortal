import React, { useEffect, useState } from "react";

import Cookies from 'js-cookie';
import Router from 'next/router';

import { Container, Paper } from "@mui/material";
import Chip from "@mui/material/Chip";

import DynamicTabs from "../components/Tab";
import DynamicVictoryChart from "../components/VictoryChart";
import DynamicTable from "../components/Table";
import ResponsiveAppBar from "../components/AppBar"
import PopoverForm from "../components/addEditor";

export default function admin() {

  const[isAuthenticated, setAuthenticated] = useState(false)
  const [author, setAuthor] = useState([])
  const [updateFlag, setUpdateFlag] = useState(false);  
  const [article,setArticle] = useState([])


    useEffect(() => {
      const user = Cookies.get('user');
      if(user){
        var role = JSON.parse(user).role
      }
      if (!user || role !== "Admin") {
        Router.push('/login');
      }
      else{
        setAuthenticated(true)
      }
    }, []);


    useEffect(() => {
      const fetchEditors = async () =>{
        const data = {
          "role": "Editor"
        }
        const response = await fetch('api/user/role', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        })
        if(response.ok){
          const result = await response.json()
          setAuthor(result)
        }else{
          alert("Network response was not ok")
          console.log(response)
        }
      }
      fetchEditors()
    },[updateFlag])

    useEffect(() => {
      const fetchArticles = async () => {
        const response = await fetch ('api/news', {
          method: "GET"
        })
        if(response.ok){
          const result = await response.json()
          setArticle(result)
        }
        else{
          console.log(response)
        }
      }

      fetchArticles()
    },[])


    const dashboardData = [
      { x: "John Doe", y: 10 },
      { x: "Hari Paudel", y: 10 },
      { x: "John wick", y: 15 },
      { x: "Will Smith", y: 10 },
    ];
  
    const articlerows = article?.map((val) => {
      let chip;
      if(val.status === "pending" || val.status === "Pending"){
        chip = <Chip label="Pending" color="warning" variant="outlined" />
     }
     else if (val.status === "posted" || val.status === "Posted"){
       chip = <Chip label="Posted" color="success" variant="outlined" />
     }
     else{
      chip = <Chip label="Rejected" color="error" variant="outlined" />
     }
      let data = {
        articleId: val.id,
        title: val.title,
        author: val.author.name,
        date: val.publishedAt,
        status: chip
      }
      return data
    })
    
  
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
  
      const authorrows = author.map((data) => (
      {
      authorId: data?.id || "",
      author: data?.name || "",
      email: data?.email || "",
      username: data?.username || ""
      }
      
    ))
  
    const authorcolumns = [
      { id: "authorId", label: "Author Id" },
      { id: "author", label: "Author Name" },
      { id: "username", label: "User Name" },
      { id: "email", label: "Email" },
    ];
  
    const handleButtonClick = (row) => {
      let id  = row.articleId
      Router.push({pathname:'/details',query:{id}})

    }

    const handleAddition = () => {
      setUpdateFlag(prevFlag => !prevFlag);
  };
  
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
          <PopoverForm onAdd={handleAddition}/>
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
    {if(isAuthenticated){
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
  }
  }



