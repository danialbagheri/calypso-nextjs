import * as React from 'react'

import {ReviewContext} from 'components/CustomersReview/ReviewProvider'

import Box from '@mui/material/Box'
import {styled} from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import LinearProgress, {
  linearProgressClasses,
} from '@mui/material/LinearProgress'
import Rating from '@mui/material/Rating'
import StarIcon from '@mui/icons-material/Star'
import {useTheme} from '@mui/material'
import Typography from '@mui/material/Typography'

function StartReviewDetail() {
  const [reviewState] = React.useContext(ReviewContext)
  const theme = useTheme()
  const scoreChart = reviewState.product.score_chart
  const totalRateCount = reviewState.starReviewCount

  const BorderLinearProgress = styled(LinearProgress)(({theme}) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      height: 5,
      backgroundColor:
        theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: 'primary',
    },
  }))

  return (
    <Box mt={8}>
      {Object.keys(scoreChart)
        .slice(0)
        .reverse()
        .map((key, i) => {
          return (
            <Stack
              direction={'row'}
              alignItems={'center'}
              sx={{marginTop: i !== 0 ? 3 : 0}}
              spacing={3}
            >
              <Typography variant={'body3'}>{scoreChart[key]}</Typography>
              <Box sx={{width: '50%', maxWidth: 160}}>
                <BorderLinearProgress
                  variant="determinate"
                  value={(scoreChart[key] / totalRateCount) * 100}
                />
              </Box>
              <Rating
                sx={{
                  '& .MuiRating-icon': {
                    color: theme.palette.golden.main,
                  },
                }}
                defaultValue={5 - i}
                readOnly
                emptyIcon={<StarIcon color={'grey'} fontSize="inherit" />}
              />
            </Stack>
          )
        })}
    </Box>
  )
}

export default StartReviewDetail
