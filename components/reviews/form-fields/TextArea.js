import React from "react";
import { useField } from "formik";

const TextArea = ({ label, helpText, ...props }) => {
  const [field] = useField(props);

  return <textarea {...field} {...props} rows="9" cols="10" />;
};

export default TextArea;
