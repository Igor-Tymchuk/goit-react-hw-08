import { useSelector } from "react-redux";
import Contact from "../Contact/Contact";
import s from "./ContactList.module.css";
import {
  selectError,
  selectFilteredContacts,
  selectTotalContacts,
} from "../../redux/contacts/selectors";
import { selectNameFilter } from "../../redux/filters/selectors";
import { Box, Typography } from "@mui/material";

const ContactList = () => {
  const filter = useSelector(selectNameFilter);
  const totalCount = useSelector(selectTotalContacts);
  const filteredContacts = useSelector(selectFilteredContacts);
  const error = useSelector(selectError);
  return !error ? (
    <div>
      <Box className={s.counter}>
        <Typography className={s.total}>
          Contacts: <span>{totalCount}</span>
        </Typography>
        {filter && (
          <Typography className={s.found}>
            Found: <span>{filteredContacts.length}</span>
          </Typography>
        )}
      </Box>
      <ul className={s.listbox}>
        {filteredContacts.map((contact) => (
          <Contact key={contact.id} contact={contact} />
        ))}
      </ul>
    </div>
  ) : (
    <div className={s.error}>
      <p>Oops...</p>
      {error}!
    </div>
  );
};

export default ContactList;
