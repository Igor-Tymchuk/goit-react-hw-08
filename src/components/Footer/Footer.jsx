import { Button } from "@mui/material";
import s from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={s.footer}>
      <span>Created by Tymchuk &copy;2024</span>

      <a className={s.btn} href="#header">
        <Button variant="contained">Go up</Button>
      </a>
    </footer>
  );
};
export default Footer;
