import { useContext } from "react";
import i_search from "@/assets/i_search.png";
import i_close24 from "@/assets/i_close24.png";
import ModalSearchMenuCategories from "../ModalSearchMenuCategories/ModalSearchMenuCategories";
import { Context } from "../../context";
import InputSearchMenu from "../InputSearchMenu/InputSearchMenu";

type Props = {};

export default function ModalSearchMenu({}: Props) {
  const { inputRadius, setInputRadius, modalSearchMenu, setModalSearchMenu } =
    useContext(Context);

  const inputRadiusChange = (e) => {
    setInputRadius(Number(e.target.value));
  };

  const toggleSetModalSearchMenu = () => {
    setModalSearchMenu(!modalSearchMenu);
  };

  return (
    <div
      className={
        "w-full h-full absolute top-0 left-0 z-[70] transition-all duration-200 " +
        (modalSearchMenu ? "opacity-100" : "opacity-0 pointer-events-none")
      }
      onClick={toggleSetModalSearchMenu}
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
          <div className="flex items-center justify-between">
            <button
              className="flex justify-center items-center pr-2"
              onClick={toggleSetModalSearchMenu}
            >
              <img className="i_img" src={i_search} alt="Поиск" />
            </button>

            <InputSearchMenu />

            <button
              className="flex justify-center items-center pl-2"
              onClick={toggleSetModalSearchMenu}
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
