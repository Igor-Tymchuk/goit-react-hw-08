import { Outlet } from "react-router-dom";
import AppBar from "../AppBar/AppBar";
import s from "./Layout.module.css";
import { Toaster } from "react-hot-toast";
import Modal from "../ModalWindow/ModalWindow";
import PopoverComponent from "../PopoverComponent/PopoverComponent";

const Layout = () => {
  return (
    <>
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
    </>
  );
};

export default Layout;
