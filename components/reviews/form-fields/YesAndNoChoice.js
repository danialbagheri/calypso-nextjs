import React from "react";

// import RadioButton from "./RadioButton";

import { useField, Field } from "formik";
import CustomCss from "../Review.module.css";

const BooleanRadioBotton = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;
  const formValue = label === "Yes" ? true : false;

  return (
    <div className={CustomCss.radioButtonItem}>
      <input
        type="radio"
        value={formValue}
        error={meta.error && meta.touched}
        checked={formValue === field.value}
        className={CustomCss.radioButton}
        onChange={() => setValue(formValue)}
        {...props}
      />
      <label>{label}</label>
    </div>
  );
};

export default function YesAndNoChoice(props) {
  return (
    <div className={CustomCss.radioButtonContainer}>
      <BooleanRadioBotton
        label="Yes"
        id={props.id}
        name={props.name}
        onBlur={props.handleBlur}
      />
      <BooleanRadioBotton
        label="No"
        id={props.id}
        name={props.name}
        onBlur={props.handleBlur}
      />
    </div>
  );
}
