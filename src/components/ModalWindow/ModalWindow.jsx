import { Box, Button, Modal, TextField } from "@mui/material";
import { Field, Form, Formik } from "formik";
import s from "./ModalWindow.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setEditData } from "../../redux/contacts/slice";
import { selectEditData } from "../../redux/contacts/selectors";
import toast from "react-hot-toast";
import { editContact } from "../../redux/contacts/operations";
import * as Yup from "yup";
import { FaUserEdit } from "react-icons/fa";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxSizing: "border-box",
  width: "340px",
  bgcolor: "background.paper",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

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

const ModalWindow = () => {
  const dispatch = useDispatch();
  const editData = useSelector(selectEditData);
  const handleClose = () => dispatch(setEditData(null));
  const handleEdit = async (values, actions) => {
    if (editData.name === values.name && editData.number === values.number) {
      return toast.error("You did not edit...");
    }
    await toast.promise(dispatch(editContact(values)).unwrap(), {
      loading: "Editing...",
      success: <b>The contact was successfully edited.</b>,
      error: <b>Error! Could not edit.</b>,
    });
    actions.resetForm();
    handleClose();
  };

  return (
    editData && (
      <Modal
        open={Boolean(editData)}
        onClose={handleClose}
        sx={{
          "& .MuiBackdrop-root": {
            backgroundColor: "#fcc51233",
          },
        }}
      >
        <Box sx={style}>
          <h2 className={s.title}>Contact Editor</h2>
          <Formik
            onSubmit={handleEdit}
            initialValues={{
              id: editData.id,
              name: editData.name,
              number: editData.number,
            }}
            validationSchema={FeedbackSchema}
          >
            {({ errors, touched }) => (
              <Form className={s.form}>
                <Field name="name">
                  {({ field }) => (
                    <TextField
                      error={Boolean(touched.name && errors.name)}
                      sx={{ width: "100%" }}
                      {...field}
                      label="Username"
                      variant="outlined"
                      helperText={
                        touched.name && errors.name ? errors.name : " "
                      }
                    />
                  )}
                </Field>
                <Field name="number">
                  {({ field }) => (
                    <TextField
                      error={Boolean(touched.number && errors.number)}
                      sx={{ width: "100%" }}
                      {...field}
                      label="Phone number"
                      variant="outlined"
                      helperText={
                        touched.number && errors.number ? errors.number : " "
                      }
                    />
                  )}
                </Field>

                <Button type="submit" className={s.btn} variant="contained">
                  <FaUserEdit />
                  Edit contact
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    )
  );
};
export default ModalWindow;
