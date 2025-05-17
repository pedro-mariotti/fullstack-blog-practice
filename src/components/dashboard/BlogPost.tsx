import { FaTrash } from "react-icons/fa";
import PostEditorModal from "./PostEditorModal";

function BlogPost(props: {
  id: number;
  title: string;
  content: string;
  updatePosts: () => void;
}) {
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `https://backend-crud-practice-theta.vercel.app/protected/blog/${props.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.ok) {
        props.updatePosts();
      } else {
        console.error("Failed to delete the post");
      }
    } catch (error) {
      console.error("Error deleting the post:", error);
    }
  };

  return (
    <li className="mb-4 flex flex-col items-start justify-between rounded-lg bg-white p-6 shadow-md sm:flex-row sm:items-center">
      <div className="mb-4 sm:mr-4 sm:mb-0">
        <h1 className="mb-2 text-xl font-bold text-gray-800 sm:text-2xl">
          {props.title}
        </h1>
        <p className="text-sm text-gray-600 sm:text-base">{props.content}</p>
      </div>
      <div className="flex items-center space-x-2">
        <PostEditorModal updatePosts={props.updatePosts} postID={props.id} />
        <button
          onClick={handleDelete}
          className="cursor-pointer text-red-500 hover:text-red-700"
          aria-label="Delete post"
        >
          <FaTrash />
        </button>
      </div>
    </li>
  );
}

export default BlogPost;
