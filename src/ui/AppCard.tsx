import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AppCardProps } from "@/types/post";
import AppButton from "./AppButton";
import AppInput from "./AppInput";
import {
  uploadImageToCloudinary,
  getOptimizedImageUrl,
} from "@/services/cloudinaryService";

const AppCard = ({
  image,
  id,
  title,
  description,
  content,
  onDelete,
  onEdit,
}: AppCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState(image);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    title,
    description,
    content,
    image,
  });

  const handleSave = async () => {
    try {
      setUploading(true);

      let imageUrl = form.image;

      if (selectedFile) {
        const uploadedUrl = await uploadImageToCloudinary(selectedFile);
        imageUrl = getOptimizedImageUrl(uploadedUrl, 800);
      }

      await onEdit?.({
        id,
        ...form,
        image: imageUrl,
      });

      setForm((prev) => ({
        ...prev,
        image: imageUrl,
      }));

      setSelectedFile(null);
      setPreviewUrl(imageUrl);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      alert("Failed to update post image");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="rounded-2xl bg-white p-5 text-black shadow-lg">
      {isEditing ? (
        <>
          {previewUrl && (
            <Image
              alt="image"
              width={200}
              height={200}
              src={previewUrl}
              className="mb-2 h-32 w-full rounded object-contain"
              unoptimized
            />
          )}

          <div className="flex flex-col gap-4 pb-2">
            <AppInput
              className="w-full rounded-xl border border-gray-300 p-3 outline-none"
              type="file"
              accept="image/*"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const file = e.target.files?.[0];
                if (!file) return;

                setSelectedFile(file);
                setPreviewUrl(URL.createObjectURL(file));
              }}
            />

            <AppInput
              className="w-full rounded-xl border border-gray-300 p-3 outline-none"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <AppInput
              className="w-full rounded-xl border border-gray-300 p-3 outline-none"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />

            <AppInput
              className="w-full rounded-xl border border-gray-300 p-3 outline-none"
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
            />
          </div>

          <div className="flex items-center justify-between">
            <AppButton
              className="mr-2 bg-green-500 px-3 py-1 text-white"
              onClick={handleSave}
              disabled={uploading}
            >
              {uploading ? "Saving..." : "Save"}
            </AppButton>

            <AppButton
              className="mr-2 bg-amber-500 px-3 py-1 text-white"
              onClick={() => {
                setIsEditing(false);
                setPreviewUrl(form.image);
                setSelectedFile(null);
              }}
            >
              Cancel
            </AppButton>
          </div>
        </>
      ) : (
        <>
          <Link href={`/posts/${id}`}>
            {image && (
              <Image
                width={200}
                height={200}
                src={image}
                alt="post"
                className="mb-3 h-40 w-full rounded object-contain"
              />
            )}
            <h3 className="text-lg font-bold text-black">{title}</h3>
            <p className="text-sm text-black">{description}</p>
            <p className="text-sm text-black">{content}</p>
          </Link>

          <div className="mt-4 flex justify-end gap-2">
            <AppButton onClick={() => setIsEditing(true)}>✏️</AppButton>
            <AppButton onClick={() => onDelete?.(id)}>🗑️</AppButton>
          </div>
        </>
      )}
    </div>
  );
};

export default AppCard;
