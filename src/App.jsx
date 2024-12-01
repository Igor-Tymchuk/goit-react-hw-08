// import { useDispatch, useSelector } from "react-redux";
import "./App.css";
// import ContactForm from "./components/ContactForm/ContactForm";
// import ContactList from "./components/ContactList/ContactList";
// import SearchBox from "./components/SearchBox/SearchBox";
// import { fetchContacts } from "./redux/contactsOps";
// import { selectError, selectIsLoading } from "./redux/contactsSlice";
// import { useEffect } from "react";
// import Loader from "./components/Loader/Loader";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage";
import ContactsPage from "./pages/ContactsPage";
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import ErrorPage from "./pages/ErrorPage";

const App = () => {
  // const dispatch = useDispatch();
  // const loader = useSelector(selectIsLoading);
  // const error = useSelector(selectError);

  // useEffect(() => {
  //   dispatch(fetchContacts());
  // }, [dispatch]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="contacts" element={<ContactsPage />} />
          <Route path="register" element={<RegistrationPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>

      {/* <h1>
        Phone<span>book</span>
      </h1>
      <ContactForm />
      <SearchBox />
      {loader && !error && <Loader />}
      <ContactList /> */}
    </div>
  );
};

export default App;
