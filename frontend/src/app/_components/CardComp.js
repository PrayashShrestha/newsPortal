import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Image from 'next/image'

export default function CardComp({title, content, imageUrl}) {
  return (
    <Card sx={{ height: 300 }}>
      <CardMedia
        component="img"
        alt="news article"
        height="50"
        image={imageUrl}
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

