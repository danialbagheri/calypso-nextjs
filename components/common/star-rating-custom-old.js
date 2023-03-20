import StarRatingComponent from 'react-star-rating-component'

export default function StarRatingCustom(props) {
  return (
    <StarRatingComponent
      name={props.name}
      starColor={'#fc6b21'}
      editing={false}
      starCount={5}
      emptyStarColor={'#d2d2d2'}
      className={props.className || ''}
      value={parseFloat(props.value)}
      renderStarIconHalf={() => (
        <div className={props.className || ''}>
          <i
            className="material-icons half-star"
            style={{fontSize: props.halfStarSize || '22px'}}
          >
            star_half
          </i>
        </div>
      )}
    />
  )
}
