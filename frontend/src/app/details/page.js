import React from 'react';
import recommended from "/public/assets/recommended.json";
import CardComp from '../../components/CardComp';
import AppBar from '../../components/AppBar';

import { Container, Typography, Box, CardMedia, Divider, Grid, Paper } from '@mui/material';

export default function ArticleDetailsPage() {
    // Dummy data for demonstration
    const article = {
        title: "Sample Article Title",
        publishDate: "March 17, 2024",
        author: "Author Name",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        imageUrl: "https://getthetiger.com/wp-content/uploads/2020/06/accident-4860938_1920.jpg"
    };

    return (
        <div>
            <AppBar />
            <Container maxWidth="md" component="article" sx={{ my: 4 }} >
                <Typography variant="h3" component="h1" gutterBottom>{article.title}</Typography>
                <Typography variant="subtitle1" color="text.secondary" component="p" sx={{ marginY: 2, marginX: 'auto' }}>
                    Published on {article.publishDate} by {article.author}
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
                            <Grid item xs={12} sm={6} md={4} lg={3} key={article.id} >
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
