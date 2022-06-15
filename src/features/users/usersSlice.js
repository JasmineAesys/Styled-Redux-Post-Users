import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: "0", name: "Elizabeth George" },
  { id: "1", name: "Enrique Lesty" },
  { id: "2", name: "Donald Enderson" },
];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export const allUsers = (state) => state.users;
export default usersSlice.reducer;
