import { Box, Button, Modal, TextField } from "@mui/material";
import { Field, Form, Formik } from "formik";
import s from "./ModalWindow.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setEditData } from "../../redux/contacts/slice";
import { selectEditData } from "../../redux/contacts/selectors";
import toast from "react-hot-toast";
import { editContact } from "../../redux/contacts/operations";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxSizing: "border-box",
  maxWidth: "500px",
  minWidth: "275px",
  width: "100%",
  bgcolor: "background.paper",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

const ModalWindow = () => {
  const dispatch = useDispatch();
  const editData = useSelector(selectEditData);
  const handleClose = () => dispatch(setEditData(null));
  const handleEdit = (values, actions) => {
    toast.promise(dispatch(editContact(values)).unwrap(), {
      loading: "Editing...",
      success: <b>The contact was successfully edited.</b>,
      error: <b>Error! Could not edit.</b>,
    });
    actions.resetForm();
    handleClose();
  };

  return (
    editData && (
      <Modal open={Boolean(editData)} onClose={handleClose}>
        <Box sx={style}>
          <h2>Contact Editor</h2>
          <Formik
            onSubmit={handleEdit}
            initialValues={{
              id: editData.id,
              name: editData.name,
              number: editData.number,
            }}
          >
            <Form className={s.form}>
              <Field name="name">
                {({ field }) => (
                  <TextField
                    sx={{ width: "100%" }}
                    {...field}
                    label="Name"
                    type="text"
                    variant="filled"
                  />
                )}
              </Field>
              <Field name="number">
                {({ field }) => (
                  <TextField
                    sx={{ width: "100%" }}
                    {...field}
                    label="Phone number"
                    type="text"
                    variant="filled"
                  />
                )}
              </Field>
              <Button
                type="submit"
                variant="contained"
                sx={{ width: "100%", height: "50px", marginTop: "15px" }}
              >
                Edit
              </Button>
            </Form>
          </Formik>
        </Box>
      </Modal>
    )
  );
};
export default ModalWindow;
