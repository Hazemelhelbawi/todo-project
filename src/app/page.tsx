"use client";

import { useEffect, useState } from "react";
import { usePostStore } from "../store/postStore";
import AddPost from "../components/AddPost";
import PostList from "../components/PostList";
import AppInput from "@/ui/AppInput";
import AppButton from "@/ui/AppButton";
import AppModal from "@/ui/AppModal";

export default function Home() {
  const fetchPosts = usePostStore((state) => state.fetchPosts);
  // const fetchPosts = usePostStore((state) => state.fetchPosts);
  const searchTerm = usePostStore((state) => state.searchTerm);
  const setSearchTerm = usePostStore((state) => state.setSearchTerm);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <main className="max-w-7xl mx-auto mt-20 p-4">
      <h1 className="text-3xl font-bold mb-6">Todo App</h1>
      {/* 
      <AddPost /> */}

      <div className="mb-6 max-w-2xl mx-auto flex items-center justify-between gap-x-6">
        <AppButton
          type="button"
          className="shrink-0 whitespace-nowrap rounded-xl bg-blue-600 px-10 py-2 text-white"
          onClick={() => setIsModalOpen(true)}
        >
          Add Post
        </AppButton>

        <AppInput
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-xl bg-red-500 border border-gray-300 p-3 text-white outline-none"
        />
      </div>
      <PostList />
      <AppModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Post"
      >
        <AddPost onSuccess={() => setIsModalOpen(false)} />
      </AppModal>
    </main>
  );
}
