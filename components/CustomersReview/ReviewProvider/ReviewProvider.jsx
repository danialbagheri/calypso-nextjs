import * as React from 'react'

const ReviewContext = React.createContext({})

function ReviewProvider(props) {
  let starReviewCount = 0

  Object.keys(props.product.score_chart).forEach(key => {
    starReviewCount += +props.product.score_chart[key]
  })

  const initialState = {
    product: props.product,
    starReviewCount,
  }

  const [reviewState, setReviewState] = React.useState(initialState)
  const value = [reviewState, setReviewState]

  return (
    <ReviewContext.Provider value={value}  {...props} />
  )
}

export {ReviewProvider, ReviewContext}