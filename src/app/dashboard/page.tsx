"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BlogPost from "@/components/blogpost";
import Spinner from "@/components/spinner";
import PostCreatorModal from "@/components/PostCreatorModal";

interface Post {
  id: number;
  title: string;
  content: string;
}

function Dashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for a valid token
    const token = localStorage.getItem("token"); // Replace with your token storage logic
    if (!token) {
      router.push("/login"); // Redirect to login page if no token
      return;
    }

    // Simulate fetching data from the backend
    async function fetchPosts() {
      try {
        const response = await fetch("/api/posts", {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the request
          },
        });
        if (!response.ok) {
          throw new Error("Unauthorized");
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
        router.push("/login"); // Redirect to login on error
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [router]);

  return (
    <div className="flex max-h-max min-h-screen w-screen flex-col items-center bg-[#1e293b] text-[#0f172a]">
      <nav className="w-full bg-white">
        <ul className="flex gap-4">
          <li>
            <p>
              Hello, <span>Username</span>!
            </p>
            <a href="/" className="text-white hover:text-blue-500">
              Log out
            </a>
          </li>
        </ul>
      </nav>
      <main className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-[#1e293b] text-[#0f172a]">
        <h1 className="text-4xl font-bold text-white">My posts</h1>
        <div className="flex w-1/2 flex-col items-center justify-center gap-4 rounded-2xl bg-[#f1f5f9] p-8">
          {loading ? (
            <Spinner />
          ) : posts.length > 0 ? (
            <ul>
              {posts.map((post) => (
                <BlogPost
                  key={post.id}
                  title={post.title}
                  content={post.content}
                />
              ))}
            </ul>
          ) : (
            <p className="text-black">No posts available.</p>
          )}
          <PostCreatorModal />
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
