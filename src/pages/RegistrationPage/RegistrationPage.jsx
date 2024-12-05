import { Button } from "@mui/material";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import { Link } from "react-router-dom";
import s from "./RegistrationPage.module.css";

const RegistrationPage = () => {
  return (
    <div className={s.box}>
      <h2 className={s.title}>Register a new account</h2>
      <RegistrationForm />
      <span className={s.span}>Already have an account?</span>

      <Link to="/login">
        <Button variant="contained">Login</Button>
      </Link>
    </div>
  );
};
export default RegistrationPage;
