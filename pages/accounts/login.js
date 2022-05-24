import React from "react";
import { signIn, signOut } from "next-auth/react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";

const LoginPage = (props) => {
  const loginPageStyle = {
    margin: "32px auto 37px",
    maxWidth: "530px",
    background: "#FFC340",
    padding: "30px",
    // color: "#fff",
    borderRadius: "10px",
    // border: "1px solid #FF5E2B",
    // boxShadow: "0px 0px 10px 10px rgba(0,0,0,0.15)",
  };
  const { touched, errors } = props;
  return (
    <React.Fragment>
      <div className="container">
        <div className="login-wrapper" style={loginPageStyle}>
          <h2>Login</h2>
          <Form className="form-container">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field
                type="text"
                name="email"
                className={"form-control"}
                placeholder="Email"
              />
              {touched.email && errors.email && (
                <span className="help-block text-danger">{errors.email}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field
                type="password"
                name="password"
                className={"form-control"}
                placeholder="Password"
                autoComplete="current-password"
              />
              {touched.password && errors.password && (
                <span className="help-block text-danger">
                  {errors.password}
                </span>
              )}
            </div>
            <button type="submit" className="btn">
              Login
            </button>
          </Form>
        </div>
      </div>
    </React.Fragment>
  );
};

const LoginFormik = withFormik({
  mapPropsToValues: (props) => {
    return {
      email: props.email || "",
      password: props.password || "",
    };
  },
  validationSchema: Yup.object().shape({
    email: Yup.string().email("Email not valid").required("Email is required"),
    password: Yup.string().required("Password is required"),
  }),
  handleSubmit: (values) => signIn("credentials", values),
  // const REST_API_URL = "https://service.calypsosun.com/api/users/token/";
  // var myHeaders = new Headers();
  // myHeaders.append("Content-Type", "application/json");
  // fetch(REST_API_URL, {
  //   method: "POST",
  //   headers: myHeaders,
  //   body: JSON.stringify(values),
  // })
  //   .then((response) => {
  //     if (response.ok) {
  //       return response.json();
  //     } else {
  //       // HANDLE ERROR
  //       console.log(response);
  //     }
  //   })
  //   .then((data) => {
  //     // HANDLE RESPONSE DATA
  //     console.log(data);
  //   })
  //   .catch((error) => {
  //     // HANDLE ERROR
  //     console.log(error);
  //   });
})(LoginPage);

export default LoginFormik;
