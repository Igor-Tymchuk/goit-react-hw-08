import {
  Button,
  Checkbox,
  FilledInput,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
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

const RegistrationForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, action) => {
    if (values.password !== values.confirmPwd)
      return toast.error("invalid confirm password");
    delete values.confirmPwd;
    toast.promise(dispatch(register(values)).unwrap(), {
      loading: "Register...",
      success: <b>User created!</b>,
      error: <b>User creation error!</b>,
    });
    action.resetForm();
  };

  const showPassword = useSelector(selectShowPwd);
  const showConfirmPwd = useSelector(selectShowConfirmPwd);
  const checkbox = useSelector(selectCheckbox);

  const handleShowPassword = () => dispatch(toggleShowPwd(!showPassword));
  const handleShowConfirmPwd = () =>
    dispatch(toggleShowConfirmPwd(!showConfirmPwd));
  const handleCheckbox = () => dispatch(toggleCheckbox(!checkbox));

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={{
        name: "",
        email: "",
        password: "",
        confirmPwd: "",
      }}
    >
      <Form className={s.form}>
        <Field name="name">
          {({ field }) => (
            <TextField
              sx={{ width: "100%" }}
              {...field}
              label="Username"
              variant="filled"
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
              variant="filled"
            />
          )}
        </Field>
        <Field name="password" id="password">
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
        <Field name="confirmPwd" id="confirmPwd">
          {({ field }) => (
            <FormControl variant="filled">
              <InputLabel htmlFor="confirmPwd">Confirm Password</InputLabel>
              <FilledInput
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
                      {showConfirmPwd ? <MdVisibilityOff /> : <MdVisibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Confirm Password"
              />
            </FormControl>
          )}
        </Field>
        <FormControlLabel
          value="end"
          control={<Checkbox onClick={handleCheckbox} />}
          label="I agree to the user rules!"
          labelPlacement="end"
        />
        <Button type="submit" disabled={!checkbox} variant="contained">
          Register
        </Button>
      </Form>
    </Formik>
  );
};
export default RegistrationForm;
