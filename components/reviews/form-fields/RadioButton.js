import React from "react";
import { useField, Field } from "formik";
import CustomCss from "../Review.module.css";

const RadioButton = ({ label, ...props }) => {
  const [field] = useField(props.name);
  const formValue = label;
  return (
    <>
      <Field
        type="radio"
        value={formValue}
        checked={label === field.value}
        className={CustomCss.radioButton}
        {...props}
      />
      <label>{label}</label>
    </>
  );
};

export default RadioButton;
