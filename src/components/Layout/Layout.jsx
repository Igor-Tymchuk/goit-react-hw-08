import { Outlet } from "react-router-dom";
import AppBar from "../AppBar/AppBar";
import s from "./Layout.module.css";
import Footer from "../Footer/Footer";
import { Toaster } from "react-hot-toast";

const Layout = () => {
  return (
    <>
      <AppBar />
      <Toaster
        toastOptions={{
          style: {
            border: "1px solid black",
            color: "white",
          },
          success: {
            style: {
              background: "green",
            },
          },
          error: {
            style: {
              background: "red",
            },
          },
        }}
      />
      <main className={s.main}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
