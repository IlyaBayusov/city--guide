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
import i_close24 from "../assets/i_close24.png";
import i_logout from "../assets/i_logout.png";
import Loader from "../components/Loader";
import img_fav1 from "../assets/img_fav1.png";

export default function Map() {
  const [inputSearch, setInputSearch] = useState("");
  const [isClose, setIsClose] = useState(false);
  const [modalLogout, setModalLogout] = useState(false);
  const [modalFav, setModalFav] = useState(false);
  const [isFav, setIsFav] = useState(false);

  return (
    <>
      <div className="wrapper relative">
        {" "}
        {/*Исправить контейнер при горизонте*/}
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
        {/* -------------------- */}
        {/* нижнее меню */}
        {/* -------------------- */}
        <div className="w-full py-2 absolute bottom-0 right-0 z-40 bg-white flex items-center rounded-t-xl">
          <button className="flex justify-center items-center h-10 w-10">
            <img className="i_img" src={i_search} alt="Поиск" />
          </button>

          <div className="relative flex-grow">
            <input
              type="text"
              className="w-full rounded-lg py-2 px-4 text-sm bg-gray-300 text-black font-semibold caret-blue-500"
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

          <button
            className="flex justify-center items-center h-10 w-10"
            onClick={() => {
              setModalFav(true);
            }}
          >
            <img className="i_img" src={i_favout} alt="Избранное" />
          </button>
        </div>
        {/* -------------------- */}
        {/* модальное окно избранных */}
        {/* -------------------- */}
        <div
          className={
            "w-full h-full absolute top-0 left-0 z-[60] transition-all duration-200 " +
            (modalFav ? "opacity-100" : "opacity-0 pointer-events-none")
          }
          onClick={() => {
            setModalFav(false);
          }}
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
                "absolute bottom-0 left-0 w-full h-[90%] flex flex-col bg-white px-4 py-4 rounded-t-xl transition-all duration-200 " +
                (modalFav ? "translate-y-0" : "translate-y-full")
              }
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-2">
                <p className="font-semibold">Избранное</p>

                <div
                  className="-mr-1"
                  onClick={() => {
                    setModalFav(false);
                  }}
                >
                  <img src={i_close24} />
                </div>
              </div>{" "}
              {/*Исправить нажатие кнопки "Добавить в Избранное"*/}
              <div className="list-item flex flex-col items-center overflow-scroll">
                <div className="item w-full mb-3 px-3 py-3 border-2 border-gray-300 rounded-xl">
                  <div className="flex justify-center mb-3">
                    <img src={img_fav1} alt="" className="rounded-md" />
                  </div>

                  <div className="flex flex-col">
                    <p className="text-xs font-medium mb-3">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Doloribus, ratione mollitia omnis exercitationem
                      consectetur voluptatibus obcaecati nesciunt! Error
                      molestias voluptatibus eius. Culpa necessitatibus earum
                      officiis saepe natus corporis ut non!
                    </p>

                    <div className="flex justify-between items-center">
                      <button
                        className="relative p-2 border-2 border-gray-300 rounded-md"
                        onClick={() => {
                          !isFav ? setIsFav(true) : setIsFav(false);
                        }}
                      >
                        <img
                          className={
                            "img-1 i_img transition-opacity " +
                            (isFav
                              ? "opacity-0 pointer-events-none"
                              : "opacity-100")
                          }
                          src={i_favout}
                          alt="Избранное"
                        />
                        <img
                          className={
                            "img-2 i_img absolute top-0 left-0 right-0 bottom-0 m-auto transition-opacity " +
                            (isFav
                              ? "opacity-100"
                              : "opacity-0 pointer-events-none")
                          }
                          src={i_fav}
                          alt="Избранное"
                        />
                      </button>
                      <button className="px-3 py-2 text-sm text-white font-medium bg-blue-600 rounded-md">
                        Маршрут
                      </button>
                    </div>
                  </div>
                </div>

                <div className="item w-full px-3 py-3 border-2 border-gray-300 rounded-xl">
                  <div className="flex justify-center mb-3">
                    <img src={img_fav1} alt="" className="rounded-md" />
                  </div>

                  <div className="flex flex-col">
                    <p className="text-xs font-medium mb-3">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Doloribus, ratione mollitia omnis exercitationem
                      consectetur voluptatibus obcaecati nesciunt! Error
                      molestias voluptatibus eius. Culpa necessitatibus earum
                      officiis saepe natus corporis ut non!
                    </p>

                    <div className="flex justify-between items-center">
                      <button
                        className="relative p-2 border-2 border-gray-300 rounded-md"
                        onClick={() => {
                          !isFav ? setIsFav(true) : setIsFav(false);
                        }}
                      >
                        <img
                          className={
                            "img-1 i_img transition-opacity " +
                            (isFav
                              ? "opacity-0 pointer-events-none"
                              : "opacity-100")
                          }
                          src={i_favout}
                          alt="Избранное"
                        />
                        <img
                          className={
                            "img-2 i_img absolute top-0 left-0 right-0 bottom-0 m-auto transition-opacity " +
                            (isFav
                              ? "opacity-100"
                              : "opacity-0 pointer-events-none")
                          }
                          src={i_fav}
                          alt="Избранное"
                        />
                      </button>
                      <button className="px-3 py-2 text-sm text-white font-medium bg-blue-600 rounded-md">
                        Маршрут
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* -------------------- */}
        {/* модальное окно выхода*/}
        {/* -------------------- */}
        <div
          className={
            "w-full h-full flex justify-center items-center absolute top-0 left-0 z-[1000] transition-opacity duration-100 bg-black/50 " +
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
