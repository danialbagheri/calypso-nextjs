import StarRatingComponent from "react-star-rating-component";

export default function StarRatingCustom(props) {
  return (
    <StarRatingComponent
      name={props.name}
      starColor={"#fc6b21"}
      editing={false}
      starCount={5}
      emptyStarColor={"#d2d2d2"}
      className={props.className || ""}
      value={parseFloat(props.value)}
      renderStarIconHalf={() => (
        <div className="half-star-holder">
          <img
            src="/icons/half-star.svg"
            alt="half star"
            width="55"
            height="55"
          />
        </div>
      )}
    />
  );
}
