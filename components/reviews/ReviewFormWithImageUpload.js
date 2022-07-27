import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { reviewValidation, reviewInitialValues } from "./reviewValidation";
import * as Yup from "yup";
import ReviewClass from "./Review.module.css";

export default function ReviewForm(props) {
  const variants = props.variants;

  const reviewValidation = Yup.object({
    customer_name: Yup.string()
      .max(35, "Must be 35 characters or less")
      .required("Required"),
    customer_email: Yup.string()
      .email("Invalid email address")
      .required("Required"),
    location: Yup.string()
      .max(35, "Must be 35 characters or less")
      .required("Required"),
    title: Yup.string().required("Required"),
    score: Yup.number().min(1).max(5).required("Required"),
    comment: Yup.string()
      .min(5, "Must be 5 characters or More")
      .required("Required"),
    recommended: Yup.boolean().default(true),
    image_ids: Yup.array().of(Yup.number()),
    variant: Yup.string().required("Please select a product").oneOf(variants),
  });

  const reviewInitialValues = {
    customer_name: "",
    customer_email: "",
    reason: "",
    title: "",
    score: "",
    comment: "",
    recommended: true,
    image_ids: [],
    variant: "",
  };

  const variantOptions = variants.map((variant, index) => {
    return (
      <div className={ReviewClass.VariantSelectContainer} key={index}>
        <img
          src={variant.image_list[0] && variant.image_list[0].resized}
          alt={variant.name}
          height="140"
        />
        {variant.name}
      </div>
    );
  });
  const VariantSelect = () => (
    <div className={ReviewClass.VariantContainer}>{variantOptions}</div>
  );
  const renderError = (message) => <p className="help is-danger">{message}</p>;
  const handleSubmit = (values, { setSubmitting }) => {};
  return (
    <Formik
      initialValues={reviewInitialValues}
      validationSchema={reviewValidation}
      onSubmit={(values, actions) => {
        handleRegister(values, actions);
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
              <Form
                className={ReviewClass.ReviewForm}
                aria-label="Write A Review Form"
              >
                <div className={ReviewClass.ReviewFormField}>
                  <label className={ReviewClass.ReviewFormLabel} htmlFor="name">
                    Full name
                  </label>
                  <div className={ReviewClass.ReviewFormControl}>
                    <Field
                      name="customer_name"
                      type="text"
                      className="input"
                      placeholder="Full name"
                    />
                    <ErrorMessage name="customer_name" render={renderError} />
                  </div>
                </div>
                <div className={ReviewClass.ReviewFormField}>
                  <label
                    className={ReviewClass.ReviewFormLabel}
                    htmlFor="email"
                  >
                    Email address
                  </label>
                  <div className={ReviewClass.ReviewFormControl}>
                    <Field
                      name="customer_email"
                      type="text"
                      className="input"
                      placeholder="Email address"
                    />
                    <ErrorMessage name="customer_email" render={renderError} />
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
                    <ErrorMessage name="product" render={renderError} />
                  </div>
                </div>
                <div className={ReviewClass.ReviewFormField}>
                  <label
                    className={ReviewClass.ReviewFormLabel}
                    htmlFor="title"
                  >
                    Title
                  </label>
                  <div className={ReviewClass.ReviewFormControl}>
                    <Field
                      name="title"
                      type="text"
                      className="input"
                      placeholder="Title"
                    />
                    <ErrorMessage name="title" render={renderError} />
                  </div>
                </div>
                <div className={ReviewClass.ReviewFormField}>
                  <label
                    className={ReviewClass.ReviewFormLabel}
                    htmlFor="review"
                  >
                    Review
                  </label>
                  <div className={ReviewClass.ReviewFormControl}>
                    <Field
                      name="review"
                      as="textarea"
                      className="textarea"
                      placeholder="Review"
                    />
                    <ErrorMessage name="review" render={renderError} />
                  </div>
                </div>
                <div className={ReviewClass.ReviewFormField}>
                  <label
                    className={ReviewClass.ReviewFormLabel}
                    htmlFor="rating"
                  >
                    Rating
                  </label>
                  <div className={ReviewClass.ReviewFormControl}>
                    <Field
                      name="rating"
                      type="number"
                      className="input"
                      placeholder="Rating"
                    />
                    <ErrorMessage name="rating" render={renderError} />
                  </div>
                </div>
                <div className={ReviewClass.ReviewFormField}>
                  <div className={ReviewClass.ReviewFormControl}>
                    <label className="checkbox label" htmlFor="wouldRecommend">
                      <Field
                        name="wouldRecommend"
                        type="checkbox"
                        className="checkbox"
                      />
                      Would recommend
                    </label>
                  </div>
                </div>
                <button type="submit" className="button is-primary">
                  Submit
                </button>
              </Form>
            </div>
          </div>
        );
      }}
    </Formik>
  );
}
