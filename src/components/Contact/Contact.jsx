import s from "./Contact.module.css";
import { FaTrashAlt, FaUserEdit } from "react-icons/fa";
import { MdPhone } from "react-icons/md";
import { BsPersonFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { deleteContact } from "../../redux/contacts/operations";
import toast from "react-hot-toast";
import { setDeleteData, setEditData } from "../../redux/contacts/slice";
import { ListItem, ListItemButton, Popover } from "@mui/material";
import { selectDeleteData } from "../../redux/contacts/selectors";
import { useRef } from "react";

const style = {
  boxSizing: "border-box",
  bgcolor: "background.paper",
  borderRadius: "5px",
  boxShadow: 24,
  p: 1,
};

const Contact = ({ contact }) => {
  const dispatch = useDispatch();
  const buttonRef = useRef(null);
  const isDelete = useSelector(selectDeleteData);

  const openEdit = (contact) => {
    dispatch(setEditData(contact));
  };

  const handleDelete = ({ name, id }) => {
    toast.promise(dispatch(deleteContact(id)).unwrap(), {
      loading: "Deleting...",
      success: <b>{name} was successfully deleted.</b>,
      error: <b>Error! Could not delete.</b>,
    });
    dispatch(setDeleteData(null));
  };

  const handleClick = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      dispatch(
        setDeleteData({
          top: rect.top + window.scrollY + 19,
          left: rect.left + window.scrollX - 19,
        })
      );
    }
  };

  const handleClose = () => {
    dispatch(setDeleteData(null));
  };
  return (
    <ListItem disablePadding sx={style}>
      <ListItemButton
        sx={{ display: "flex", justifyContent: "space-between", p: 1 }}
      >
        <div className={s.itemBox}>
          <p className={s.name}>
            <BsPersonFill className={s.icon} />
            {contact.name}
          </p>
          <p className={s.number}>
            <MdPhone className={s.icon} />
            {contact.number}
          </p>
        </div>
        <div className={s.buttons}>
          <button onClick={() => openEdit(contact)} className={s.btnEdit}>
            <FaUserEdit />
          </button>

          <button ref={buttonRef} onClick={handleClick} className={s.btn}>
            <FaTrashAlt />
          </button>
        </div>
        <Popover
          open={Boolean(isDelete)}
          anchorReference="anchorPosition"
          anchorPosition={isDelete}
          onClose={handleClose}
          className={s.popover}
          transformOrigin={{
            vertical: "center",
            horizontal: "center",
          }}
          sx={{
            "& .MuiPaper-root": {
              backgroundColor: "transparent",
              boxShadow: "none",
            },
          }}
        >
          <button onClick={() => handleDelete(contact)} className={s.btn}>
            Confirm delete?
            <br />
            {contact.name}
          </button>
        </Popover>
      </ListItemButton>
    </ListItem>
  );
};

export default Contact;
