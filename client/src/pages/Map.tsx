import { useState } from "react";
import i_center from "../assets/i_center.png";
import i_plus from "../assets/i_plus.png";
import i_minus from "../assets/i_minus.png";
import i_search from "../assets/i_search.png";
import i_point from "../assets/i_minus.png";
import i_profile from "../assets/i_profile.png";
import i_fav from "../assets/i_fav.png";
import i_favout from "../assets/i_favout.png";
import i_close12 from "../assets/i_close12.png";
import i_logout from "../assets/i_logout.png";
import Loader from "../components/Loader";

export default function Map() {
  const [inputSearch, setInputSearch] = useState("");
  const [isClose, setIsClose] = useState(false);
  const [modalLogout, setModalLogout] = useState(false);

  return (
    <>
      <div className="wrapper relative">
        <div className="container h-full p-2 relative">
          <div className="nav w-full h-full relative z-10">
            <button
              className="absolute top-0 left-0 flex justify-center items-center bg-white/85 rounded-xl h-10 w-10"
              onClick={() => setModalLogout(true)}
            >
              <img className="i_img" src={i_logout} alt="Профиль" />
            </button>

            <div className="absolute bottom-10 right-0 mb-6 flex flex-col gap-2 items-center">
              <button className="flex justify-center items-center bg-white/85 rounded-xl h-10 w-10">
                <img className="i_img" src={i_plus} alt="Увеличить масштаб" />
              </button>
              <button className="flex justify-center items-center bg-white/85 rounded-xl h-10 w-10">
                <img className="i_img" src={i_minus} alt="Уменьшить масштаб" />
              </button>

              <button className="flex justify-center items-center mt-2 bg-white/85 rounded-full h-11 w-11">
                <img
                  className="i_img"
                  src={i_center}
                  alt="Центрировать на метке"
                />
              </button>
            </div>
          </div>
        </div>

        <div className="map h-full w-full absolute top-0 left-0 z-0 bg-slate-400"></div>

        {/* нижнее меню */}
        <div className="w-full py-2 absolute bottom-0 right-0 z-40 bg-white flex items-center rounded-t-xl">
          <button className="flex justify-center items-center h-10 w-10">
            <img className="i_img" src={i_search} alt="Поиск" />
          </button>

          <div className="relative flex-grow">
            <input
              type="text"
              className="w-full rounded-lg py-2 px-4 text-sm bg-gray-300 text-black font-semibold caret-blue-700"
              onChange={(e) => {
                if (e.target.value) {
                  setInputSearch(e.target.value);
                  setIsClose(true);
                } else {
                  setInputSearch(e.target.value);
                  setIsClose(false);
                }
              }}
              value={inputSearch}
            />
            <button
              className={
                "absolute mr-2 p-1 top-1/2 right-0 -translate-y-1/2 z-20 bg-gray-600 rounded-md transition duration-75 cursor-pointer " +
                (isClose ? "opacity-100" : "opacity-0")
              }
              onClick={() => {
                setIsClose(false);
                setInputSearch("");
              }}
            >
              <img src={i_close12} />
            </button>
          </div>

          <button className="flex justify-center items-center h-10 w-10">
            <img className="i_img" src={i_favout} alt="Избранное" />
          </button>
        </div>

        {/* модальное окно выхода*/}
        <div
          className={
            "w-full h-full flex justify-center items-center absolute top-0 left-0 z-50 transition-opacity duration-100 bg-black/50 " +
            (modalLogout
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none")
          }
          onClick={() => setModalLogout(false)}
        >
          <div
            className="px-8 py-4 flex flex-col items-center bg-white rounded-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="font-semibold text-sm mb-6">Вы хотите выйти?</p>

            <div className="w-full flex justify-around items-center">
              <button
                className="bg-gray-300 w-14 py-2 text-sm font-semibold rounded-lg"
                onClick={() => setModalLogout(false)}
              >
                Да
              </button>
              <button
                className="bg-gray-300 w-14 py-2 text-sm font-semibold rounded-lg"
                onClick={() => {
                  setModalLogout(false);
                  //Logout
                }}
              >
                Нет
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
