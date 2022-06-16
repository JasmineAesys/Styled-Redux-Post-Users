import { useSelector, useDispatch } from "react-redux";
import { selectAllPosts } from "./postsSlice";
import { Card } from "../../styled/Card";
import { Container } from "../../styled/Container";
import { CardTitle } from "../../styled/CardTitle";
import { CardContent } from "../../styled/CardContent";
import { CardAuthor } from "../../styled/CardAuthor";
import { allUsers } from "../users/usersSlice";
import { parseISO, formatDistanceToNow } from "date-fns";
import { AiTwotoneLike } from "react-icons/ai";
import { reactionAdd } from "./postsSlice";
import { Link } from "react-router-dom";

function PostList() {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const users = useSelector(allUsers);
  const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));

  return (
    <Container>
      {orderedPosts.map((post) => (
        <Card key={post.id}>
          <Link to={`/post/${post.id}`}>
            <CardTitle>{post.title}</CardTitle>
          </Link>
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
      ))}
    </Container>
  );
}

export default PostList;
