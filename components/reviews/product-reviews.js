import React, { useState, useEffect } from "react";
import data from "../../data.json";
import StarRatingComponent from "react-star-rating-component";
import Modal from "react-modal";
import ReviewForm from "./review-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
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

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
//Modal.setAppElement("#root");

export default function ProductReviews({
  productReviews,
  totalReviewCount,
  reviewAverageScore,
  productSlug,
  productName,
  childProducts,
}) {
  const [allReviews, setReviews] = useState(productReviews);
  const totalScore = reviewAverageScore / totalReviewCount;
  const [reviewScores, setReviewScores] = useState(reviewAverageScore);
  const [count, setCount] = useState(totalReviewCount);
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

  function likeReview(reviewId, e) {
    const el = e.target;
    let likedReviews = [];
    dislikeButton = document.getElementById(`dislike${reviewId}`);
    likedReviews.push({ reviewId });
    let likedReviewsInLocalStorage =
      JSON.parse(window.localStorage.getItem("likeReviews")) || [];
    for (var i = 0; i < likedReviewsInLocalStorage.length; i++) {
      console.log(likedReviewsInLocalStorage[i]["reviewId"]);
      if (likedReviewsInLocalStorage[i]["reviewId"] === reviewId) {
        console.log(likedReviewsInLocalStorage[i]["reviewId"]);
        el.classList = "like-and-dislike-danger";
        el.innerHTML = "You have already rated this review.";
        dislikeButton.style.display = "none";
      } else {
        window.localStorage.setItem(
          "likeReviews",
          JSON.stringify(likedReviews)
        );
        el.classList = "like-and-dislike-feedback";
        el.innerHTML = "Thank you for your feedback";
        dislikeButton.style.display = "none";
      }
    }
  }
  function dislikeReview(e, reviewId) {
    const el = e.target;
    let likedReviews = [];
    dislikeButton = document.getElementById(`dislike${reviewId}`);
    likedReviews.push({ reviewId });
    let likedReviewsInLocalStorage =
      JSON.parse(window.localStorage.getItem("likeReviews")) || [];
    for (var i = 0; i < likedReviewsInLocalStorage.length; i++) {
      console.log(likedReviewsInLocalStorage[i]["reviewId"]);
      if (likedReviewsInLocalStorage[i]["reviewId"] === reviewId) {
        console.log(likedReviewsInLocalStorage[i]["reviewId"]);
        el.classList = "like-and-dislike-danger";
        el.innerHTML = "You have already rated this review.";
        dislikeButton.style.display = "none";
      } else {
        window.localStorage.setItem(
          "likeReviews",
          JSON.stringify(likedReviews)
        );
        el.classList = "like-and-dislike-feedback";
        el.innerHTML = "Thank you for your feedback";
        dislikeButton.style.display = "none";
      }
    }
  }
  function dislikeReviewOnServer() {
    const el = e.target;
    const baseUrl = data.apiUrl;
    const endpoint = baseUrl + `reviews/rate/${reviewId}/`;
    fetch(endpoint, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        like: 0,
        dislike: 1,
      }),
    }).catch((e) => console.log(e));
  }

  function fetchReviews() {
    const baseUrl = data.apiUrl;
    const finalUrl = baseUrl + `reviews/product/?product_slug=${productSlug}`;
    fetch(finalUrl)
      .then(function (response) {
        return response.json();
      })
      .then(
        (result) => {
          // calculate the total score of the reviews
          let scores = [];
          result.results.map((each) => scores.push(each.score));
          let averageScore = 0;
          scores.forEach((each) => {
            averageScore += each;
          });
          // calculation ends here
          this.setState({
            isLoaded: true,
            count: result.count,
            allReviews: result.results,
            review_scores: scores,
            totalScore: averageScore / result.count,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  const reviews = allReviews.map((review, index) => {
    return (
      <li key={index} className="review-item">
        <p>
          <span itemProp="author">{review.name}</span>, {review.location}
          <br />
          <span className="dateAdded">{review.date_created}</span>
        </p>
        <meta itemProp="datePublished" content={review.published_date} />
        <div
          itemProp="reviewRating"
          itemScope
          itemType="http://schema.org/Rating"
          className="customerRaview flex-left"
        >
          <StarRatingComponent
            starColor={"#fc6b21"}
            editing={false}
            name={review.title}
            starCount={5}
            value={review.score}
          />
          <span itemProp="ratingValue" className="hide">
            {review.score}
          </span>
          <meta itemProp="worstRating" content="1" />
          <meta itemProp="bestRating" content="5" />
        </div>
        <br />
        <strong>{review.title}</strong>
        <p itemProp="description">{review.comment}</p>
        <p className="text-sm">
          {review.recommended
            ? "Yes - I would recommend this to a friend"
            : "No - I don't recommend this product."}
        </p>
        <p className="text-sm">
          Was this review helpful to you?
          <button
            className="pl-1 btn-clear review-like-button like-and-dislike-buttons"
            onClick={(e) => likeReview(review.id, e)}
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
        productCategorySlug={productSlug}
        productCategoryName={productName}
        childProducts={childProducts}
      />
    </Modal>
  );
  const topReviewBanner = (
    <div
      className="topReviewBanner"
      itemProp="aggregateRating"
      itemScope
      itemType="http://schema.org/AggregateRating"
    >
      <div className="star-review-strap">
        <div className="star-review-holder">
          <h1 className="reviewTotalScore" itemProp="ratingValue">
            {totalScore}
          </h1>
          <div className="starRating">
            <StarRatingComponent
              starColor={"#fc6b21"}
              editing={false}
              name={"total reviews"}
              starCount={5}
              value={totalScore}
            />
            <p className="reviewCount">
              <span itemProp="reviewCount">({count}</span> Reviews)
            </p>
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
          <ul
            itemProp="review"
            itemScope
            itemType="http://schema.org/Review"
            className="reviews"
          >
            {reviews}
          </ul>
        </div>
      )}
    </section>
  );
}
