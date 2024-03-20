import React, { useEffect, useState } from "react";
import Router from "next/router"
import {useRouter} from "next/router";
import CardComp from '../components/CardComp';
import ResponsiveAppBar from '../components/AppBar';
import {
    Container, Typography,
    Box, CardMedia, Divider,
    Grid, Paper
} from '@mui/material';
 
export default function ArticleDetailsPage() {
    function sendProps(id){
      Router.push({pathname:'/details',query:{id}})
    }
    const router = useRouter();
    console.log(router.query);
    const {id} = router.query; 
    const [article, setArticle] = useState([])
    const [recommended, setRecommended] = useState([])
 
    useEffect(() => {
        const fetchArticles = async () =>{
          const response = await fetch(`api/news/${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          })
          if(response.ok){
            const result = await response.json();
            setArticle(result);
            console.log(article);
          }else{
            throw new Error('Network response was not ok')
          }
        }
        fetchArticles()
      },[])
 
      // useEffect(() => {
      //   const fetchArticles = async () =>{
      //     const response = await fetch('api/news/random', {
      //       method: 'GET',
      //       headers: {
      //         'Content-Type': 'application/json',
      //       },
      //     })
      //     if(response.ok){
      //       const result = await response.json();
      //       setRecommended(result);
      //       // console.log(article[0]?.title);
      //     }else{
      //       throw new Error('Network response was not ok')
      //     }
      //   }
      //   fetchArticles()
      // },[])
 
 
    return (
        <div>
            <ResponsiveAppBar />
            <Container maxWidth="md" component="article" sx={{ my: 4 }} >
                <Typography variant="h3" component="h1" gutterBottom>{article?.title}</Typography>
                <Typography variant="subtitle1" color="text.secondary" component="p" sx={{ marginY: 2, marginX: 'auto' }}>
                    Published on {article?.publishedAt} by {article?.author}
                </Typography>
                <CardMedia component="img" height="400" image={article?.featuredImage} alt="" />
                <Box mt={4}>
                    {article?.content?.map((d) => (<Typography>{d}</Typography>))}
                    {/* <Typography variant="body1" component="p">{article.content}</Typography> */}
                </Box>
            </Container>
            
            <Container maxWidth="md">
                <Divider sx={{ marginY: 3, marginX: 'auto', borderColor: 'primary.main', borderWidth: '2px', borderStyle: 'solid' }} />
                <Typography variant="h4" component="h4" sx={{ marginY: 1, marginX: 'auto' }}>Recommendeds...</Typography>
                    <Grid container spacing={3} >
                        {recommended.map((articleElem) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={articleElem?.id} onClick={() => sendProps(articleElem?.id)} style={{ cursor: 'pointer' }}>
                                <CardComp title={articleElem?.title} content={articleElem?.content} imageUrl={articleElem?.featuredImage} />
                            </Grid>
                        ))}
                    </Grid>
            </Container>
            <Container maxWidth="md">
                <Divider sx={{ marginY: 3, marginX: 'auto', borderColor: 'primary.main', borderWidth: '2px', borderStyle: 'solid' }} />
                <Typography variant="h4" component="h4" sx={{ marginY: 1, marginX: 'auto' }}>Footer</Typography>
            </Container>
        </div>
    );
}