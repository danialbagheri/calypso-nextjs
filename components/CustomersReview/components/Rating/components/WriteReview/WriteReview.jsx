import * as React from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import {ReviewContext} from 'components/CustomersReview/ReviewProvider'
import {useTheme} from '@mui/material'
import Link from 'next/dist/client/link'

function WriteReview() {
  const [reviewState] = React.useContext(ReviewContext)
  const theme = useTheme()

  return (
    <Box textAlign={'center'}>
      <Button
        startIcon={
          <svg
            fill="none"
            height="18"
            viewBox="0 0 18 18"
            width="18"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.7867 0.00836182C16.1015 0.22221 16.4487 0.400017 16.7226 0.655914C17.3317 1.22538 17.3942 1.96183 16.934 2.66465C16.8259 2.82924 16.689 2.97821 16.5484 3.11877C13.8729 5.79789 11.1962 8.477 8.51347 11.1489C8.37891 11.2835 8.19991 11.3916 8.0209 11.4601C7.25801 11.7532 6.48792 12.0247 5.72143 12.3082C5.47154 12.4008 5.21684 12.456 5.0066 12.2506C4.79515 12.0439 4.84321 11.7916 4.93692 11.5394C5.24087 10.7224 5.53641 9.90185 5.84397 9.08611C5.88842 8.96717 5.97012 8.85304 6.06022 8.76293C8.76817 6.05138 11.4713 3.33623 14.1961 0.6439C14.4808 0.362773 14.8989 0.217405 15.2557 0.00836182C15.4335 0.00836182 15.6101 0.00836182 15.7879 0.00836182H15.7867Z"
              fill="white"
            />
            <path
              d="M3.41249 17.061C2.88387 16.8495 2.3048 16.7174 1.83626 16.4122C0.803057 15.7394 0.378964 14.7038 0.377763 13.4892C0.37536 10.1542 0.374159 6.81908 0.377763 3.48401C0.380166 1.55697 1.84226 0.0540243 3.7669 0.0131768C4.87819 -0.00964967 5.99068 0.00236429 7.10197 0.0107741C7.67504 0.0155796 8.04267 0.372394 8.03546 0.882987C8.02825 1.37556 7.67504 1.70835 7.10558 1.71435C6.04835 1.72517 4.99232 1.71435 3.93509 1.71916C2.77335 1.72517 2.09215 2.40395 2.09095 3.55249C2.08855 6.85993 2.08855 10.1674 2.09095 13.476C2.09095 14.687 2.76013 15.3514 3.97594 15.3514C7.25575 15.3526 10.5368 15.3526 13.8166 15.3514C15.0492 15.3514 15.7256 14.6786 15.7304 13.446C15.7352 12.444 15.7304 11.4421 15.7328 10.4401C15.7352 9.7625 16.0283 9.40088 16.5678 9.39848C17.1 9.39608 17.416 9.77692 17.4172 10.4317C17.4184 11.4889 17.4196 12.5449 17.4172 13.6022C17.4136 15.3154 16.2866 16.6645 14.5927 16.9937C14.5422 17.0033 14.4978 17.0382 14.4497 17.061H3.41249Z"
              fill="white"
            />
          </svg>
        }
        sx={{
          padding: '12px 32px',
          borderRadius: 20,
          color: 'white',
          fontWeight: 'bold',
          boxShadow: 'none',
          '&:hover': {
            backgroundColor: theme.palette.primary.main,
            boxShadow: 'unset',
          },
          '& svg path:hover': {
            fill: theme.palette.grey.main,
          },
          '& a': {
            textDecoration: 'none',
          },
        }}
        variant="contained"
      >
        <Link
          href={{
            pathname: './write-review',
            query: {slug: reviewState.slug},
          }}
          variant={'body4'}
        >
          WRITE A REVIEW
        </Link>
      </Button>

      <Box mt={4}>
        <Typography variant={'body3'}>
          Share your thoughts with other customers
        </Typography>
      </Box>
    </Box>
  )
}

export default WriteReview
