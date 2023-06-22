import Rating from '@mui/material/Rating'
import StarIcon from '@mui/icons-material/Star'

export default function StarRating(props) {
  const {score, name} = props
  return (
    <Rating
      defaultValue={parseFloat(score)}
      emptyIcon={<StarIcon color={'grey'} fontSize="inherit" />}
      icon={<StarIcon color={'theme.palette.golden.main'} fontSize="inherit" />}
      name={name || 'calypso'}
      precision={0.5}
      readOnly
    />
  )
}
