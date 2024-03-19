import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

export default function CardComp({title, content, imageUrl}) {
  return (
    <Paper elevation={0} sx={{padding: 0, transition: 'box-shadow 0.3s', 
    ':hover': {boxShadow: '0px 10px 15px rgba(0,0,0,0.2)'}, borderRadius: '16px'}}>
    <Card sx={{ height: 300, borderRadius: '16px'  }}>
      <CardMedia component="img" alt="news article" height="150" image={imageUrl} />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">{title}</Typography>
        <Typography variant="body2" color="text.secondary" >{content.slice(0, 100)+'...'}</Typography>
      </CardContent>
    </Card></Paper>
  );
}

