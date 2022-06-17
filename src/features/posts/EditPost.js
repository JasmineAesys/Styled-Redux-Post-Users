import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { allUsers } from "../users/usersSlice";
import { selectPostById, editPostTarget, deletePost } from "./postsSlice";
import { Container } from "../../styled/Container";
import { CardTitle } from "../../styled/CardTitle";
import { Select } from "../../styled/Select";
import { Button } from "../../styled/Button";
import { Input } from "../../styled/Input";
import { Card } from "../../styled/Card";
import { Link } from "react-router-dom";

function EditPost() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const users = useSelector(allUsers);
  const post = useSelector((state) => selectPostById(state, id));
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [user, setUser] = useState(post.user);
  const navigate = useNavigate();

  const editPost = () => {
    if (title && content) {
      !user && setUser("Anonimous");
      dispatch(
        editPostTarget({
          id: post.id,
          title,
          content,
          user,
          date: post.date,
          reactions: {
            like: post.reactions.like,
          },
        })
      );
    }
    navigate(`/post/${post.id}`);
  };

  const deleteP = () => {
    dispatch(deletePost(id));
    navigate("/");
  };

  return (
    <Container>
      <Card>
        <Link to="/">Back to Home</Link>
      </Card>
      <CardTitle style={{ borderBottom: "none" }}>Edit Post {id}</CardTitle>
      Post Author
      <Select id="postAuthor" value={user} onChange={(e) => setUser(e.target.value)}>
        <option value=""></option>
        {users.map((user) => {
          return (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          );
        })}
      </Select>
      Title
      <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)}></Input>
      Content
      <Input type="text" value={content} onChange={(e) => setContent(e.target.value)}></Input>
      <Button onClick={() => editPost()}>Edit Post</Button>
      <Button bgcolor="red" color="white" onClick={() => deleteP()}>
        Delete Post
      </Button>
    </Container>
  );
}

export default EditPost;
