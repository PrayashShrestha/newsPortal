import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

export default function CardComp({title, content, imageUrl}) {
  return (
    <Paper elevation={0} sx={{padding: 0, transition: 'box-shadow 0.3s', ':hover': {boxShadow: '0px 10px 15px rgba(0,0,0,0.2)',},}}>
    <Card sx={{ height: 300 }}>
      <CardMedia
        component="img"
        alt="news article"
        height="50"
        image="https://getthetiger.com/wp-content/uploads/2020/06/accident-4860938_1920.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
         {content}
        </Typography>
      </CardContent>
 
    </Card></Paper>
  );
}

