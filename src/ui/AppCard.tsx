import { useState } from "react";
import { AppCardProps } from "@/types/post";
import AppButton from "./AppButton";
import AppInput from "./AppInput";
import Image from "next/image";
import Link from "next/link";

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

  const [form, setForm] = useState({
    title,
    description,
    content,
    image,
  });

  const handleSave = () => {
    onEdit?.({
      id,
      ...form,
    });

    setIsEditing(false);
  };

  return (
    <div className="bg-white text-black rounded-2xl shadow-lg p-5">
      {isEditing ? (
        <>
          {form.image && (
            <Image
              alt="image"
              width={200}
              height={200}
              src={form.image}
              className="w-full h-32 object-contain rounded mb-2"
            />
          )}
          <div className="flex flex-col pb-2 gap-4">
            <AppInput
              className="w-full rounded-xl border border-gray-300 p-3  outline-none"
              type="file"
              accept="image/*"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
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
              }}
            />

            <AppInput
              className="w-full rounded-xl border border-gray-300 p-3  outline-none"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <AppInput
              className="w-full rounded-xl border border-gray-300 p-3  outline-none"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
            <AppInput
              className="w-full rounded-xl border border-gray-300 p-3  outline-none"
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
            />
          </div>

          <div className=" flex items-center justify-between">
            <AppButton
              className="bg-green-500 text-white px-3 py-1 mr-2"
              onClick={handleSave}
            >
              {" "}
              Save
            </AppButton>
            <AppButton
              className="bg-amber-500 text-white px-3 py-1 mr-2"
              onClick={() => setIsEditing(false)}
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
                className="w-full h-40 object-contain rounded mb-3"
              />
            )}
            <h3 className="text-lg font-bold text-black">{title}</h3>
            <p className="text-sm text-black">{description}</p>
            <p className="text-sm text-black">{content}</p>
          </Link>
          <div className="flex justify-end gap-2 mt-4">
            <AppButton onClick={() => setIsEditing(true)}>✏️</AppButton>

            <AppButton onClick={() => onDelete?.(id)}>🗑️</AppButton>
          </div>
        </>
      )}
    </div>
  );
};

export default AppCard;
