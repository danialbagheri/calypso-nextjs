import React from 'react'
import Rating from '@mui/material/Rating'
import StarIcon from '@mui/icons-material/Star'

export default function StarRating(props) {
  const {score, name} = props
  return (
    <Rating
      name={name || 'calypso'}
      defaultValue={parseFloat(score)}
      readOnly
      precision={0.5}
      icon={<StarIcon color={'theme.palette.golden.main'} fontSize="inherit" />}
      emptyIcon={<StarIcon color={'grey'} fontSize="inherit" />}
    />
  )
}
