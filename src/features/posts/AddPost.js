import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "../../styled/Container";
import { CardTitle } from "../../styled/CardTitle";
import { Input } from "../../styled/Input";
import { Button } from "../../styled/Button";
import { nanoid } from "@reduxjs/toolkit";
import { postAdd } from "./postsSlice";
import { allUsers } from "../users/usersSlice";
import { Select } from "../../styled/Select";

function AddPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [user, setUser] = useState("");
  const users = useSelector(allUsers);
  const dispatch = useDispatch();

  const addPost = () => {
    if (title && content && user) {
      dispatch(
        postAdd({
          id: nanoid(),
          title,
          content,
          user,
          date: new Date().toISOString(),
          reactions: {
            like: 0,
          },
        })
      );
      setTitle("");
      setContent("");
      setUser("");
    }
  };

  return (
    <Container>
      <CardTitle style={{ borderBottom: "none" }}>Add a new Post</CardTitle>
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
      <Button onClick={() => addPost()}>Save Post</Button>
    </Container>
  );
}

export default AddPost;
