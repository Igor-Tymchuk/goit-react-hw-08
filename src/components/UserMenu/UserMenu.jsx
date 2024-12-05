import { useDispatch, useSelector } from "react-redux";
import { selectToken, selectUser } from "../../redux/auth/selectors";
import s from "./UserMenu.module.css";
import { Button } from "@mui/material";
import { logout } from "../../redux/auth/operations";
import toast from "react-hot-toast";

const UserMenu = () => {
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const handleLogout = () => {
    toast.promise(dispatch(logout(token)).unwrap(), {
      loading: "Logout...",
      success: <b>The user is logged out!</b>,
      error: <b>Missing logout!</b>,
    });
  };

  return (
    <div className={s.box}>
      <p className={s.link}>
        Hello,&nbsp;<span>{user.name}</span>!
      </p>
      <Button type="button" onClick={handleLogout} variant="contained">
        logout
      </Button>
    </div>
  );
};
export default UserMenu;
