import { AppButtonProps } from "@/types/post";

const AppButton = ({
  children,
  className = "bg-blue-500 text-white p-2 rounded",
  onClick,
  type = "submit",
  disabled = false,
}: AppButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={className}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default AppButton;
