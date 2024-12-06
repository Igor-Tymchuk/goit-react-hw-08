import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import s from "./ContactForm.module.css";
import { useId } from "react";
import { MdPersonAddAlt1 } from "react-icons/md";
import { addContact } from "../../redux/contacts/operations";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { Button, TextField } from "@mui/material";

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

const ContactForm = () => {
  const idName = useId();
  const idNumber = useId();

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
        <Form className={s.form}>
          <Field name="name" id={idName}>
            {({ field }) => (
              <TextField
                error={touched.name && errors.name}
                sx={{ width: "100%" }}
                {...field}
                label="Username"
                variant="filled"
                helperText={touched.name && errors.name ? errors.name : " "}
              />
            )}
          </Field>
          <Field name="number" id={idNumber}>
            {({ field }) => (
              <TextField
                error={touched.number && errors.number}
                sx={{ width: "100%" }}
                {...field}
                label="Phone number"
                variant="filled"
                helperText={
                  touched.number && errors.number ? errors.number : " "
                }
              />
            )}
          </Field>

          <Button type="submit" className={s.btn} variant="contained">
            <MdPersonAddAlt1 />
            Add contact
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;
