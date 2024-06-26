import React from "react";
import i_eat from "@/assets/i_eat.png";
import ModalCategoriesItem from "../ModalCategoriesItem/ModalCategoriesItem";

type Props = {};

export default function ModalSearchMenuCategories({}: Props) {
  return (
    <div className="overflow-y-auto no-scrollbar flex flex-wrap gap-y-3 justify-between w-full mt-3">
      <ModalCategoriesItem img={i_eat} title="Рестораны" />
      <ModalCategoriesItem img={i_eat} title="Рестораны" />
      <ModalCategoriesItem img={i_eat} title="Рестораны" />
      <ModalCategoriesItem img={i_eat} title="Рестораны" />
    </div>
  );
}
