import s from "./ErrorPage.module.css";
const ErrorPage = () => {
  return (
    <div className={s.error}>
      <p>Oops...</p>
      Page Not Found!
    </div>
  );
};
export default ErrorPage;
