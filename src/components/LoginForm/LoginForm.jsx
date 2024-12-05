import {
  Button,
  FilledInput,
  FormControl,
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
    <Formik
      onSubmit={handleSubmit}
      initialValues={{
        email: "",
        password: "",
      }}
    >
      <Form className={s.form}>
        <Field name="email">
          {({ field }) => (
            <TextField
              sx={{ width: "100%" }}
              {...field}
              label="Email"
              type="email"
              variant="filled"
            />
          )}
        </Field>
        <Field name="password">
          {({ field }) => (
            <FormControl variant="filled">
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
                      {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
          )}
        </Field>
        <Button type="submit" variant="contained">
          Login
        </Button>
      </Form>
    </Formik>
  );
};
export default LoginForm;
