"use client";

import { useState } from "react";
import Image from "next/image";
import { usePostStore } from "@/store/postStore";
import {
  uploadImageToCloudinary,
  getOptimizedImageUrl,
} from "@/services/cloudinaryService";
import AppInput from "@/ui/AppInput";
import AppButton from "@/ui/AppButton";

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

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    if (!form.title.trim()) return;

    try {
      setUploading(true);

      let imageUrl = form.image;

      if (selectedFile) {
        const uploadedUrl = await uploadImageToCloudinary(selectedFile);
        imageUrl = getOptimizedImageUrl(uploadedUrl, 800);
      }

      await addPost({
        ...form,
        image: imageUrl,
      });

      setForm({
        title: "",
        description: "",
        content: "",
        image: "",
      });

      setSelectedFile(null);
      setPreviewUrl("");
      onSuccess?.();
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      {previewUrl && (
        <Image
          width={500}
          height={300}
          src={previewUrl}
          alt="preview"
          className="h-40 w-full rounded-xl object-cover"
          unoptimized
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
        className="rounded-xl bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
        onClick={handleSubmit}
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Save Post"}
      </AppButton>
    </div>
  );
}
