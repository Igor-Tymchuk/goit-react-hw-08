import {
  Button,
  Checkbox,
  OutlinedInput,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
  FormHelperText,
  Box,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import s from "./RegistrationForm.module.css";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";

import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useState } from "react";
/* eslint-disable no-useless-escape */
const re =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
/* eslint-enable no-useless-escape */
const FeedbackSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().matches(re, "Invalid email format!").required("Required"),
  password: Yup.string()
    .min(7, "Too Short!")
    .max(20, "Too Long")
    .required("Required"),
  confirmPwd: Yup.string()
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
const RegistrationForm = () => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState(false);
  const [confirmPwd, setConfirmPwd] = useState(false);
  const [checkbox, setCheckbox] = useState(false);

  const handleSubmit = (values, action) => {
    if (values.password !== values.confirmPwd)
      return toast.error("invalid confirm password");
    delete values.confirmPwd;
    delete values.checkbox;
    toast.promise(dispatch(register(values)).unwrap(), {
      loading: "Register...",
      success: <b>User created!</b>,
      error: <b>User creation error!</b>,
    });
    action.resetForm();
    setCheckbox(!checkbox);
  };

  return (
    <Box sx={style}>
      <h2 className={s.title}>Register a new account</h2>
      <Formik
        onSubmit={handleSubmit}
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPwd: "",
        }}
        validationSchema={FeedbackSchema}
      >
        {({ errors, touched }) => (
          <Form className={s.form}>
            <Field name="name">
              {({ field }) => (
                <TextField
                  sx={{ width: "100%" }}
                  {...field}
                  label="Username"
                  variant="outlined"
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name ? errors.name : " "}
                />
              )}
            </Field>
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
            <Field name="password" id="password" className={s.input}>
              {({ field }) => (
                <FormControl
                  sx={{ width: "100%" }}
                  variant="outlined"
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
                  />
                  <FormHelperText>
                    {touched.password && errors.password
                      ? errors.password
                      : " "}
                  </FormHelperText>
                </FormControl>
              )}
            </Field>
            <Field name="confirmPwd" id="confirmPwd">
              {({ field }) => (
                <FormControl
                  sx={{ width: "100%" }}
                  variant="outlined"
                  error={Boolean(touched.confirmPwd && errors.confirmPwd)}
                >
                  <InputLabel htmlFor="confirmPwd">Confirm Password</InputLabel>
                  <OutlinedInput
                    {...field}
                    id="confirmPwd"
                    type={confirmPwd ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setConfirmPwd(!confirmPwd)}
                          edge="end"
                        >
                          {confirmPwd ? <MdVisibilityOff /> : <MdVisibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Confirm Password"
                  />
                  <FormHelperText>
                    {touched.confirmPwd && errors.confirmPwd
                      ? errors.confirmPwd
                      : " "}
                  </FormHelperText>
                </FormControl>
              )}
            </Field>
            <Field name="checkbox">
              {({ field }) => (
                <FormControlLabel
                  {...field}
                  value="end"
                  checked={checkbox}
                  control={<Checkbox onClick={() => setCheckbox(!checkbox)} />}
                  label={
                    <span>
                      I agree to the&nbsp;
                      <Link to="/#policy" className={s.policy}>
                        Terms and Conditions
                      </Link>
                      !
                    </span>
                  }
                  labelPlacement="end"
                />
              )}
            </Field>
            <Button
              type="submit"
              disabled={!checkbox}
              sx={{ width: "100%", height: "50px" }}
              variant="contained"
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
      <div className={s.box}>
        <span className={s.span}>Already have an account?</span>
        <Link to="/login">
          <Button variant="contained">Sign in</Button>
        </Link>
      </div>
    </Box>
  );
};
export default RegistrationForm;
