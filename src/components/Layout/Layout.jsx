import { Outlet } from "react-router-dom";
import AppBar from "../AppBar/AppBar";
import s from "./Layout.module.css";
import Footer from "../Footer/Footer";
import { Toaster } from "react-hot-toast";
import Modal from "../ModalWindow/ModalWindow";

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
      <main className={s.main}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
