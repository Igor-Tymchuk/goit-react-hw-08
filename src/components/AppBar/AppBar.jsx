import { Box } from "@mui/material";
import s from "./AppBar.module.css";

import Navigation from "../Navigation/Navigation";
import AuthNav from "../AuthNav/AuthNav";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import UserMenu from "../UserMenu/UserMenu";

const style = {
  display: "flex",
  boxSizing: "border-box",
  bgcolor: "background.paper",
  borderRadius: "5px",
  boxShadow: 24,
  margin: "2px",
  p: 2,
  position: "sticky",
  top: "2px",
  zIndex: "2",
};

const AppBar = ({ changeTheme }) => {
  const isLogged = useSelector(selectIsLoggedIn);
  return (
    <Box sx={style}>
      <div className={s.nav}>
        <Navigation changeTheme={changeTheme} />
        {isLogged ? <UserMenu /> : <AuthNav />}
      </div>
    </Box>
  );
};
export default AppBar;
