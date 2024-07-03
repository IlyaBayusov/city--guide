import React from "react";

type Props = {
  inputName: object;
  placeholder: string;
  type: string;
};

export default function AuthInput({ inputName, placeholder, type }: Props) {
  return (
    <input
      className="md:min-w-60 px-4 py-2 text-sm font-medium text-v-black border-2 border-gray-300 rounded-lg"
      type={type}
      placeholder={placeholder}
      value={inputName.value}
      onChange={(e) => {
        inputName.onChange(e);
      }}
      onBlur={(e) => {
        inputName.onBlur(e);
      }}
    />
  );
}
