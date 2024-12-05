import clsx from "clsx";
import { ListItemButton } from "@mui/material";
import { NavLink } from "react-router-dom";
import s from "./AuthNav.module.css";

const AuthNav = () => {
  const linkNav = ({ isActive }) => {
    return clsx(isActive && s.active);
  };
  return (
    <div className={s.box}>
      <NavLink className={linkNav} to="login">
        <ListItemButton>Login</ListItemButton>
      </NavLink>
      <NavLink className={linkNav} to="register">
        <ListItemButton>Register</ListItemButton>
      </NavLink>
    </div>
  );
};
export default AuthNav;
