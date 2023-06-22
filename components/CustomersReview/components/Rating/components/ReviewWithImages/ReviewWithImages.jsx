import * as React from 'react'

import styles from './reviewWithImages.module.css'
import {ReviewContext} from 'components/CustomersReview/ReviewProvider'
import Image from 'next/image'
import {Box} from '@mui/material'
import {useTheme} from '@mui/material'
import {ImageReviewModal} from './ImageReviewModal'

function ReviewWithImages() {
  const [reviewState] = React.useContext(ReviewContext)
  const [modalDetail, setModalDetail] = React.useState({open: false, data: {}})
  const theme = useTheme()

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <span>Reviews with images</span>
      </div>
      <Box
        className={styles.imagesContainer}
        sx={{display: 'flex', rowGap: 2, columnGap: 3, flexWrap: 'wrap'}}
      >
        {reviewState.reviewData.results.map(res => {
          if (res.images.length) {
            return res.images.map((image, i) => (
              <Box
                key={i}
                onClick={() => {
                  setModalDetail({
                    open: !modalDetail.open,
                    data: {image, review: res},
                  })
                }}
                sx={{
                  position: 'relative ',
                  paddingBottom: 2,
                  borderBottom: '3px solid transparent',
                  cursor: 'pointer',
                  '&:hover': {
                    borderBottomColor: theme.palette.primary.main,
                  },
                  '& > div': {
                    position: 'relative !important',
                    width: '85px',
                    height: '100px',
                    borderRadius: 1,
                    border: '1px solid #E2E2E2',
                  },
                }}
              >
                <Image
                  fill
                  sizes="100vw"
                  src={image.image}
                  styles={{objectFit: 'cover'}}
                />
              </Box>
            ))
          }
        })}
      </Box>
      {modalDetail.open ? (
        <ImageReviewModal
          data={modalDetail.data}
          open={modalDetail.open}
          setOpen={state => setModalDetail({open: state, data: null})}
        />
      ) : null}
    </div>
  )
}

export default ReviewWithImages
