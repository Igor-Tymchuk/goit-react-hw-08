import { Popover } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectDeleteData } from "../../redux/contacts/selectors";
import { deleteContact } from "../../redux/contacts/operations";
import { setDeleteData } from "../../redux/contacts/slice";
import toast from "react-hot-toast";
import s from "./PopoverComponent.module.css";

const PopoverComponent = () => {
  const dispatch = useDispatch();
  const isDelete = useSelector(selectDeleteData);

  const handleDelete = ({ name, id }) => {
    toast.promise(dispatch(deleteContact(id)).unwrap(), {
      loading: "Deleting...",
      success: <b>{name} was successfully deleted.</b>,
      error: <b>Error! Could not delete.</b>,
    });
    dispatch(setDeleteData(null));
  };

  const handleClose = () => {
    dispatch(setDeleteData(null));
  };

  return (
    isDelete && (
      <Popover
        open={Boolean(isDelete)}
        onClose={handleClose}
        anchorEl={document.getElementById(isDelete.id)}
        anchorOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
        sx={{
          backgroundColor: "#33000033",
          "& .MuiPaper-root": {
            backgroundColor: "transparent",
            boxShadow: "none",
          },
        }}
      >
        <button onClick={() => handleDelete(isDelete)} className={s.btn}>
          Confirm delete?
          <br />
          {isDelete.name}
        </button>
      </Popover>
    )
  );
};
export default PopoverComponent;
