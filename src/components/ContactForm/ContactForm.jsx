import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { MdPersonAddAlt1 } from "react-icons/md";
import { addContact } from "../../redux/contacts/operations";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { Box, Button, TextField } from "@mui/material";
import s from "./ContactForm.module.css";

const FeedbackSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  number: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long")
    .required("Required"),
});

const emptyValues = {
  name: "",
  number: "",
};

const style = {
  boxSizing: "border-box",
  bgcolor: "background.paper",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

const ContactForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    toast.promise(dispatch(addContact(values)).unwrap(), {
      loading: "Create contact...",
      success: <b>{values.name} was successfully created!</b>,
      error: <b>Error creating contact!</b>,
    });
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={emptyValues}
      onSubmit={handleSubmit}
      validationSchema={FeedbackSchema}
    >
      {({ errors, touched }) => (
        <Box sx={style}>
          <h2 className={s.title}>Add new contact:</h2>
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
            <Field name="number">
              {({ field }) => (
                <TextField
                  sx={{ width: "100%" }}
                  {...field}
                  label="Phone number"
                  variant="outlined"
                  error={Boolean(touched.number && errors.number)}
                  helperText={
                    touched.number && errors.number ? errors.number : " "
                  }
                />
              )}
            </Field>

            <Button type="submit" variant="contained">
              <MdPersonAddAlt1 />
              &nbsp;Add contact
            </Button>
          </Form>
        </Box>
      )}
    </Formik>
  );
};

export default ContactForm;
