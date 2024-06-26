import { useState } from "react";

import i_close24 from "@/assets/i_close24.png";

import ModalFavorits_item from "../ModalFavoritsItem/ModalFavoritsItem";

export default function ModalFavorits({ modalFav, setModalFav }) {
  const [modalFavItem, setModalFavItem] = useState({
    img: "img",
    text: "Text 1",
    route: "",
    icons: [],
  });

  return (
    <div
      className={
        "w-full h-full absolute top-0 left-0 z-[60] transition-all duration-200 " +
        (modalFav ? "opacity-100" : "opacity-0 pointer-events-none")
      }
      onClick={setModalFav}
    >
      <div className="relative w-full h-full ">
        <div
          className={
            "w-full h-full absolute top-0 left-0 bg-black/50 transition-all duration-200 " +
            (modalFav ? "" : "")
          }
        ></div>

        <div
          className={
            "absolute bottom-0 left-1/2 -translate-x-1/2 w-full sm:min-w-96 sm:max-w-lg h-[90%] flex flex-col bg-white px-4 py-4 rounded-t-xl transition-all duration-200 " +
            (modalFav ? "translate-y-0" : "translate-y-full")
          }
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-2">
            <p className="font-semibold">Избранное</p>

            <div className="-mr-1 cursor-pointer" onClick={setModalFav}>
              <img src={i_close24} />
            </div>
          </div>{" "}
          {/*Исправить нажатие кнопки "Добавить в Избранное"*/}
          <div className="flex flex-col items-center overflow-scroll">
            <ModalFavorits_item />
            <ModalFavorits_item />
          </div>
        </div>
      </div>
    </div>
  );
}
