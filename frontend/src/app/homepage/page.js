import * as React from 'react';
import data from "../data.json"
import CardComp from '../_components/CardComp';
import ResponsiveAppBar from '../_components/AppBar';
import { Container, Grid, Paper } from '@mui/material';

export default function Homepage() {
  return (
    <div>
    <ResponsiveAppBar/>
    <Container >
      <Grid container spacing={3}>
        {data.map((article) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={article.id}>
            <CardComp title={article.title} content={article.content} imageUrl={data.imageUrl} />
          </Grid>
        ))}
      </Grid>
    </Container>
    </div>
  )
}