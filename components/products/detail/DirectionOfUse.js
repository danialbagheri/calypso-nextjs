import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import Styles from "../../../styles/product-page/directionOfUse.module.css";

export default function DirectionOfUse(props) {
  const [dropdown, setDropDown] = useState(false);
  const DirectionOfUseText = {
    display: dropdown ? "block" : "none",
    padding: 0,
  };
  return (
    <>
      <button
        className={Styles.DirectionOfUse}
        onClick={(e) => setDropDown(!dropdown)}
      >
        Directions for Use
        {dropdown ? (
          <FontAwesomeIcon icon={faAngleDown} className={Styles.Arrow} />
        ) : (
          <FontAwesomeIcon icon={faAngleRight} className={Styles.Arrow} />
        )}
      </button>
      <div
        style={DirectionOfUseText}
        dangerouslySetInnerHTML={{
          __html: props.direction,
        }}
      />
      <div className="borderBottom" />
    </>
  );
}
