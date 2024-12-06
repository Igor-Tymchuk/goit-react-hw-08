import s from "./Contact.module.css";
import { FaTrashAlt, FaUserEdit } from "react-icons/fa";
import { MdPhone } from "react-icons/md";
import { BsPersonFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { setDeleteData, setEditData } from "../../redux/contacts/slice";
import { ListItem, ListItemButton } from "@mui/material";

const style = {
  boxSizing: "border-box",
  bgcolor: "background.paper",
  borderRadius: "5px",
  boxShadow: 24,
  p: 1,
};

const Contact = ({ contact }) => {
  const dispatch = useDispatch();

  const openEdit = (contact) => {
    dispatch(setEditData(contact));
  };

  const handleClick = () => {
    dispatch(setDeleteData(contact));
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
          <button onClick={handleClick} className={s.btn} id={contact.id}>
            <FaTrashAlt />
          </button>
        </div>
      </ListItemButton>
    </ListItem>
  );
};

export default Contact;
