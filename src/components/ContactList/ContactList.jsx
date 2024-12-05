import { useSelector } from "react-redux";
import Contact from "../Contact/Contact";
import s from "./ContactList.module.css";
import {
  selectError,
  selectFilteredContacts,
  selectTotalContacts,
} from "../../redux/contacts/selectors";
import { selectNameFilter } from "../../redux/filters/selectors";

const ContactList = () => {
  const filter = useSelector(selectNameFilter);
  const totalCount = useSelector(selectTotalContacts);
  const filteredContacts = useSelector(selectFilteredContacts);
  const error = useSelector(selectError);
  return !error ? (
    <>
      <div className={s.counter}>
        <p className={s.total}>
          Contacts: <span>{totalCount}</span>
        </p>
        {filter && (
          <p className={s.found}>
            Found: <span>{filteredContacts.length}</span>
          </p>
        )}
      </div>
      <ul className={s.listbox}>
        {filteredContacts.map((contact) => (
          <Contact key={contact.id} contact={contact} />
        ))}
      </ul>
    </>
  ) : (
    <div className={s.error}>
      <p>Oops...</p>
      {error}!
    </div>
  );
};

export default ContactList;
