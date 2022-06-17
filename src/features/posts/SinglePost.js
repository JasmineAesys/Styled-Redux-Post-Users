import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectPostById } from "./postsSlice";
import { Container } from "../../styled/Container";
import { Card } from "../../styled/Card";
import { CardTitle } from "../../styled/CardTitle";
import { CardContent } from "../../styled/CardContent";
import { CardAuthor } from "../../styled/CardAuthor";
import { parseISO, formatDistanceToNow } from "date-fns";
import { AiTwotoneLike } from "react-icons/ai";
import { allUsers } from "../users/usersSlice";
import { reactionAdd } from "./postsSlice";
import { Link } from "react-router-dom";

function SinglePost() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const users = useSelector(allUsers);
  const post = useSelector((state) => selectPostById(state, id));

  return post ? (
    <Container>
      <Card>
        <Link to="/">Back to Home</Link>
      </Card>
      <Card key={post.id}>
        <CardTitle>{post.title}</CardTitle>
        <CardContent>{post.content}</CardContent>
        <CardAuthor>by {users[post.user] ? users[post.user].name : "Anonimous"}</CardAuthor>
        {post.date ? formatDistanceToNow(parseISO(post.date)) + " ago" : ""}
        <br />
        <AiTwotoneLike
          style={{ width: "20px", height: "20px", color: "blue" }}
          onClick={() => dispatch(reactionAdd(post.id))}
        />
        {post.reactions.like} Like{post.reactions.like > 1 && "s"}
      </Card>
      <Card>
        <Link to={`/post/edit/${post.id}`}>Edit Post</Link>
      </Card>
    </Container>
  ) : (
    <Container>
      <Card>
        <Link to="/">Page not found - Back to Home</Link>
      </Card>
    </Container>
  );
}

export default SinglePost;
