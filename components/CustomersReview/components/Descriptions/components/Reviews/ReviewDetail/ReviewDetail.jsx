import * as React from 'react'

import {dateFormat} from 'utils'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Rating from '@mui/material/Rating'
import StarIcon from '@mui/icons-material/Star'
import {IconButton, useTheme} from '@mui/material'
import Stack from '@mui/material/Stack'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import {singleReviewPatch} from 'services'
import {BouncyLoading} from 'sharedComponents'

function ReviewDetail(props) {
  const theme = useTheme()

  const [rateState, setRateState] = React.useState({
    like: {amount: props.like, loading: false},
    dislike: {amount: props.dislike, loading: false},
  })

  const reviewRateHandler = (id, rate_type) => {
    setRateState(prev => ({
      ...prev,
      [rate_type]: {...prev[rate_type], loading: true},
    }))
    singleReviewPatch(id, {rate_type})
      .then(res => {
        setRateState(prev => ({
          ...prev,
          [rate_type]: {amount: res[rate_type], loading: false},
        }))
      })
      .catch(() =>
        setRateState(prev => ({
          ...prev,
          [rate_type]: {...prev[rate_type], loading: false},
        })),
      )
  }

  return (
    <Box mb={6}>
      <Typography variant={'h4'}>{props.customer_name}</Typography>

      <Box mt={2}>
        <Rating
          defaultValue={props.score}
          emptyIcon={<StarIcon color={'grey'} fontSize="inherit" />}
          readOnly
          sx={{
            '& .MuiRating-icon': {
              color: theme.palette.golden.main,
            },
          }}
        />
      </Box>

      <Stack alignItems={'center'} direction={'row'} gap={3}>
        <Typography variant={'h6'}>{props.title}</Typography>
        <Typography color={'primary'} variant={'subtitle1'}>
          {/*TO DO::: After implementing Verified purchase in back should be used*/}
          {/* {props.approved ? 'Verified purchase' : ''} */}
        </Typography>
      </Stack>
      <Box mt={2}>
        <Typography variant={'body1'}>{props.comment}</Typography>
      </Box>

      <Box mt={2}>
        <Typography color={'secondary'} variant={'body1'}>
          {props.location ? `Reviewed in ${props.location} on` : null}{' '}
          {dateFormat(props.date_created)}
        </Typography>
      </Box>

      <Stack
        alignItems={'center'}
        direction={'row'}
        justifyContent={'flex-end'}
      >
        <Typography color={'primary'} variant={'body2'}>
          Did you find it useful?
        </Typography>
        <Stack alignItems={'center'} direction={'row'} ml={6}>
          {rateState.like.loading ? (
            <BouncyLoading sx={{mt: '-36px', ml: 7}} />
          ) : (
            <>
              <IconButton
                color="primary"
                onClick={() => reviewRateHandler(props.id, 'like')}
              >
                <ThumbUpIcon />
              </IconButton>
              <Typography color={'primary'} variant={'h5'}>
                {rateState.like.amount}
              </Typography>
            </>
          )}
        </Stack>
        <Stack alignItems={'center'} direction={'row'} ml={6}>
          {rateState.dislike.loading ? (
            <BouncyLoading sx={{mt: '-36px', ml: 7}} />
          ) : (
            <>
              <IconButton
                color="primary"
                onClick={() => reviewRateHandler(props.id, 'dislike')}
              >
                <ThumbDownIcon />
              </IconButton>
              <Typography color={'primary'} variant={'h5'}>
                {rateState.dislike.amount}
              </Typography>
            </>
          )}
        </Stack>
      </Stack>
    </Box>
  )
}

export default ReviewDetail
