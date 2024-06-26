import React from "react";

type Props = { img: string; title: string };

export default function ModalCategoriesItem({ img, title }: Props) {
  return (
    <div className="flex flex-col items-center">
      <div className="mb-1 p-4 bg-gray-200 rounded-full">
        <img src={img} />
      </div>
      <p className="text-sm font-medium">{title}</p>
    </div>
  );
}
