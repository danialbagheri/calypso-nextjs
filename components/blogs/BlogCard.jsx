import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import {Button, Link, CardActionArea, CardActions} from '@mui/material'

export default function BlogCard(props) {
  const {blog} = props
  const blogUrl = '/advice/' + blog.slug + '/'
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
          <Link href={blogUrl} underline="none" color="inherit">
            <Typography gutterBottom variant="h5" component="div">
              {blog.title}
            </Typography>
          </Link>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{justifyContent: 'center'}}>
        <Link href={blogUrl} underline="none" color="inherit">
          <Button size="small" color="primary">
            Read More
          </Button>
        </Link>
      </CardActions>
    </Card>
  )
}
