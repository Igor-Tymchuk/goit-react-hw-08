import { Box } from "@mui/material";
import s from "./Footer.module.css";
const style = {
  display: "flex",
  boxSizing: "border-box",
  bgcolor: "background.paper",
  borderRadius: "5px",
  boxShadow: 24,
  margin: "2px",
  p: 2,
};
const Footer = () => {
  return (
    <>
      <Box sx={style}>
        <span>Created by Tymchuk 2024&copy;</span>
      </Box>
    </>
  );
};
export default Footer;
