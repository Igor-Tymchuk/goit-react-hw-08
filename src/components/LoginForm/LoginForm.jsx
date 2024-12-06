import {
  Button,
  FilledInput,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import s from "./LoginForm.module.css";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/auth/operations";
import { toggleShowPwd } from "../../redux/auth/slice";
import { selectShowPwd } from "../../redux/auth/selectors";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import * as Yup from "yup";
/* eslint-disable no-useless-escape */
const re =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
/* eslint-enable no-useless-escape */
const FeedbackSchema = Yup.object().shape({
  email: Yup.string().matches(re, "Invalid email format!").required("Required"),
  password: Yup.string()
    .min(7, "Too Short!")
    .max(20, "Too Long")
    .required("Required"),
});

const LoginForm = () => {
  const dispatch = useDispatch();
  const showPassword = useSelector(selectShowPwd);

  const handleSubmit = (values, action) => {
    toast.promise(dispatch(login(values)).unwrap(), {
      loading: "Login...",
      success: <b>User is logged in!</b>,
      error: <b>Login error!</b>,
    });
    action.resetForm();
  };

  const handleShowPassword = () => dispatch(toggleShowPwd(!showPassword));

  return (
    <div className={s.box}>
      <h2 className={s.title}>Login to PhoneBook</h2>
      <Formik
        onSubmit={handleSubmit}
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={FeedbackSchema}
      >
        {({ errors, touched }) => (
          <Form className={s.form}>
            <Field name="email">
              {({ field }) => (
                <TextField
                  sx={{ width: "100%" }}
                  {...field}
                  label="Email"
                  type="email"
                  variant="filled"
                  error={Boolean(touched.email && errors.email)}
                  helperText={
                    touched.email && errors.email ? errors.email : " "
                  }
                />
              )}
            </Field>
            <Field name="password">
              {({ field }) => (
                <FormControl
                  variant="filled"
                  sx={{ width: "100%" }}
                  error={Boolean(touched.password && errors.password)}
                >
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <FilledInput
                    {...field}
                    id="password"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={
                            showPassword
                              ? "hide the password"
                              : "display the password"
                          }
                          onClick={handleShowPassword}
                          edge="end"
                        >
                          {showPassword ? (
                            <MdVisibilityOff />
                          ) : (
                            <MdVisibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />{" "}
                  <FormHelperText>
                    {touched.password && errors.password
                      ? errors.password
                      : " "}
                  </FormHelperText>
                </FormControl>
              )}
            </Field>
            <Button
              type="submit"
              variant="contained"
              sx={{ width: "100%", height: "50px", marginTop: "15px" }}
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
      <span className={s.span}>You don&apos;t have an account?</span>
      <Link to="/register">
        <Button variant="contained">Register</Button>
      </Link>
    </div>
  );
};
export default LoginForm;
