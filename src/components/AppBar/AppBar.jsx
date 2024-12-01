import { NavLink } from "react-router-dom";

const AppBar = () => {
  return (
    <div>
      <NavLink to="/">Home</NavLink>
      <NavLink to="contacts">Contacts</NavLink>
      <NavLink to="login">Login</NavLink>
    </div>
  );
};
export default AppBar;
