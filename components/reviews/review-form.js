import React from "react";
import StarRatingComponent from "react-star-rating-component";
import data from "../../data.json";

export default class ReviewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      fields: {
        customer_name: "",
        score: 0,
        customer_email: "",
        location: "",
        // variant: this.props.childProducts[0].product_code,
        recommended: true,
        comment: "",
        skinType: "",
        skinShade: "",
        title: "",
      },
      childProducts: this.props.childProducts,
      submitted: false,
      list_error: [],
      fieldsError: {
        customer_name: "",
        customer_email: "",
        location: "",
        recommended: "",
        comment: "",
        skinType: "",
        skinShade: "",
        title: "",
      },
    };
    this.onStarHover = this.onStarHover.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleBoolean = this.handleBoolean.bind(this);
  }
  handleChange(e) {
    this.setState({
      fields: {
        ...this.state.fields,
        [e.target.name]: e.target.value,
      },
    });
  }
  onStarClick(nextValue, prevValue, name) {
    this.setState({
      fields: {
        ...this.state.fields,
        score: nextValue,
      },
    });
  }
  onStarHover(nextValue, prevValue, name) {
    this.setState({
      fields: {
        ...this.state.fields,
        score: nextValue,
      },
    });
  }
  handleBoolean(e) {
    function str2bool(value) {
      if (value && typeof value === "string") {
        if (value.toLowerCase() === "true") return true;
        if (value.toLowerCase() === "false") return false;
      }
      return value;
    }
    this.setState({
      fields: {
        ...this.state.fields,
        [e.target.name]: str2bool(e.target.value),
      },
    });
  }
  submitReview(fields) {
    const baseUrl = data.apiUrl;
    const productCategorySlug = this.props.productCategorySlug;
    const finalUrl =
      baseUrl + "reviews/product/" + productCategorySlug + "/add/";
    console.log(finalUrl);
    fetch(finalUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fields),
    })
      .then((r) => {
        if (r.status === 201) {
          this.setState({
            submitted: true,
          });
        } else {
          return r.json();
        }
      })
      .then(
        (result) => {
          console.log(result);
        },
        (error) => {
          console.error(error);
          this.setState({
            fieldsError: {
              ...this.state.fields,
              [error.name]: error.value,
            },
          });
        }
      );
  }
  onSubmit(e) {
    e.preventDefault();
    this.submitReview(this.state.fields);
  }
  render() {
    const products = this.props.childProducts.map((e, index) => {
      return (
        <option key={index} value={e.product_code}>
          {e.name}
          {"  -  "}
          {e.size}
        </option>
      );
    });
    const { submitted } = this.state;
    const message = (
      <p className="text-success">
        Your review has been submitted successfully
      </p>
    );
    const form = (
      <form>
        <div className="form-group">
          <label>
            YOUR RATING: <span className="CalypsoOrangeText">*</span>
          </label>
          <div className="scoreRatingHolder">
            <StarRatingComponent
              starColor={"#fc6b21"}
              name={"Score"}
              starCount={5}
              value={this.state.fields.rating}
              editing={true}
              // onStarHover={this.onStarHover}
              onStarClick={this.onStarClick.bind(this)}
            />
          </div>
        </div>
        <div className="form-group">
          <label>
            YOUR NAME: <span className="CalypsoOrangeText">*</span>
          </label>
          <input
            className="form-control"
            name="customer_name"
            placeholder="Full Name"
            value={this.state.fields.customer_name}
            onChange={this.handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>
            Add a headline: <span className="CalypsoOrangeText">*</span>
          </label>
          <input
            className="form-control"
            name="title"
            placeholder="What's most important to you?"
            value={this.state.fields.title}
            onChange={this.handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>
            YOUR EMAIL:
            <span className="CalypsoOrangeText">*</span>
          </label>
          <input
            className="form-control"
            type="email"
            name="customer_email"
            placeholder="Email"
            value={this.state.fields.customer_email}
            onChange={this.handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>
            Your Location: <span className="CalypsoOrangeText">*</span>
          </label>
          <input
            className="form-control"
            name="location"
            placeholder="location"
            value={this.state.fields.location}
            onChange={this.handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Do you recommend this product?</label>
          <div className="radio">
            <label>
              <input
                type="radio"
                name="recommended"
                value="true"
                onChange={this.handleBoolean}
                checked={this.state.fields.recommended === true}
              />
              Yes
            </label>
          </div>
          <div className="radio">
            <label>
              <input
                type="radio"
                name="recommended"
                value="false"
                onChange={this.handleBoolean}
                checked={this.state.fields.recommended === false}
              />
              No
            </label>
          </div>
        </div>

        <div className="form-group">
          <label>Choose a product:</label>
          <select
            className="form-control"
            name="product"
            defaultValue={this.state.fields.product}
            onChange={this.handleChange}
          >
            {products}
          </select>
        </div>
        <div className="form-group">
          <label>
            Comment:
            <span className="CalypsoOrangeText">*</span>
          </label>
          <textarea
            className="form-control"
            name="comment"
            placeholder="Message"
            value={this.state.fields.comment}
            onChange={this.handleChange}
            rows="6"
            required
          />
        </div>
        {/* <ReCAPTCHA
            ref={recaptchaRef}
            sitekey="6LfjPaEUAAAAAPGfkx7Nxp3glAdPGbLZE3lwY5c9"
            onChange={this.recaptchaChange}
          />
          {formSuccessful}
          {formHasError} */}
        <button
          className="btn btn-wide "
          type="submit"
          onClick={(e) => this.onSubmit(e)}
        >
          SUBMIT REVIEW
        </button>
        <div className="top50" />
      </form>
    );
    const formStatus = submitted ? message : form;
    return (
      <div className="writeAReviewForm">
        <p>Your {this.props.productCategoryName} review</p>
        {formStatus}
      </div>
    );
  }
}
