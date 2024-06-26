import React, { useContext, useState } from "react";
import { Context } from "../../context";

type Props = { img: string; title: string; arrCategory: string[] };

export default function ModalCategoriesItem({
  img,
  title,
  arrCategory,
}: Props) {
  const [isActive, setIsActive] = useState(false);
  const { arrCategoriesTypes, setArrCategoriesTypes } = useContext(Context);

  const addCategory = () => {
    if (isActive) {
      let tempArr = arrCategoriesTypes;
      arrCategory.forEach((item) => {
        if (arrCategoriesTypes.includes(item)) {
          let tempArr = arrCategoriesTypes;
          console.log(tempArr);

          tempArr = tempArr.splice(tempArr.indexOf(item), 1);
        }
      });
      setArrCategoriesTypes(tempArr);
    } else {
      setArrCategoriesTypes(arrCategoriesTypes.concat(arrCategory));
    }
    setIsActive(!isActive);
  };

  return (
    <div
      className="flex flex-col items-center cursor-pointer select-none"
      onClick={addCategory}
    >
      <div
        className={
          "mb-1 p-4 rounded-full transition-all " +
          (isActive ? "bg-gray-300" : "bg-gray-100")
        }
      >
        <img src={img} />
      </div>
      <p className="text-xs text-center font-medium">{title}</p>
    </div>
  );
}
