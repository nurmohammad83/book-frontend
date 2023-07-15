import React, { ChangeEvent } from "react";

interface TextInputProps {
  type?: string;
  id?:string;
  name?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: React.FC<TextInputProps> = ({
  type,
  ...props
}: TextInputProps) => {
  return (
    <div>
      <div className="relative">
        <input
          type={type}
          {...props}
          className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
          required
        />
      </div>
    </div>
  );
};

export default TextInput;
