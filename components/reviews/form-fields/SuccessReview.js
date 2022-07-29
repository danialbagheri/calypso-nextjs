import React from "react";
import Lottie from "lottie-react";

import reviewStyle from "../Review.module.css";
import successAnimation from "../../.././public/assets/animations/success.json";

export default function SuccessReview() {
  return (
    <div className="main">
      <div className={reviewStyle.pageContainer}>
        <div className={reviewStyle.successContainer}>
          <Lottie
            animationData={successAnimation}
            style={{ margin: "0 auto", width: 200 }}
          />
          <h2>Thank you. You have successfully submitted your review.</h2>
        </div>
      </div>
    </div>
  );
}
