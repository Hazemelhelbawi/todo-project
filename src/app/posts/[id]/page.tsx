// import Image from "next/image";
// import { notFound } from "next/navigation";

// const API_URL = "http://localhost:3001/posts";

// async function getPost(id: string) {
//   const res = await fetch(`${API_URL}/${id}`, {
//     cache: "no-store",
//   });

//   if (!res.ok) return null;
//   return res.json();
// }

// export default async function PostDetails({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const { id } = await params;
//   const post = await getPost(id);

//   if (!post) return notFound();

//   return (
//     <div className="max-w-2xl mx-auto mt-10 p-4">
//       {post.image && (
//         <Image
//           src={post.image}
//           alt={post.title}
//           className="w-full h-60 object-cover rounded mb-4"
//           width={500}
//           height={300}
//         />
//       )}

//       <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
//       <p className="text-gray-500 mb-4">{post.description}</p>
//       <p>{post.content}</p>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { notFound, useParams } from "next/navigation";
import { postService } from "@/services/postService";
import { Post } from "@/types/post";
import Image from "next/image";

export default function PostDetails() {
  const params = useParams();
  const id = params.id as string;

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const data = await postService.getPost(id);
        if (!data) {
          setMissing(true);
        } else {
          setPost(data);
        }
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [id]);

  if (loading) {
    return <div className="mx-auto mt-10 max-w-2xl p-4">Loading...</div>;
  }

  if (missing || !post) {
    return notFound();
  }

  return (
    <div className="mx-auto mt-10 max-w-2xl p-4">
      {post.image && (
        <Image
          width={500}
          height={300}
          src={post.image}
          alt={post.title}
          className="mb-4 h-60 w-full rounded object-cover"
        />
      )}

      <h1 className="mb-2 text-3xl font-bold text-black">{post.title}</h1>
      <p className="mb-4 text-gray-500">{post.description}</p>
      <p className="whitespace-pre-line text-black">{post.content}</p>
    </div>
  );
}
