import React from "react";

// import RadioButton from "./RadioButton";

import { useField, Field } from "formik";
import CustomCss from "../Review.module.css";

const BooleanRadioBotton = ({ label, ...props }) => {
  const [field, helpers] = useField(props.name);
  const checked = field.value.toString() === label.toString();
  return (
    <div className={CustomCss.multuiChoiceRadioButtonItem}>
      <Field
        type="radio"
        value={label}
        checked={checked}
        className={CustomCss.radioButton}
        {...props}
      />
      <label>{label}</label>
    </div>
  );
};

export default function MultiChoice(props) {
  const { choices } = props;
  const multiChoice = choices.map((choice, index) => {
    return (
      <BooleanRadioBotton
        key={index}
        label={choice}
        id={props.id}
        name={props.name}
        onBlur={props.handleBlur}
      />
    );
  });

  return <div className={CustomCss.MultiChoiceContainer}>{multiChoice}</div>;
}
