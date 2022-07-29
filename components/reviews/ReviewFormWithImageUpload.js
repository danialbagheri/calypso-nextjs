import { useState, useEffect } from "react";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import ReviewClass from "./Review.module.css";
import StarRatingInput from "./form-fields/StarRatingInput";
import TextArea from "./form-fields/TextArea";
import YesAndNoChoice from "./form-fields/YesAndNoChoice";
import ImageUpload from "./form-fields/ImageUpload";
import data from "../../data.json";
import axios from "axios";
import SuccessReview from "./form-fields/SuccessReview";

export default function ReviewForm(props) {
  const [selectedVariant, setSelectedVariant] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageIds, setImageIds] = useState([]);
  const [progress, setProgress] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const { product, variants } = props;
  // if length of variants is 1, then set selectedVariant to the first variant

  const reviewValidation = Yup.object({
    customer_name: Yup.string()
      .max(35, "Must be 35 characters or less")
      .required("Required"),
    customer_email: Yup.string()
      .email("Invalid email address")
      .required("Required"),
    location: Yup.string().max(35, "Must be 35 characters or less"),
    title: Yup.string().required("Required"),
    score: Yup.number().min(1).max(5).required("Required"),
    comment: Yup.string()
      .min(5, "Must be 5 characters or More")
      .required("Required"),
    recommended: Yup.boolean().default(true),
    image_ids: Yup.array().of(Yup.number()),
    variant: Yup.number(),
  });

  const reviewInitialValues = {
    customer_name: "",
    customer_email: "",
    location: "",
    title: "",
    score: 0,
    comment: "",
    recommended: true,
    image_ids: [],
    variant: selectedVariant,
  };

  // make a progress bar for uploading images
  const ProgressBar = () => {
    // simulate a progress percentage

    return (
      <div className={ReviewClass.ReviewFormField}>
        <progress id="file" value={progress} max="100"></progress>
      </div>
    );
  };

  useEffect(() => {
    let p = 0;
    setTimeout(() => {
      p += 10;
      if (p < 100) {
        p = 0;
      }
      setProgress(p);
    }, 900);
  }, [uploadingImage]);

  const handleVarinatSelect = (varinatId) => {
    setSelectedVariant(varinatId);
  };
  const variantOptions = variants.map((variant, index) => {
    return (
      <div
        className={
          variant.id === selectedVariant
            ? ReviewClass.VariantSelectContainerSelected
            : ReviewClass.VariantSelectContainer
        }
        key={index}
        onClick={() => handleVarinatSelect(variant.id)}
      >
        <img
          src={variant.image_list[0] && variant.image_list[0].resized}
          alt={variant.name}
          height="140"
        />
        {variant.name}
      </div>
    );
  });
  const VariantSelect = () => {
    if (variants.length === 1) {
      setSelectedVariant(variants[0].id);
      return <div>{variants[0].name}</div>;
    } else {
      return (
        <div className={ReviewClass.VariantContainer}>{variantOptions}</div>
      );
    }
  };

  const FormErrors = (props) => {
    if (Object.keys(props.formErrors).length > 0) {
      const listOfErrors = [];
      for (const [key, value] of Object.entries(props.formErrors)) {
        listOfErrors.push(<li key={key}>{`${key}: ${value}`}</li>);
      }
      return <ul className={ReviewClass.ListOfErrors}>{listOfErrors}</ul>;
    } else {
      return null;
    }
  };

  return (
    <Formik
      initialValues={reviewInitialValues}
      validationSchema={reviewValidation}
      onSubmit={(values, actions) => {
        actions.setSubmitting(true);
        const baseUrl = data.apiUrl;
        const url = `${baseUrl}reviews/product/${product.slug}/add/`;
        axios
          .post(url, values)
          .then((response) => {
            actions.setSubmitting(false);
            setSubmitted(true);
          })
          .catch((error) => {
            console.log(error);
            actions.setSubmitting(false);
          });
      }}
    >
      {(props) => {
        const {
          values,
          errors,
          touched,
          handleChange,
          setFieldValue,
          isSubmitting,
          handleSubmit,
        } = props;

        return (
          <div>
            <div className={ReviewClass.ReviewFormContainer}>
              {!submitted ? (
                <form
                  className={ReviewClass.ReviewForm}
                  aria-label="Write A Review Form"
                  onSubmit={handleSubmit}
                >
                  <div className={ReviewClass.ReviewFormField}>
                    <label
                      className={ReviewClass.ReviewFormLabel}
                      htmlFor="name"
                    >
                      Score
                      {touched.score && errors.score ? (
                        <div className={ReviewClass.FormError}>
                          {errors.score}
                        </div>
                      ) : null}
                    </label>
                    <div className={ReviewClass.ReviewFormControl}>
                      <StarRatingInput
                        name="score"
                        id="score"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className={ReviewClass.ReviewFormField}>
                    <label
                      className={ReviewClass.ReviewFormLabel}
                      htmlFor="name"
                    >
                      Full name
                      {touched.customer_name && errors.customer_name ? (
                        <div className={ReviewClass.FormError}>
                          {errors.customer_name}
                        </div>
                      ) : null}
                    </label>
                    <div className={ReviewClass.ReviewFormControl}>
                      <Field
                        name="customer_name"
                        type="text"
                        className="input"
                        placeholder="Full name"
                      />
                    </div>
                  </div>
                  <div className={ReviewClass.ReviewFormField}>
                    <label
                      className={ReviewClass.ReviewFormLabel}
                      htmlFor="email"
                    >
                      Email address
                      {touched.customer_email && errors.customer_email ? (
                        <div className={ReviewClass.FormError}>
                          {errors.customer_email}
                        </div>
                      ) : null}
                    </label>
                    <div className={ReviewClass.ReviewFormControl}>
                      <Field
                        name="customer_email"
                        type="text"
                        className="input"
                        placeholder="Email address"
                      />
                    </div>
                  </div>
                  <div className={ReviewClass.ReviewFormField}>
                    <label
                      className={ReviewClass.ReviewFormLabel}
                      htmlFor="email"
                    >
                      Location
                      {touched.location && errors.location ? (
                        <div className={ReviewClass.FormError}>
                          {errors.location}
                        </div>
                      ) : null}
                    </label>
                    <div className={ReviewClass.ReviewFormControl}>
                      <Field
                        name="location"
                        type="text"
                        className="input"
                        placeholder="City or country"
                      />
                    </div>
                  </div>
                  <div className={ReviewClass.ReviewFormField}>
                    <label
                      className={ReviewClass.ReviewFormLabel}
                      htmlFor="product"
                    >
                      Product
                    </label>
                    <div className={ReviewClass.ReviewFormControl}>
                      <VariantSelect onSelect={setFieldValue} />
                    </div>
                  </div>
                  <div className={ReviewClass.ReviewFormField}>
                    <label
                      className={ReviewClass.ReviewFormLabel}
                      htmlFor="title"
                    >
                      Title
                      {touched.title && errors.title ? (
                        <div className={ReviewClass.FormError}>
                          {errors.title}
                        </div>
                      ) : null}
                    </label>
                    <div className={ReviewClass.ReviewFormControl}>
                      <Field
                        name="title"
                        type="text"
                        className="input"
                        placeholder="Title"
                      />
                    </div>
                  </div>
                  <div className={ReviewClass.ReviewFormField}>
                    <label
                      className={ReviewClass.ReviewFormLabel}
                      htmlFor="review"
                    >
                      Review
                      {touched.comment && errors.comment ? (
                        <div className={ReviewClass.FormError}>
                          {errors.comment}
                        </div>
                      ) : null}
                    </label>
                    <div className={ReviewClass.ReviewFormControl}>
                      <TextArea
                        name="comment"
                        id="comment"
                        placeholder="Review"
                      />
                    </div>
                  </div>
                  <div className={ReviewClass.ReviewFormField}>
                    <label
                      className={ReviewClass.ReviewFormLabel}
                      htmlFor="recommended"
                    >
                      Would you recommend this product?
                    </label>
                    <YesAndNoChoice name="recommended" />
                  </div>
                  <ImageUpload
                    setUploadingImage={setUploadingImage}
                    imageIds={imageIds}
                    setImageIds={setImageIds}
                  />

                  {uploadingImage && <ProgressBar />}
                  <FormErrors formErrors={errors} />
                  <button
                    type="submit"
                    onClick={() => {
                      setFieldValue("variant", selectedVariant);
                      setFieldValue("image_ids", imageIds);
                    }}
                    className={ReviewClass.submitButton}
                    disabled={isSubmitting}
                  >
                    Submit
                  </button>
                </form>
              ) : (
                <SuccessReview />
              )}
            </div>
          </div>
        );
      }}
    </Formik>
  );
}
