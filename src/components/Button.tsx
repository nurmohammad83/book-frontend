import { ButtonHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface IColors {
  [key: string]: string;
}

interface IVariants {
  [key: string]: string;
}

interface IProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  disabled?: boolean;
  color?: keyof IColors;
  variant?: keyof IVariants;
  children: ReactNode;
  className?: string;
}

const Button: React.FC<IProps> = ({
  disabled = false,
  color = "primary",
  variant = "filled",
  children,
  className,
  ...props
}) => {
  const colors: IColors = {
    primary: "hover:bg-blue-600 bg-blue-500",
    danger: "hover:bg-red-600 bg-red-500",
    success: "hover:bg-yellow-600 bg-yellow-500",
  };

  const variants: IVariants = {
    filled: "",
    outlined: "border bg-transparent text-black",
  };

  return (
    <button
    className={twMerge(
      "flex items-center px-4 py-2 text-white rounded",
      colors[color],
      variants[variant],
      className
      )}
      {...props}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
