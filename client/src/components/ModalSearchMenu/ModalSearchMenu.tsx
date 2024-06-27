import { useState } from "react";
import i_search from "@/assets/i_search.png";
import i_close12 from "@/assets/i_close12.png";
import i_close24 from "@/assets/i_close24.png";
import ModalSearchMenuCategories from "../ModalSearchMenuCategories/ModalSearchMenuCategories";

type Props = {
  modalSearchMenu: boolean;
  setModalSearchMenu: () => void;
};

export default function ModalSearchMenu({
  modalSearchMenu,
  setModalSearchMenu,
}: Props) {
  const [inputSearch, setInputSearch] = useState("");
  const [inputRadius, setInputRadius] = useState(1000);
  const [isClose, setIsClose] = useState(false);

  const inputChange = (e) => {
    if (e.target.value) {
      setIsClose(true);
    } else {
      setIsClose(false);
    }
    setInputSearch(e.target.value);
  };

  const inputRadiusChange = (e) => {
    setInputRadius(e.target.value);
  };

  const buttonClick = () => {
    setIsClose(false);
    setInputSearch("");
  };

  return (
    <div
      className={
        "w-full h-full absolute top-0 left-0 z-[70] transition-all duration-200 " +
        (modalSearchMenu ? "opacity-100" : "opacity-0 pointer-events-none")
      }
      onClick={() => {
        setModalSearchMenu();
      }}
    >
      <div className="relative w-full h-full ">
        <div
          className={
            "w-full h-full absolute top-0 left-0 bg-black/50 transition-all duration-200 " +
            (modalSearchMenu ? "" : "")
          }
        ></div>

        <div
          className={
            "absolute bottom-0 left-1/2 -translate-x-1/2 w-full sm:min-w-96 sm:max-w-lg h-[90%] flex flex-col bg-white py-4 px-4 rounded-t-xl transition-all duration-200 " +
            (modalSearchMenu ? "translate-y-0" : "translate-y-full")
          }
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between -mx-3">
            <button
              className="flex justify-center items-center h-10 w-10"
              onClick={setModalSearchMenu}
            >
              <img className="i_img" src={i_search} alt="Поиск" />
            </button>

            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Поиск"
                className="w-full rounded-lg py-2 px-4 text-sm border border-gray-300 bg-gray-100 text-black font-medium caret-blue-500"
                onChange={(e) => inputChange(e)}
                value={inputSearch}
              />
              <button
                className={
                  "absolute mr-2 p-1 top-1/2 right-0 -translate-y-1/2 z-20 bg-gray-600 rounded-md transition duration-75 cursor-pointer " +
                  (isClose ? "opacity-100" : "opacity-0")
                }
                onClick={buttonClick}
              >
                <img src={i_close12} />
              </button>
            </div>

            <button
              className="flex justify-center items-center h-10 w-10"
              onClick={setModalSearchMenu}
            >
              <img src={i_close24} />
            </button>
          </div>

          <div>
            <p className="mt-3 text-sm font-semibold">Радиус, м.</p>

            <input
              type="number"
              placeholder="Радиус"
              className="max-w-20 no-arrows mt-3 rounded-lg py-2 px-4 text-xs border border-gray-300 bg-gray-100 text-black font-medium caret-blue-500"
              onChange={(e) => inputRadiusChange(e)}
              value={inputRadius}
            />
          </div>

          <div>
            <p className="mt-3 text-sm font-semibold">Категории</p>

            <ModalSearchMenuCategories />
          </div>
        </div>
      </div>
    </div>
  );
}
