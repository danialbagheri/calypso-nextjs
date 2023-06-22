import {dateFormat} from 'utils'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Rating from '@mui/material/Rating'
import StarIcon from '@mui/icons-material/Star'
import {useTheme} from '@mui/material'
import Stack from '@mui/material/Stack'

function ReviewDetail(props) {
  const theme = useTheme()

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
          {/*{props.approved ? 'Verified purchase' : ''}*/}
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
