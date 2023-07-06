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
  const scoreChart = reviewState.reviewData.score_chart
  const totalRateCount = reviewState.reviewData.total_review_count || 1

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
              alignItems={'center'}
              direction={'row'}
              key={`${key}${i}`}
              spacing={3}
              sx={{marginTop: i !== 0 ? 3 : 0}}
            >
              <Typography
                sx={{width: '33px', textAlign: 'center'}}
                variant={'body3'}
              >
                {scoreChart[key]}
              </Typography>
              <Box sx={{width: '50%', maxWidth: 160}}>
                <BorderLinearProgress
                  value={(scoreChart[key] / totalRateCount) * 100}
                  variant="determinate"
                />
              </Box>
              <Rating
                defaultValue={5 - i}
                emptyIcon={<StarIcon color={'grey'} fontSize="inherit" />}
                readOnly
                sx={{
                  '& .MuiRating-icon': {
                    color: theme.palette.golden.main,
                  },
                }}
              />
            </Stack>
          )
        })}
    </Box>
  )
}

export default StartReviewDetail
