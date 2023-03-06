import * as React from 'react'

import {dateFormat} from 'utils'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Rating from '@mui/material/Rating'
import StarIcon from '@mui/icons-material/Star'
import {useTheme} from '@mui/material'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt'

function ReviewDetail(props) {
  const theme = useTheme()

  const reviewRateHandler = () => {}

  return (
    <Box mb={6}>
      <Typography variant={'h4'}>{props.customer_name}</Typography>

      <Box mt={2}>
        <Rating
          sx={{
            '& .MuiRating-icon': {
              color: theme.palette.golden.main,
            },
          }}
          defaultValue={props.score}
          readOnly
          emptyIcon={<StarIcon color={'grey'} fontSize="inherit" />}
        />
      </Box>

      <Stack direction={'row'} alignItems={'center'} gap={3}>
        <Typography variant={'h6'}>{props.title}</Typography>
        <Typography variant={'subtitle1'} color={'primary'}>
          {props.approved ? 'Verified purchase' : ''}
        </Typography>
      </Stack>
      <Box mt={2}>
        <Typography variant={'body1'}>{props.comment}</Typography>
      </Box>
      {props.location && (
        <Box mt={2}>
          <Typography variant={'body1'} color={'secondary'}>
            Reviewed in {props.location} 🇬🇧 on {dateFormat(props.date_created)}
          </Typography>
        </Box>
      )}
      {/*TO DO ::: implement like and dislike functionality*/}
      {/*<Stack*/}
      {/*  direction={'row'}*/}
      {/*  alignItems={'center'}*/}
      {/*  justifyContent={'flex-end'}*/}
      {/*>*/}
      {/*  <Typography variant={'body2'} color={'primary'}>*/}
      {/*    Did you find it useful?*/}
      {/*  </Typography>*/}
      {/*  <Stack ml={6} direction={'row'} alignItems={'center'}>*/}
      {/*    <IconButton onClick={() => reviewRateHandler('like')} color="primary">*/}
      {/*      <ThumbUpIcon />*/}
      {/*    </IconButton>*/}
      {/*    <Typography variant={'h5'} color={'primary'}>*/}
      {/*      {props.like}*/}
      {/*    </Typography>*/}
      {/*  </Stack>*/}
      {/*  <Stack ml={6} direction={'row'} alignItems={'center'}>*/}
      {/*    <IconButton color="primary">*/}
      {/*      <ThumbDownAltIcon />*/}
      {/*    </IconButton>*/}
      {/*    <Typography variant={'h5'} color={'primary'}>*/}
      {/*      {props.dislike}*/}
      {/*    </Typography>*/}
      {/*  </Stack>*/}
      {/*</Stack>*/}
    </Box>
  )
}

export default ReviewDetail
