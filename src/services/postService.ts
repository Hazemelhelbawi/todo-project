import { CreatePost, Post, UpdatePost } from "@/types/post";

const API_URL = "http://localhost:3001/posts";

export const postService = {
  getPosts: async (): Promise<Post[]> => {
    const res = await fetch(API_URL);
    return res.json();
  },

  addPost: async (post: CreatePost): Promise<Post> => {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });

    return res.json();
  },

  deletePost: async (id: number): Promise<void> => {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
  },

  updatePost: async (post: UpdatePost): Promise<Post> => {
    const res = await fetch(`${API_URL}/${post.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });

    return res.json();
  },
};
