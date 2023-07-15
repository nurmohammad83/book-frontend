import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface IColors {
  [key: string]: string;
}

interface IVariants {
  [key: string]: string;
}

interface IProps {
    disabled?:boolean
  type?: "button" | "submit" | "reset" | undefined;
  color?: keyof IColors;
  variant?: keyof IVariants;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

const Button = ({
disabled = false,
  type,
  color = "primary",
  variant = "filled",
  children,
  className,
}: IProps) => {
  const colors: IColors = {
    primary:
      "hover:bg-blue-600 bg-blue-500",
    danger:
      "hover:bg-red-600 bg-red-500",
    success:
      "hover:bg-yellow-600 bg-yellow-500",
  };

  const variants: IVariants = {
    filled: "",
    outlined: "border bg-transparent text-black",
  };

  return (
    <button
      type={type}
      className={twMerge(
        "flex items-center px-4 py-2  text-white rounded ",
        colors[color],
        variants[variant],
        className
      )}
      
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
