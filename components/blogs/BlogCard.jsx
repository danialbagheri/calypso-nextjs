import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import {Button, CardActionArea, CardActions} from '@mui/material'

export default function BlogCard(props) {
  const {blog} = props

  return (
    <Card sx={{maxWidth: 345, mr: 2}} variant="outlined">
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={blog.image}
          alt={blog.image_alt_text}
        />
        <CardContent sx={{minHeight: '100px', textAlign: 'center'}}>
          <Typography gutterBottom variant="h5" component="div">
            {blog.title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{justifyContent: 'center'}}>
        <Button size="small" color="primary">
          Read More
        </Button>
      </CardActions>
    </Card>
  )
}
