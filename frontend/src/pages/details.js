import React, { useEffect, useState } from "react";

import Router from "next/router";
import { useRouter } from "next/router";

import Cookies from "js-cookie";

import CardComp from "../components/CardComp";
import ResponsiveAppBar from "../components/AppBar";
import {
  Container,
  Typography,
  Box,
  CardMedia,
  Divider,
  Grid,
  Button,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

export default function ArticleDetailsPage() {
  function sendProps(id) {
    Router.push({ pathname: "/details", query: { id } });
  }
  const router = useRouter();
  console.log(router.query);
  const { id } = router.query;
  const [article, setArticle] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const user = Cookies.get("user");
    if (user) {
      var role = JSON.parse(user).role;
    }
    if (role === "Admin") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, []);

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await fetch(`api/news/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const result = await response.json();
        setArticle(result);
        let status = String(article.status).toUpperCase()
        setStatus(status)
      } else {
        console.log("Network response was not ok");
      }
    };
    fetchArticles();
  }, []);

  useEffect(() => {
    const fetchRecommendedArticles = async () =>{
      const response = await fetch('api/news/get-recommend-news', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if(response.ok){
        const result = await response.json();
        console.log({result})
        setRecommended(result)
      }else{
        console.log('Network response was not ok')
      }
    }
    fetchRecommendedArticles()
  },[])
  console.log({recommended})

  const handleClick = async(event) =>{
    let status
    const buttonId = event.currentTarget.id

    if(buttonId === "approve"){
      status = "posted"
    }else{
      status = "rejected"
    } 

    const data = {
      id: id,
      status: status
    }

    try{
      const response = await fetch('/api/news', {
        method: 'PUT',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(data)
      })
      if(response.ok){
        Router.push("/admin");
      }
      else{
        alert("something went wrong")
      }
    } catch(error){
      alert(`An ${error} occurred `)
    }  
  }

  const goback  = () =>{
    Router.push("/admin");
  }


  return (
    <div>
      <ResponsiveAppBar />
      <Container maxWidth="md" component="article" sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          {article?.title}
        </Typography>
        <Typography
          variant="subtitle1"
          color="text.secondary"
          component="p"
          sx={{ marginY: 2, marginX: "auto" }}
        >
          Published on {article?.publishedAt} by {article?.author?.name}
        </Typography>
          {isAdmin && status === "PENDING" ? (
            <Box>
            <Box sx={{ float: "right", marginBottom: "15px" }}>
              <Button
              id="approve"
                variant="outlined"
                color="success"
                startIcon={<CheckCircleIcon />}
                sx={{ marginRight: "10px", borderRadius: "15px" }}
                onClick={handleClick}
              >
                Approve
              </Button>
              <Button
              id="disapprove"
                variant="outlined"
                color="error"
                startIcon={<CancelIcon />}
                sx={{ marginRight: "10px", borderRadius: "15px" }}
                onClick={handleClick}
              >
                Disapprove
              </Button>
            </Box>
            <Box>
            <Button
              variant="outlined"
              startIcon={<ArrowCircleLeftIcon />}
              sx={{ borderRadius: "15px" }}
              onClick={goback}
            >
              Go Back
            </Button>
          </Box>
          </Box>
        ) : (
        <Box sx={{float:"right", marginBottom:"15px"}}>
          <Button
            variant="outlined"
            startIcon={<ArrowCircleLeftIcon />}
            sx={{ borderRadius: "15px" }}
            onClick={goback}
          >
            Go Back
          </Button>
        </Box>
        )}
        <CardMedia
          component="img"
          height="400"
          image={article?.featuredImage}
          alt=""
        />
        <Box mt={4}>
          {article?.content?.map((d) => (
            <Typography>{d}</Typography>
          ))}
          {/* <Typography variant="body1" component="p">{article.content}</Typography> */}
        </Box>
      </Container>

      <Container maxWidth="md">
        <Divider
          sx={{
            marginY: 3,
            marginX: "auto",
            borderColor: "primary.main",
            borderWidth: "2px",
            borderStyle: "solid",
          }}
        />
        <Typography
          variant="h4"
          component="h4"
          sx={{ marginY: 1, marginX: "auto" }}
        >
          Recommendeds...
        </Typography>
        <Grid container spacing={3}>
          {recommended.map((articleElem) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={articleElem?.id}
              onClick={() => sendProps(articleElem?.id)}
              style={{ cursor: "pointer" }}
            >
              <CardComp
                title={articleElem?.title}
                content={articleElem?.content}
                imageUrl={articleElem?.featuredImage}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}
