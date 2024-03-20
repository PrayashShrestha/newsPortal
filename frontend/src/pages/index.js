import Router from "next/router"
import data from "../public/assets/data.json";
import bottomArticle from "../public/assets/bottomArticle.json";
import CardComp from '../components/CardComp';
import ResponsiveAppBar from '../components/AppBar';
import axios from 'axios'
import React, { useEffect, useState } from "react";
 
import {
  Box, Container, Grid,
  Paper, Card, CardActionArea,
  CardContent, Typography, CardMedia,
  Divider
} from '@mui/material';
 
export default function Homepage() {
  function sendProps(id){
    Router.push({pathname:'/details',query:{id}})
  }
 
  const [article, setArticle] = useState([])
 
  const [article1, setArticle1] = useState([])
  const [article2, setArticle2] = useState([])
  const [article3, setArticle3] = useState([])
 
  useEffect(() => {
    const fetchArticles = async () =>{
      const response = await fetch('api/news', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if(response.ok){
        const result = await response.json();
        setArticle(result);
      }else{
        console.log(response);
        throw new Error('Network response was not ok')
      }
    }
    fetchArticles()
  },[])
 
 
 
  useEffect(() => {
    const fetchArticles = async () =>{
      const response = await fetch('api/news/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if(response.ok){
        const result = await response.json();
        setArticle1(result);
      }else{
        throw new Error('Network response was not ok')
      }
    }
    fetchArticles()
  },[])
 
  useEffect(() => {
    const fetchArticles = async () =>{
      const response = await fetch('api/news', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if(response.ok){
        const result = await response.json();
        setArticle2(result);
      }else{
        throw new Error('Network response was not ok')
      }
    }
    fetchArticles()
  },[])
 
  useEffect(() => {
    const fetchArticles = async () =>{
      const response = await fetch('api/news', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if(response.ok){
        const result = await response.json();
        setArticle3(result);
      }else{
        throw new Error('Network response was not ok')
      }
    }
    fetchArticles()
  },[])
 
 
  return (
    <div>
      <ResponsiveAppBar />
      <Container maxWidth='md' sx={{ marginY: 2, marginX: 'auto' }}>
        <Typography variant="h3" component="h2" sx={{ color: 'red' }}>NEWS</Typography>
        <Card sx={{ maxWidth: 900, display: 'flex', flexDirection: 'row' }} >
          <CardActionArea sx={{ display: 'flex', flexDirection: 'row' }}>
            <Grid container spacing={2} onClick={() => sendProps(article[0]?.id)}>
              <Grid item xs={4}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">{article[0]?.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{article[0]?.content}</Typography>
                </CardContent>
              </Grid>
              <Grid item xs={8}>
                <CardMedia component="img" height="300" image={article[0]?.featuredImage} alt="green iguana" sx={{
                borderTopLeftRadius: '200px',
                borderBottomLeftRadius: '200px',
                borderTopRightRadius: '0',
                borderBottomRightRadius: '0',
              }}/>
              </Grid>
            </Grid>
          </CardActionArea>
        </Card>
 
        <Box sx={{ flexGrow: 1, marginY: 2, marginX: 'auto' }} >
          <Grid container spacing={2} >
            {article.slice(1,4).map((articleElem) => (
              <Grid item xs={4} key={articleElem.id} onClick={() => sendProps(articleElem.id)} style={{ cursor: 'pointer' }}>
                <CardComp title={articleElem.title} content={articleElem.content} imageUrl={articleElem.featuredImage} />
              </Grid>
            ))
            }
          </Grid>
        </Box>
      </Container>
 
      <Container maxWidth="md">
 
        <Divider sx={{ marginY: 3, marginX: 'auto', borderColor: 'primary.main', borderWidth: '2px', borderStyle: 'solid'}} />
 
        <Typography variant="h4" component="h4" sx={{ textAlign: 'center', marginY: 5, marginX: 'auto' }}>Most Viewed</Typography>
        <Grid container spacing={3} >
        {article1.slice(1,7).map((articleElem) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={articleElem.id} onClick={() => sendProps(articleElem.id)} style={{ cursor: 'pointer' }}>
              <CardComp title={articleElem.title} content={articleElem.content} imageUrl={articleElem.featuredImage} />
            </Grid>
          ))}
        </Grid>
      </Container>
 
      <Container maxWidth="md">
 
        <Divider sx={{ marginY: 3, marginX: 'auto', borderColor: 'primary.main', borderWidth: '2px', borderStyle: 'solid' }} />
 
        <Typography variant="h4" component="h4" sx={{ marginY: 2, marginX: 'auto' }}>Business</Typography>
        <Grid container spacing={3} >
        {article2.slice(1,7).map((articleElem) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={articleElem.id} onClick={() => sendProps(articleElem.id)} style={{ cursor: 'pointer' }}>
              <CardComp title={articleElem.title} content={articleElem.content} imageUrl={articleElem.featuredImage} />
            </Grid>
          ))}
        </Grid>
      </Container>
 
 
      <Container maxWidth="md">
        <Divider sx={{ marginY: 3, marginX: 'auto', borderColor: 'primary.main', borderWidth: '2px', borderStyle: 'solid' }} />
        <Typography variant="h4" component="h4" sx={{ marginY: 1, marginX: 'auto' }}>Sports</Typography>
        <Grid container spacing={3} >
        {article3.slice(1,7).map((articleElem) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={articleElem.id} onClick={() => sendProps(articleElem.id)} style={{ cursor: 'pointer' }}>
              <CardComp title={articleElem.title} content={articleElem.content} imageUrl={articleElem.featuredImage} />
            </Grid>
          ))}
        </Grid>
      </Container>
 
      <Container maxWidth="md">
        <Divider sx={{ marginY: 3, marginX: 'auto', borderColor: 'primary.main', borderWidth: '2px', borderStyle: 'solid' }} />
        <Typography variant="h4" component="h4" sx={{ marginY: 1, marginX: 'auto' }}>Footer</Typography>
      </Container>
    </div>
  )
}