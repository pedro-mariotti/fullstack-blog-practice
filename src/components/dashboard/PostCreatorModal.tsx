import { useState } from "react";

function PostCreatorModal(props: { updatePosts: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const postData = { title, content };
    const token = localStorage.getItem("authToken");

    try {
      const response = await fetch(
        "https://backend-crud-practice-theta.vercel.app/protected/blog",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(postData),
        },
      );

      if (response.ok) {
        console.log("Post created successfully");
        setTitle("");
        setContent("");
        toggleModal();
        props.updatePosts();
      } else {
        console.error("Failed to create post");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <button
        onClick={toggleModal}
        className="cursor-pointer rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Create Post
      </button>

      {isOpen && (
        <div
          className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black"
          onClick={toggleModal}
        >
          <div
            className="w-96 transform rounded-lg bg-white p-6 shadow-lg transition-opacity duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="mb-4 text-xl font-semibold">Create a New Post</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="mb-1 block text-sm font-medium"
                  htmlFor="title"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded border px-3 py-2 focus:ring focus:ring-blue-300 focus:outline-none"
                />
              </div>
              <div className="mb-4">
                <label
                  className="mb-1 block text-sm font-medium"
                  htmlFor="content"
                >
                  Content
                </label>
                <textarea
                  id="content"
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full rounded border px-3 py-2 focus:ring focus:ring-blue-300 focus:outline-none"
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={toggleModal}
                  className="mr-2 cursor-pointer rounded bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="cursor-pointer rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default PostCreatorModal;
