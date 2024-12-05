import s from "./Contact.module.css";
import { FaTrashAlt } from "react-icons/fa";
import { MdPhone } from "react-icons/md";
import { BsPersonFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contacts/operations";
import toast from "react-hot-toast";

const Contact = ({ contact }) => {
  const dispatch = useDispatch();

  const handleDelete = ({ name, id }) => {
    toast.promise(dispatch(deleteContact(id)).unwrap(), {
      loading: "Deleting...",
      success: <b>{name} was successfully deleted.</b>,
      error: <b>Error! Could not delete.</b>,
    });
  };

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
      <button onClick={() => handleDelete(contact)} className={s.btn}>
        <FaTrashAlt />
      </button>
    </li>
  );
};

export default Contact;
