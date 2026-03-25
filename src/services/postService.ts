// import { CreatePost, Post, UpdatePost } from "@/types/post";

// const API_URL = "http://localhost:3001/posts";

// export const postService = {
//   getPosts: async (): Promise<Post[]> => {
//     const res = await fetch(API_URL);
//     return res.json();
//   },

//   addPost: async (post: CreatePost): Promise<Post> => {
//     const res = await fetch(API_URL, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(post),
//     });

//     return res.json();
//   },

//   deletePost: async (id: number): Promise<void> => {
//     await fetch(`${API_URL}/${id}`, {
//       method: "DELETE",
//     });
//   },

//   updatePost: async (post: UpdatePost): Promise<Post> => {
//     const res = await fetch(`${API_URL}/${post.id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(post),
//     });

//     return res.json();
//   },
// };
import { CreatePost, Post, PostService, UpdatePost } from "@/types/post";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const STORAGE_KEY = "posts";

const localStorageService: PostService = {
  getPosts: async (): Promise<Post[]> => {
    if (typeof window === "undefined") return [];

    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  getPost: async (id: string): Promise<Post | null> => {
    if (typeof window === "undefined") return null;

    const data = localStorage.getItem(STORAGE_KEY);
    const posts: Post[] = data ? JSON.parse(data) : [];

    return posts.find((post) => post.id === Number(id)) || null;
  },

  addPost: async (post: CreatePost): Promise<Post> => {
    if (typeof window === "undefined") {
      throw new Error("localStorage is not available");
    }

    const data = localStorage.getItem(STORAGE_KEY);
    const posts: Post[] = data ? JSON.parse(data) : [];

    const newPost: Post = {
      id: Date.now(),
      ...post,
    };

    const updatedPosts = [...posts, newPost];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPosts));

    return newPost;
  },

  deletePost: async (id: number): Promise<void> => {
    if (typeof window === "undefined") return;

    const data = localStorage.getItem(STORAGE_KEY);
    const posts: Post[] = data ? JSON.parse(data) : [];

    const updatedPosts = posts.filter((post) => post.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPosts));
  },

  updatePost: async (post: UpdatePost): Promise<Post> => {
    if (typeof window === "undefined") {
      throw new Error("localStorage is not available");
    }

    const data = localStorage.getItem(STORAGE_KEY);
    const posts: Post[] = data ? JSON.parse(data) : [];

    const updatedPosts = posts.map((p) => (p.id === post.id ? post : p));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPosts));

    return post;
  },
};

const apiService: PostService = {
  getPosts: async (): Promise<Post[]> => {
    const res = await fetch(API_URL!, { cache: "no-store" });

    if (!res.ok) {
      throw new Error("Failed to fetch posts");
    }

    return res.json();
  },

  getPost: async (id: string): Promise<Post | null> => {
    const res = await fetch(`${API_URL}/${id}`, { cache: "no-store" });

    if (!res.ok) return null;

    return res.json();
  },

  addPost: async (post: CreatePost): Promise<Post> => {
    const res = await fetch(API_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });

    if (!res.ok) {
      throw new Error("Failed to add post");
    }

    return res.json();
  },

  deletePost: async (id: number): Promise<void> => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("Failed to delete post");
    }
  },

  updatePost: async (post: UpdatePost): Promise<Post> => {
    const res = await fetch(`${API_URL}/${post.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });

    if (!res.ok) {
      throw new Error("Failed to update post");
    }

    return res.json();
  },
};

export const postService: PostService = API_URL
  ? apiService
  : localStorageService;
