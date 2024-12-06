import { createSlice } from "@reduxjs/toolkit";
import {
  fetchContacts,
  addContact,
  deleteContact,
  editContact,
} from "./operations";

const handlePending = (state) => {
  state.loading = true;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const slice = createSlice({
  name: "contacts",
  initialState: {
    items: [],
    editData: null,
    deleteData: null,
    loading: false,
    error: null,
  },
  reducers: {
    setEditData(state, action) {
      state.editData = action.payload;
    },
    setDeleteData(state, action) {
      state.deleteData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, handleRejected)
      .addCase(addContact.fulfilled, (state, action) => {
        state.error = null;
        (state.error = null), state.items.push(action.payload);
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.error = null;
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      })
      .addCase(editContact.fulfilled, (state, action) => {
        state.error = null;
        const contact = state.items.find(
          (item) => item.id === action.payload.id
        );
        contact.name = action.payload.name;
        contact.number = action.payload.number;
      });
  },
});
export const { setEditData, setDeleteData } = slice.actions;
export default slice.reducer;
