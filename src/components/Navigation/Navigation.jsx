import { ListItemButton } from "@mui/material";
import clsx from "clsx";
import { NavLink } from "react-router-dom";
import s from "./Navigation.module.css";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { FcBusinessContact } from "react-icons/fc";

const Navigation = () => {
  const isLogged = useSelector(selectIsLoggedIn);
  const linkNav = ({ isActive }) => {
    return clsx(isActive && s.active);
  };
  return (
    <nav>
      <FcBusinessContact className={s.logo} />
      <NavLink className={linkNav} to="/">
        <ListItemButton>Home</ListItemButton>
      </NavLink>

      {isLogged && (
        <NavLink className={linkNav} to="contacts">
          <ListItemButton>Contacts</ListItemButton>
        </NavLink>
      )}
    </nav>
  );
};
export default Navigation;
