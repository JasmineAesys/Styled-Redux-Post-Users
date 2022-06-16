import "./App.css";
import { Routes, Route } from "react-router-dom";
import SinglePost from "./features/posts/SinglePost";
import PostList from "./features/posts/PostList";
import AddPost from "./features/posts/AddPost";
import EditPost from "./features/posts/EditPost";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <AddPost /> <PostList />
          </>
        }
      />

      <Route path="post/:id" element={<SinglePost />}></Route>
      <Route path="post/edit/:id" element={<EditPost />}></Route>
    </Routes>
  );
}

export default App;
