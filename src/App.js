import logo from "./logo.svg";
import "./App.css";
import PostList from "./features/posts/PostList";
import AddPost from "./features/posts/AddPost";

function App() {
  return (
    <>
      <AddPost />
      <PostList />
    </>
  );
}

export default App;
