import { useDispatch, useSelector } from "react-redux";
import s from "./SearchBox.module.css";
import { changeFilter } from "../../redux/filters/slice";
import { MdClear } from "react-icons/md";
import { selectNameFilter } from "../../redux/filters/selectors";
import { Box, TextField } from "@mui/material";

const style = {
  boxSizing: "border-box",
  bgcolor: "background.paper",
  borderRadius: "5px",
  boxShadow: 24,
  p: 1,
  margin: "10px 0",
};

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
      <Box sx={style}>
        <TextField
          sx={{ width: "100%", position: "relative" }}
          label="Find contacts by name or number"
          placeholder="Start find here..."
          variant="outlined"
          id="search"
          value={filter}
          type="text"
          onChange={handleSearch}
        />
        {filter && (
          <button onClick={clearFilter} type="button" className={s.btn}>
            <MdClear className={s.icon} />
          </button>
        )}
      </Box>
    </div>
  );
};

export default SearchBox;
