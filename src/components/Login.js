import React, { Fragment, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Flower from "../assets/img/logoFlower.png";
import { KeyIcon, PersonIcon } from "@primer/octicons-react";

export default function Login({ setAuth }) {
  const handleFormSubmit = (values) => {
    let formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);
    setErrorState(true);
    setIsFetching(true);
    axios
      .post("http://dev.rapptrlabs.com/Tests/scripts/user-login.php", formData)
      .then((res) => {
        console.log(res.data);
        setAuth(res.data);
      })
      .catch((err) => {
        setErrorState(err.response.data.message);
        // console.log(err.response.data);
      })
      .finally(() => setIsFetching(false));
  };
  const formik = useFormik({
    initialValues: {
      password: "",
      email: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required("Required")
        .min(4, "Must be at least 4 characters")
        .max(16, "Too Long!"),

      email: Yup.string()
        .email("Invalid email address")
        .required("Required")
        .max(50, "Too Long!"),
    }),
    onSubmit: (values) => {
      handleFormSubmit(values);
    },
  });
  const [isFetching, setIsFetching] = useState(false);
  const [errorState, setErrorState] = useState(false);
  const errsEmail =
    formik.touched.email && formik.errors.email ? "error--input" : "";
  const errsPassword =
    formik.touched.password && formik.errors.password ? "error--input" : "";
  return (
    <Fragment>
      <div className="heading-primary">
        <span className="heading-primary--title">Rapptr Labs</span>
      </div>
      <img src={Flower} alt="logl" className="logo__flower" />
      <form onSubmit={formik.handleSubmit} className="login__form">
        <div className="form-group">
          <label htmlFor="email">Email Address</label>{" "}
          <PersonIcon className="form-group--logo" />
          <input
            className={errsEmail}
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <span>{formik.errors.email}</span>
          ) : null}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <KeyIcon className="form-group--logo" />
          <input
            className={errsPassword}
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <span>{formik.errors.password}</span>
          ) : null}
        </div>
        {isFetching ? (
          <LoginButton disabled={true}>Fetchin</LoginButton>
        ) : (formik.touched.password && formik.errors.password) ||
          (formik.touched.email && formik.errors.email) ? (
          <LoginButton disabled={true}>Input Error</LoginButton>
        ) : (
          <LoginButton disabled={false}>Submit</LoginButton>
        )}
        {errorState && <span className="error">{errorState}</span>}
      </form>
    </Fragment>
  );
}

const LoginButton = ({ disabled, children }) => (
  <button disabled={disabled} className="todo--button" type="submit">
    {children}
  </button>
);
