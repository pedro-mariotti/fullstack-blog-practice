"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BlogPost from "@/components/dashboard/BlogPost";
import Spinner from "@/components/dashboard/Spinner";
import PostCreatorModal from "@/components/dashboard/PostCreatorModal";
import NavBar from "@/components/dashboard/NavBar";

interface Post {
  postID: number;
  id: number;
  title: string;
  content: string;
}

function Dashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const fetchPosts = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        router.push("/?error=unauthorized"); // Pass query parameter
        return;
      }
      try {
        const response = await fetch(
          "https://backend-crud-practice-theta.vercel.app/protected/blog",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (!response.ok) {
          throw new Error("Unauthorized");
        }
        const data = await response.json();
        console.log("Fetched posts:", data.blogPosts); // Log the fetched posts
        setPosts(data.blogPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
        router.push("/?error=unauthorized");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [router]);

  const updatePosts = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    try {
      const response = await fetch(
        "https://backend-crud-practice-theta.vercel.app/protected/blog",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (!response.ok) {
        throw new Error("Failed to fetch updated posts");
      }
      const data = await response.json();
      setPosts(data.blogPosts);
    } catch (error) {
      console.error("Error updating posts:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    router.push("/");
  };

  return (
    <div className="flex h-screen w-screen flex-col bg-[#1e293b] text-[#0f172a]">
      <NavBar handleLogout={handleLogout} />
      <main className="flex flex-1 flex-col items-center justify-center gap-4 overflow-hidden bg-[#1e293b] p-4 text-[#0f172a]">
        <h1 className="text-2xl font-bold text-white sm:text-4xl">My posts</h1>
        <div className="flex w-full max-w-4xl flex-col items-center justify-center gap-4 rounded-2xl bg-[#f1f5f9] p-4 shadow-lg sm:p-8">
          {loading ? (
            <Spinner />
          ) : posts.length > 0 ? (
            <ul className="w-full list-none">
              {posts.map((post) => (
                <BlogPost
                  key={`post-${post.postID}`}
                  id={post.postID}
                  title={post.title}
                  content={post.content}
                  updatePosts={updatePosts}
                />
              ))}
            </ul>
          ) : (
            <p className="text-black">No posts available.</p>
          )}
          <PostCreatorModal updatePosts={updatePosts} />
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
