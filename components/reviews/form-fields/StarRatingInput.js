import React from "react";
import StarRatingComponent from "react-star-rating-component";
import { useField } from "formik";

export default function StarRatingInput({ label, ...props }) {
  const [field] = useField(props);
  const [starValue, setStarValue] = React.useState(field.value);
  function onStarClick(nextValue) {
    const event = {
      target: {
        name: props.name,
        value: nextValue,
      },
    };
    field.onChange(event);
  }

  const onStarHover = (nextValue, prevValue) => {
    setStarValue(nextValue);
  };

  const onStarHoverOut = (nextValue, prevValue) => {
    setStarValue(field.value);
  };
  return (
    <div className="scoreRatingHolder">
      <StarRatingComponent
        starColor={"#fc6b21"}
        emptyStarColor={"white"}
        starCount={5}
        value={starValue}
        editing={true}
        onStarHover={onStarHover}
        onStarHoverOut={onStarHoverOut}
        onStarClick={(e) => onStarClick(e)}
        name="score"
      />
    </div>
  );
}
