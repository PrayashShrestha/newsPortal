import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function CardComp({title, content, imageUrl}) {
  return (
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
 
    </Card>
  );
}

