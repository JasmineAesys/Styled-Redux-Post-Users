import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { allUsers } from "../users/usersSlice";
import { selectPostById } from "../posts/postsSlice";
import { Container } from "../../styled/Container";
import { CardTitle } from "../../styled/CardTitle";
import { Select } from "../../styled/Select";
import { Button } from "../../styled/Button";
import { Input } from "../../styled/Input";
import { Card } from "../../styled/Card";
import { Link } from "react-router-dom";
import { editPostTarget } from "./postsSlice";

function EditPost() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const users = useSelector(allUsers);
  const post = useSelector((state) => selectPostById(state, id));
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  let userInit = users[post.user] ? users[post.user].name : "Anonimous";
  const [user, setUser] = useState(userInit);
  const navigate = useNavigate();

  const editPost = () => {
    if (title && content && user) {
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

  return (
    <Container>
      <Card>
        <Link to="/">Back to Home</Link>
      </Card>
      <CardTitle style={{ borderBottom: "none" }}>Edit Post {id}</CardTitle>
      Post Author
      <Select id="postAuthor" value={post.user} onChange={(e) => setUser(e.target.value)}>
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
    </Container>
  );
}

export default EditPost;
