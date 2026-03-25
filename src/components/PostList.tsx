"use client";

import { usePostStore } from "../store/postStore";
import AppCard from "@/ui/AppCard";

export default function PostList() {
  const { posts, loading, error, deletePost, updatePost, searchTerm } =
    usePostStore();

  const filteredPosts = posts.filter((post) => {
    const term = searchTerm.toLowerCase();

    return (
      post.title.toLowerCase().includes(term) ||
      post.description.toLowerCase().includes(term) ||
      post.content.toLowerCase().includes(term)
    );
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className=" grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredPosts.map((post) => (
        <AppCard
          key={post.id}
          {...post}
          onDelete={deletePost}
          onEdit={updatePost}
        />
      ))}
    </div>
  );
}
