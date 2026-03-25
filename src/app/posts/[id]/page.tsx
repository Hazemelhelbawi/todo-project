import Image from "next/image";
import { notFound } from "next/navigation";

const API_URL = "http://localhost:3001/posts";

async function getPost(id: string) {
  const res = await fetch(`${API_URL}/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json();
}

export default async function PostDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) return notFound();

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4">
      {post.image && (
        <Image
          src={post.image}
          alt={post.title}
          className="w-full h-60 object-cover rounded mb-4"
          width={500}
          height={300}
        />
      )}

      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-gray-500 mb-4">{post.description}</p>
      <p>{post.content}</p>
    </div>
  );
}
