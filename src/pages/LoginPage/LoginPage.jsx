import { Button } from "@mui/material";
import LoginForm from "../../components/LoginForm/LoginForm";
import s from "./LoginPage.module.css";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className={s.box}>
      <h2 className={s.title}>Login to PhoneBook</h2>
      <LoginForm />
      <span className={s.span}>You don&apos;t have an account?</span>

      <Link to="/register">
        <Button variant="contained">Register</Button>
      </Link>
    </div>
  );
};

export default LoginPage;
