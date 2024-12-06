import s from "./Contact.module.css";
import { FaTrashAlt, FaUserEdit } from "react-icons/fa";
import { MdPhone } from "react-icons/md";
import { BsPersonFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contacts/operations";
import toast from "react-hot-toast";
import { setEditData } from "../../redux/contacts/slice";
import { Popover } from "@mui/material";
import { useState } from "react";

const Contact = ({ contact }) => {
  const dispatch = useDispatch();

  const openEdit = (contact) => {
    dispatch(setEditData(contact));
  };

  const handleDelete = ({ name, id }) => {
    toast.promise(dispatch(deleteContact(id)).unwrap(), {
      loading: "Deleting...",
      success: <b>{name} was successfully deleted.</b>,
      error: <b>Error! Could not delete.</b>,
    });
  };

  const [anchorEl, setAnchorEl] = useState(false);

  const handleClick = (e) => {
    console.log(e);
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <li className={s.listItem}>
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
      <div>
        <button onClick={() => openEdit(contact)} className={s.btnEdit}>
          <FaUserEdit />
        </button>

        {/* <button onClick={() => handleDelete(contact)} className={s.btn}> */}
        <button onClick={handleClick} className={s.btn}>
          <FaTrashAlt />
        </button>
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        className={s.popover}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
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
          Confirm
          <br />
          delete?
        </button>
      </Popover>
    </li>
  );
};

export default Contact;
