import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import {Button, CardActionArea, CardActions, Link} from '@mui/material'

export default function BlogCard(props) {
  const {blog} = props
  const blogUrl = '/advice/' + blog.slug + '/'
  return (
    <Card sx={{maxWidth: 345, mr: 2}} variant="outlined">
      <CardActionArea>
        <CardMedia
          alt={blog.image_alt_text}
          component="img"
          height="140"
          image={blog.image}
        />
        <CardContent sx={{minHeight: '100px', textAlign: 'center'}}>
          <Link color="inherit" href={blogUrl} underline="none">
            <Typography component="div" gutterBottom variant="h5">
              {blog.title}
            </Typography>
          </Link>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{justifyContent: 'center'}}>
        <Link color="inherit" href={blogUrl} underline="none">
          <Button color="primary" size="small">
            Read More
          </Button>
        </Link>
      </CardActions>
    </Card>
  )
}
