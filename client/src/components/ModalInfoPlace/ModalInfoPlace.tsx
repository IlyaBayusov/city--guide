import i_close24 from "@/assets/i_close24.png";
import { useContext, useEffect, useState } from "react";
import i_fav from "@/assets/i_fav.png";
import i_favout from "@/assets/i_favout.png";
import i_starGray from "@/assets/i_starGray.png";
import i_starYellow from "@/assets/i_starYellow.png";
import { Context } from "../../context";
import { IPlaceInfo } from "../../models/IPlaceInfo";

type Props = {
  modalInfoPlace: boolean;
  setModalInfoPlace: () => boolean;
  modalOpeningHours: boolean;
  setModalOpeningHours: () => boolean;
};

export default function ModalInfoPlace({
  modalInfoPlace,
  setModalInfoPlace,
  modalOpeningHours,
  setModalOpeningHours,
}: Props) {
  const [isFav, setIsFav] = useState(false);
  const [date, setDate] = useState({});

  const { placeInfo } = useContext(Context) as { placeInfo: IPlaceInfo };

  useEffect(() => {
    setDate(getCurrentDayAndTime());
  }, [modalOpeningHours]);

  function getCurrentDayAndTime() {
    const date = new Date();
    const day = date.getDay();
    const hours = date.getHours();
    const minuts = date.getMinutes();

    return { day, hours, minuts };
  }

  const showModalOpeningHours = () => {
    setModalOpeningHours(!modalOpeningHours);
  };

  //#FFC400
  return (
    <div
      className={
        "w-full h-full absolute top-0 left-0 z-[70] transition-all duration-200 " +
        (modalInfoPlace ? "opacity-100" : "opacity-0 pointer-events-none")
      }
      onClick={setModalInfoPlace}
    >
      <div className="relative w-full h-full ">
        <div
          className={
            "w-full h-full absolute top-0 left-0 bg-black/50 transition-all duration-200 " +
            (modalInfoPlace ? "" : "")
          }
        ></div>

        <div
          className={
            "absolute bottom-0 left-1/2 -translate-x-1/2 w-full sm:min-w-96 sm:max-w-lg flex flex-col bg-white py-4 px-4 rounded-t-xl transition-all duration-200 " +
            (modalInfoPlace ? "translate-y-0" : "translate-y-full")
          }
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mb-3 flex items-start justify-between -mr-1">
            <p className="max-w-72 text-left text-sm font-semibold">
              {placeInfo.name}
            </p>

            <button
              className="flex justify-center items-center"
              onClick={setModalInfoPlace}
            >
              <img src={i_close24} />
            </button>
          </div>

          <div className="">
            <p className="max-w-80 text-xs font-medium mb-3">
              {placeInfo.address}
            </p>

            <div className="mb-3 flex items-center justify-start">
              <div className="flex">
                <img src={i_starGray} alt="Рейтинг" className="" />
                <img src={i_starGray} alt="Рейтинг" className="" />
                <img src={i_starGray} alt="Рейтинг" className="" />
                <img src={i_starGray} alt="Рейтинг" className="" />
                <img src={i_starGray} alt="Рейтинг" className="" />
              </div>
              <p className="ml-2 text-xs font-semibold">{placeInfo.rating}</p>
            </div>

            <div className="mb-3 flex items-center justify-between">
              <button
                className="text-xs font-semibold"
                onClick={showModalOpeningHours}
              >
                график
              </button>

              <div className="text-xs font-semibold flex items-center gap-2">
                <img src="" alt="" />
                <p>1 мин - 24 м</p>
              </div>
            </div>

            <div className="mt-3 flex justify-between items-center">
              <button
                className="relative p-2 border-2 border-gray-300 rounded-md"
                onClick={() => {
                  !isFav ? setIsFav(true) : setIsFav(false);
                }}
              >
                <img
                  className={
                    "img-1 i_img transition-opacity " +
                    (isFav ? "opacity-0 pointer-events-none" : "opacity-100")
                  }
                  src={i_favout}
                  alt="Избранное"
                />
                <img
                  className={
                    "img-2 i_img absolute top-0 left-0 right-0 bottom-0 m-auto transition-opacity " +
                    (isFav ? "opacity-100" : "opacity-0 pointer-events-none")
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
  );
}
