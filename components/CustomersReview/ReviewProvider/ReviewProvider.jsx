import * as React from 'react'

const ReviewContext = React.createContext({})

function ReviewProvider(props) {
  const initialState = {
    product: props.product,
    reviewData: props.reviewData,
    slug: props.slug,
  }

  const [reviewState, setReviewState] = React.useState(initialState)
  const value = [reviewState, setReviewState]

  return <ReviewContext.Provider value={value} {...props} />
}

export {ReviewProvider, ReviewContext}
