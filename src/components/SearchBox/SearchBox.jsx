import { useDispatch, useSelector } from "react-redux";
import s from "./SearchBox.module.css";
import { changeFilter, selectNameFilter } from "../../redux/filtersSlice";
import { MdClear } from "react-icons/md";

const SearchBox = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectNameFilter);

  const handleSearch = (e) => {
    dispatch(changeFilter(e.target.value.toLowerCase()));
  };
  const clearFilter = () => {
    dispatch(changeFilter(""));
  };

  return (
    <div className={s.box}>
      <label htmlFor="search">Find contacts by name</label>
      <input
        type="text"
        onChange={handleSearch}
        placeholder="Start find here..."
        className={s.input}
        id="search"
        value={filter}
      />
      <button onClick={clearFilter} type="button" className={s.btn}>
        <MdClear className={s.icon} />
      </button>
    </div>
  );
};

export default SearchBox;
