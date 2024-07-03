import i_close24 from "@/assets/i_close24.png";
import { useContext, useEffect, useState } from "react";
import i_starGray from "@/assets/i_starGray.png";
import i_starYellow from "@/assets/i_starYellow.png";
import { Context } from "../../context";
import { IPlaceInfo } from "../../models/IPlaceInfo";
import ButtonAddFav from "../ButtonAddFav/ButtonAddFav";

type Props = {
  modalInfoPlace: boolean;
  setModalInfoPlace: () => boolean;
  modalOpeningHours: boolean;
  setModalOpeningHours: () => boolean;
};

interface CurrentDate {
  day: number;
  hours: number;
  minuts: number;
}

interface Periods {
  close: { day: number; hours: number; minuts: number };
  open: { day: number; hours: number; minuts: number };
}

export default function ModalInfoPlace({
  modalInfoPlace,
  setModalInfoPlace,
  modalOpeningHours,
  setModalOpeningHours,
}: Props) {
  const [date, setDate] = useState<CurrentDate | null>(null);
  const [openingHours, setOpeningHours] = useState("");

  const { placeInfo } = useContext(Context) as { placeInfo: IPlaceInfo };

  useEffect(() => {
    setDate(getCurrentDayAndTime());
    getDate();
  }, [modalInfoPlace]);

  function getCurrentDayAndTime(): CurrentDate {
    const date = new Date();
    const day = date.getDay() - 1;
    const hours = date.getHours();
    const minuts = date.getMinutes();

    return { day, hours, minuts };
  }

  const getDate = () => {
    if (placeInfo.opening_hours?.periods.length == 1)
      setOpeningHours("Открыто 24 часа в сутки");
    if (placeInfo?.opening_hours) {
      placeInfo.opening_hours.periods.map((item: Periods) => {
        if (date?.day == item?.close?.day || item?.open?.day) {
          setOpeningHours(placeInfo.opening_hours.weekday_text[date?.day]);
        }
      });
    } else {
      setOpeningHours("");
    }
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
              {placeInfo.formatted_address}
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
                className="text-xs font-semibold hover:underline"
                onClick={setModalOpeningHours}
              >
                {openingHours || "Закрыто"}
              </button>

              <div className="text-xs font-semibold flex items-center gap-2">
                <img src="" alt="" />
                <p>1 мин - 24 м</p>
              </div>
            </div>

            <div className="mt-3 flex justify-between items-center">
              <ButtonAddFav place={placeInfo} />
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
