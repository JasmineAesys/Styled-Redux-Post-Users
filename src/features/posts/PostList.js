import { useSelector } from "react-redux";
import { selectAllPosts } from "./postsSlice";
import { Card } from "../../styled/Card";
import { Container } from "../../styled/Container";
import { CardTitle } from "../../styled/CardTitle";
import { CardContent } from "../../styled/CardContent";
import { CardAuthor } from "../../styled/CardAuthor";
import { allUsers } from "../users/usersSlice";
import { parseISO, formatDistanceToNow } from "date-fns";
function PostList() {
  const posts = useSelector(selectAllPosts);
  const users = useSelector(allUsers);
  const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));

  return (
    <Container>
      {orderedPosts.map((post) => (
        <Card key={post.id}>
          <CardTitle>{post.title}</CardTitle>
          <CardContent>{post.content}</CardContent>
          <CardAuthor>by {users[post.user] ? users[post.user].name : "Anonimous"}</CardAuthor>
          {post.date ? formatDistanceToNow(parseISO(post.date)) + " ago" : ""}
        </Card>
      ))}
    </Container>
  );
}

export default PostList;
