import { Outlet } from "react-router-dom";
import AppBar from "../AppBar/AppBar";
import s from "./Layout.module.css";
import { Toaster } from "react-hot-toast";
import Modal from "../ModalWindow/ModalWindow";
import PopoverComponent from "../PopoverComponent/PopoverComponent";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useEffect, useState } from "react";

const Layout = () => {
  const [themeMode, setThemeMode] = useState(false);

  const changeTheme = () => {
    setThemeMode(!themeMode);
    localStorage.setItem("darkTheme", !themeMode);
  };

  const theme = createTheme({
    palette: {
      mode: themeMode ? "dark" : "light",
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

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("darkTheme"))) setThemeMode(true);
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar changeTheme={changeTheme} />
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
