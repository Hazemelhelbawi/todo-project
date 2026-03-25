export async function uploadImageToCloudinary(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "todo_unsigned");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/damz6mq1e/image/upload",
    {
      method: "POST",
      body: formData,
    },
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error?.message || "Failed to upload image");
  }

  return data.secure_url;
}

export function getOptimizedImageUrl(url: string, width = 800): string {
  if (!url) return "";

  return url.replace("/upload/", `/upload/f_auto,q_auto,w_${width}/`);
}
