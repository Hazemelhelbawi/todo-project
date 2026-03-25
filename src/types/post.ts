export type Post = {
  id: number;
  title: string;
  description: string;
  content: string;
  image?: string;
};

export type CreatePost = {
  title: string;
  description: string;
  content: string;
  image?: string;
};

export type PostState = {
  posts: Post[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
};

export type PostActions = {
  fetchPosts: () => Promise<void>;
  addPost: (post: CreatePost) => Promise<void>;
  deletePost: (id: number) => Promise<void>;
  updatePost: (post: UpdatePost) => Promise<void>;
  setSearchTerm: (term: string) => void;
};

export type PostStore = PostState & PostActions;

export type PostService = {
  getPosts: () => Promise<Post[]>;
  addPost: (post: CreatePost) => Promise<Post>;
  deletePost: (id: number) => Promise<void>;
};

// export type AppButtonProps = {
//   children: React.ReactNode;
//   className?: string;
//   onClick?: () => void;
//   type?: "button" | "submit" | "reset" | undefined;
//   disabled?: boolean;
// };

export type AppButtonProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

export type AppInputProps = {
  placeholder?: string;
  value?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  accept?: string;
  type?: string;
};

export type AppCardProps = {
  image?: string;
  id: number;
  title: string;
  description: string;
  content: string;
  onDelete?: (id: number) => void;
  onEdit?: (post: UpdatePost) => void;
};

export type AppModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
};

export type AddPostProps = {
  onSuccess?: () => void;
};

export type UpdatePost = CreatePost & {
  id: number;
};

// export type Store = PostState & PostActions;

// export type UsePostStore = () => PostStore;

// export type UsePostService = () => PostService;

// export type UseStore = () => Store;

// export type UsePostStoreActions = () => PostActions;

// export type UsePostStoreState = () => PostState;
