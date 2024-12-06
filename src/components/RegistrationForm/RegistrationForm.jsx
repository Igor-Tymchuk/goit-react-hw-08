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
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import s from "./RegistrationForm.module.css";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/auth/operations";
import {
  toggleCheckbox,
  toggleShowConfirmPwd,
  toggleShowPwd,
} from "../../redux/auth/slice";
import {
  selectCheckbox,
  selectShowConfirmPwd,
  selectShowPwd,
} from "../../redux/auth/selectors";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import * as Yup from "yup";
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

const RegistrationForm = () => {
  const dispatch = useDispatch();

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
    dispatch(toggleCheckbox(!checkbox));
  };

  const showPassword = useSelector(selectShowPwd);
  const showConfirmPwd = useSelector(selectShowConfirmPwd);
  const checkbox = useSelector(selectCheckbox);

  const handleShowPassword = () => dispatch(toggleShowPwd(!showPassword));
  const handleShowConfirmPwd = () =>
    dispatch(toggleShowConfirmPwd(!showConfirmPwd));
  const handleCheckbox = () => dispatch(toggleCheckbox(!checkbox));

  return (
    <div className={s.box}>
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
                    type={showConfirmPwd ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={
                            showConfirmPwd
                              ? "hide the password"
                              : "display the password"
                          }
                          onClick={handleShowConfirmPwd}
                          edge="end"
                        >
                          {showConfirmPwd ? (
                            <MdVisibilityOff />
                          ) : (
                            <MdVisibility />
                          )}
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
                  control={<Checkbox onClick={handleCheckbox} />}
                  label="I agree to the user rules!"
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
      <span className={s.span}>Already have an account?</span>
      <Link to="/login">
        <Button variant="contained">Sign in</Button>
      </Link>
    </div>
  );
};
export default RegistrationForm;
