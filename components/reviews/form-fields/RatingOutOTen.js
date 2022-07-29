import React from "react";
import { useField, Field } from "formik";
import CustomCss from "../Review.module.css";

const RatingOutOTen = ({ label, helpText, ...props }) => {
  const [field] = useField(props);

  const formValues = [...Array(11).keys()].slice(1);
  const radioButtons = formValues.map((value, index) => {
    const checked = parseInt(field.value) === parseInt(value);
    return (
      <div key={index} className={CustomCss.radioButtonItem}>
        <Field
          type="radio"
          value={parseInt(value)}
          className={CustomCss.radioButton}
          checked={checked}
          {...props}
        />
        <label>{value}</label>
      </div>
    );
  });
  return (
    <div>
      <label className={CustomCss.Label}>
        {label} <br />
        <span className={CustomCss.helpText}>{helpText}</span>
      </label>

      <div className={CustomCss.radioButtonContainer}>{radioButtons}</div>
    </div>
  );
};

export default RatingOutOTen;
