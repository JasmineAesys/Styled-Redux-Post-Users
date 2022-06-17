import { createSlice } from "@reduxjs/toolkit";
import { sub } from "date-fns";
const initialState = [
  {
    id: "1",
    title: "Learning Redux",
    content: "App with Redux",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {
      like: 0,
    },
  },
  {
    id: "2",
    title: "The dog is on the table",
    content: "Doggo jumps on the table eating everything",
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    reactions: {
      like: 0,
    },
  },
];

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdd(state, action) {
      state.push(action.payload);
    },

    reactionAdd(state, action) {
      const postTarget = state.find((post) => post.id === action.payload);
      postTarget && postTarget.reactions.like++;
    },
    editPostTarget(state, action) {
      const postTarget = state.find((post) => post.id === action.payload.id);
      postTarget.content = action.payload.content;
      postTarget.title = action.payload.title;
      postTarget.user = action.payload.user;
    },
    deletePost(state, action) {
      state.splice(
        state.findIndex((post) => post.id === action.payload),
        1
      );
    },
  },
});

export const selectPostById = (state, id) => {
  const found = state.posts.find((post) => post.id === id);
  return found;
};

export const { postAdd, reactionAdd, editPostTarget, deletePost } = postsSlice.actions;
export const selectAllPosts = (state) => state.posts;
export default postsSlice.reducer;
