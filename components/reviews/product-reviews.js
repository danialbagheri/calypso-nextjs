import { useState, useEffect } from "react";
import data from "../../data.json";
import Modal from "react-modal";
import ReviewForm from "./review-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import StarRatingCustom from "../common/star-rating-custom";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    overflow: "scroll",
    height: "70%",
  },
};

export default function ProductReviews(props) {
  const [allReviews, setReviews] = useState(props.productReviews);
  // const totalScore = reviewAverageScore / totalReviewCount;
  const [reviewScores, setReviewScores] = useState(props.reviewAverageScore);
  const [count, setCount] = useState(props.totalReviewCount);
  const [modalIsOpen, setModal] = useState(false);
  function openModal() {
    setModal(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    //this.subtitle.style.color = "#f00";
  }

  function closeModal() {
    setModal(false);
  }

  function RateReview(reviewId, reteType) {
    const baseUrl = data.apiUrl;
    const endpoint = baseUrl + `reviews/rate/${reviewId}/`;

    let formdata = new FormData();
    formdata.append("rate_type", reteType);

    let requestOptions = {
      method: "PATCH",
      body: formdata,
    };

    fetch(endpoint, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }

  function toggleButton(el, reviewId, liked) {
    el.classList = "like-and-dislike-feedback";
    el.innerHTML = "Thank you for your feedback";
    if (liked) {
      const dislikeButton = document.getElementById(`dislike${reviewId}`);
      dislikeButton.style.display = "none";
    } else {
      const likeButton = document.getElementById(`like${reviewId}`);
      likeButton.style.display = "none";
    }
  }

  function likeReview(e, reviewId) {
    const el = e.target;
    toggleButton(el, reviewId, true);
    RateReview(reviewId, "like");
  }
  function dislikeReview(e, reviewId) {
    const el = e.target;
    toggleButton(el, reviewId, false);
    RateReview(reviewId, "dislike");
  }

  const reviews = allReviews.map((review, index) => {
    return (
      <li key={index} className="review-item">
        <div>
          <span>{review.name}</span>, {review.location}
          <br />
          <span className="dateAdded">{review.date_created}</span>
        </div>
        <div className="customerRaview flex-left">
          <span className="hide">{review.score}</span>
        </div>

        <p>
          <div className="mb-1">
            <StarRatingCustom
              name={review.title}
              value={review.score}
              className="float-left mr-1"
            />
            <span className="review-title">{review.title}</span>
          </div>
          <div>{review.comment}</div>
          <strong className="text-sm">
            {review.recommended
              ? "Yes - I would recommend this to a friend"
              : "No - I don't recommend this product."}
          </strong>
        </p>
        <p className="text-sm">
          Was this review helpful to you?
          <button
            className="pl-1 btn-clear review-like-button like-and-dislike-buttons"
            onClick={(e) => likeReview(e, review.id)}
            id={`like${review.id}`}
          >
            <FontAwesomeIcon
              icon={faThumbsUp}
              className="calypso-orange-text"
            />
            {review.like}
          </button>
          <button
            className="pl-1 btn-clear review-like-button like-and-dislike-buttons"
            onClick={(e) => dislikeReview(e, review.id)}
            id={`dislike${review.id}`}
          >
            <FontAwesomeIcon
              icon={faThumbsDown}
              className="calypso-orange-text"
            />
            {review.dislike}
          </button>
        </p>
        <hr />
      </li>
    );
  });
  const reviewModal = (
    <Modal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <button className="closeButton" onClick={closeModal}>
        &times;
      </button>
      <h2 ref={(subtitle) => (subtitle = subtitle)}>WRITE A REVIEW</h2>
      <ReviewForm
        productCategorySlug={props.productSlug}
        productCategoryName={props.productName}
        childProducts={props.childProducts}
      />
    </Modal>
  );
  const topReviewBanner = (
    <div className="topReviewBanner">
      <div className="star-review-strap">
        <div className="star-review-holder">
          <div className="reviewTotalScore">{reviewScores}</div>
          <div className="starRating">
            <StarRatingCustom
              value={parseFloat(reviewScores)}
              name={"total reviews"}
              editing={false}
              halfStarSize={32}
              className="star-rating-product-page"
            />
            {/* <StarRatingCustom name={"total reviews"} value={reviewScores} /> */}
            <p className="reviewCount">({count} Reviews)</p>
          </div>
        </div>
        <div>
          <button onClick={() => openModal()} className="writeareview">
            WRITE A REVIEW
          </button>
        </div>
      </div>
      {reviewModal}
      <hr />
    </div>
  );
  return (
    <section className="container">
      <h1 className="textCenter">Reviews</h1>
      {count === 0 ? (
        <div className="textCenter">
          <p>There are no reviews yet.</p>
          <p>Be the first to review this product</p>
          <button onClick={() => openModal()} className="writeTheFirstReview">
            WRITE A REVIEW
          </button>
          {reviewModal}
        </div>
      ) : (
        <div>
          {topReviewBanner}
          <ul className="reviews">{reviews}</ul>
        </div>
      )}
    </section>
  );
}
