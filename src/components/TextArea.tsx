import React, { ChangeEvent } from "react";

interface TextInputProps {
  name?: string | undefined;
  placeholder?: string | undefined;
  value?: string | undefined;
  onChange?: ((e: ChangeEvent<HTMLTextAreaElement>) => void) | undefined;
}

const TextArea: React.FC<TextInputProps> = ({ ...props }: TextInputProps) => {
  return (
    <textarea
      {...props}
      className="w-full p-2 border border-gray-300 rounded"
    ></textarea>
  );
};
export default TextArea;
