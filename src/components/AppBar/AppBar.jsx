import { Switch } from "@mui/material";
import s from "./AppBar.module.css";

import Navigation from "../Navigation/Navigation";
import AuthNav from "../AuthNav/AuthNav";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import UserMenu from "../UserMenu/UserMenu";

const AppBar = () => {
  const isLogged = useSelector(selectIsLoggedIn);
  return (
    <header id="header" className={s.header}>
      <Switch color="black" aria-label="theme switch" />
      <div className={s.nav}>
        <Navigation />
        {isLogged ? <UserMenu /> : <AuthNav />}
      </div>
    </header>
  );
};
export default AppBar;
