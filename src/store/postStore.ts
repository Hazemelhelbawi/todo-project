import { create } from "zustand";
import { postService } from "@/services/postService";
import { PostStore, CreatePost, UpdatePost } from "@/types/post";

export const usePostStore = create<PostStore>((set) => ({
  posts: [],
  loading: false,
  error: null,
  searchTerm: "",

  setSearchTerm: (term: string) => {
    set({ searchTerm: term });
  },
  fetchPosts: async () => {
    set({ loading: true, error: null });

    try {
      const data = await postService.getPosts();
      set({ posts: data, loading: false });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "Error",
        loading: false,
      });
    }
  },

  addPost: async (post: CreatePost) => {
    try {
      const newPost = await postService.addPost(post);

      set((state) => ({
        posts: [...state.posts, newPost],
      }));
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "Error",
      });
    }
  },

  deletePost: async (id: number) => {
    try {
      await postService.deletePost(id);

      set((state) => ({
        posts: state.posts.filter((p) => p.id !== id),
      }));
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "Error",
      });
    }
  },

  updatePost: async (post: UpdatePost) => {
    try {
      const updated = await postService.updatePost(post);

      set((state) => ({
        posts: state.posts.map((p) => (p.id === post.id ? updated : p)),
      }));
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "Error",
      });
    }
  },
}));
