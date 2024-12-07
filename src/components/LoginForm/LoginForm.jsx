import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import s from "./LoginForm.module.css";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useDispatch } from "react-redux";
import { login } from "../../redux/auth/operations";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useState } from "react";
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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxSizing: "border-box",
  maxWidth: "450px",
  minWidth: "275px",
  width: "100%",
  bgcolor: "background.paper",
  borderRadius: "5px",
  boxShadow: 24,
  p: 2,
};

const LoginForm = () => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState(false);

  const handleSubmit = (values, action) => {
    toast.promise(dispatch(login(values)).unwrap(), {
      loading: "Login...",
      success: <b>User is logged in!</b>,
      error: <b>Login error!</b>,
    });
    action.resetForm();
  };

  return (
    <Box sx={style}>
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
                  variant="outlined"
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
                  variant="outlined"
                  sx={{ width: "100%" }}
                  error={Boolean(touched.password && errors.password)}
                >
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <OutlinedInput
                    {...field}
                    id="password"
                    type={password ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setPassword(!password)}
                          edge="end"
                        >
                          {password ? <MdVisibilityOff /> : <MdVisibility />}
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
      <div className={s.box}>
        <span className={s.span}>You don&apos;t have an account?</span>
        <Link to="/register">
          <Button variant="contained">Register</Button>
        </Link>
      </div>
    </Box>
  );
};
export default LoginForm;
