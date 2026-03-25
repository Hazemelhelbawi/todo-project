import { AppInputProps } from "@/types/post";

const AppInput = ({
  placeholder,
  value,
  onChange,
  className = "border p-2 w-full",
  accept,
  type,
}: AppInputProps) => {
  return (
    <input
      className={className}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      accept={accept}
      type={type}
    />
  );
};

export default AppInput;
