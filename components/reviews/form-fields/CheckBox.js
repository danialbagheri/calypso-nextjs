import React from "react";
import { useField } from "formik";

const CheckBox = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <input
        type="checkbox"
        label={label}
        {...props}
        error={meta.error && meta.touched}
      />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default CheckBox;
