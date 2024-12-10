import { Outlet } from "react-router-dom";
import AppBar from "../AppBar/AppBar";
import s from "./Layout.module.css";
import { Toaster } from "react-hot-toast";
import Modal from "../ModalWindow/ModalWindow";
import PopoverComponent from "../PopoverComponent/PopoverComponent";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useSelector } from "react-redux";
import { selectTheme } from "../../redux/common/selectors";

const Layout = () => {
  const darkTheme = useSelector(selectTheme);
  const theme = createTheme({
    palette: {
      mode: darkTheme ? "dark" : "light",
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            margin: "0 auto",
          },
        },
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar />
        <Toaster
          toastOptions={{
            style: {
              color: "white",
            },
            success: {
              style: {
                background: "darkgreen",
              },
            },
            error: {
              style: {
                background: "darkred",
              },
            },
          }}
        />
        <Modal />
        <PopoverComponent />
        <main className={s.main}>
          <Outlet />
        </main>
      </ThemeProvider>
    </>
  );
};

export default Layout;
