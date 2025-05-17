function BlogPost(props: { title: string; content: string }) {
  return (
    <li>
      <h1>{props.title}</h1>
      <p>{props.content}</p>
    </li>
  );
}
export default BlogPost;
