"use client";

import { useState } from "react";
import { usePostStore } from "@/store/postStore";
import AppInput from "@/ui/AppInput";
import AppButton from "@/ui/AppButton";
import Image from "next/image";

type AddPostProps = {
  onSuccess?: () => void;
};

export default function AddPost({ onSuccess }: AddPostProps) {
  const addPost = usePostStore((state) => state.addPost);

  const [form, setForm] = useState({
    title: "",
    description: "",
    content: "",
    image: "",
  });

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setForm((prev) => ({
        ...prev,
        image: reader.result as string,
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (!form.title.trim()) return;

    await addPost(form);

    setForm({
      title: "",
      description: "",
      content: "",
      image: "",
    });

    onSuccess?.();
  };

  return (
    <div className="space-y-4">
      {form.image && (
        <Image
          width={500}
          height={300}
          src={form.image}
          alt="preview"
          className="h-40 w-full rounded-xl object-cover"
        />
      )}

      <AppInput
        type="text"
        placeholder="Title"
        value={form.title}
        className="w-full rounded-xl border p-3 text-black"
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <AppInput
        type="text"
        placeholder="Description"
        value={form.description}
        className="w-full rounded-xl border p-3 text-black"
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <AppInput
        type="text"
        placeholder="Content"
        value={form.content}
        className="w-full rounded-xl border p-3 text-black"
        onChange={(e) => setForm({ ...form, content: e.target.value })}
      />

      <AppInput
        type="file"
        accept="image/*"
        className="w-full rounded-xl border p-3 text-black"
        onChange={handleImage}
      />

      <AppButton
        type="button"
        className="rounded-xl bg-blue-600 px-4 py-2 text-white"
        onClick={handleSubmit}
      >
        Save Post
      </AppButton>
    </div>
  );
}
