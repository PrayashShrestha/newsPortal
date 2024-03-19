import React, { useEffect } from 'react';
import Router from "next/router"
import {useRouter} from "next/router";
import data from "../public/assets/data.json";
import recommended from "../public/assets/recommended.json";
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
    const article = data.filter((data) => data.id == id)[0];

    return (
        <div>
            <ResponsiveAppBar />
            <Container maxWidth="md" component="article" sx={{ my: 4 }} >
                <Typography variant="h3" component="h1" gutterBottom>{article.title}</Typography>
                <Typography variant="subtitle1" color="text.secondary" component="p" sx={{ marginY: 2, marginX: 'auto' }}>
                    Published on {article.publishedAt} by {article.author}
                </Typography>
                <CardMedia component="img" height="400" image={article.imageUrl} alt="" />
                <Box mt={4}>
                    <Typography variant="body1" component="p">{article.body}</Typography>
                </Box>
            </Container>
            
            <Container maxWidth="md">
                <Divider sx={{ marginY: 3, marginX: 'auto', borderColor: 'primary.main', borderWidth: '2px', borderStyle: 'solid' }} />
                <Typography variant="h4" component="h4" sx={{ marginY: 1, marginX: 'auto' }}>Recommendeds...</Typography>
                    <Grid container spacing={3} >
                        {recommended.map((article) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={article.id} onClick={() => sendProps(article.id)} style={{ cursor: 'pointer' }}>
                                <CardComp title={article.title} content={article.content} imageUrl={article.imageUrl} />
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
