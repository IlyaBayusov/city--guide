import { useEffect, useState } from "react";

import i_close24 from "@/assets/i_close24.png";

import ModalFavoritsItem from "../ModalFavoritsItem/ModalFavoritsItem";
import { fetchFavoritePlaces } from "../../firebase";
import { IPlaceInfo } from "../../models/IPlaceInfo";

type Props = {
  modalFav: boolean;
  setModalFav: () => {};
};

export default function ModalFavorits({ modalFav, setModalFav }: Props) {
  const [placesFav, setPlacesFav] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const placesData: IPlaceInfo[] = await fetchFavoritePlaces();
      setPlacesFav(placesData);
    };

    getData();
  }, [modalFav]);

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
            <p className="text-sm font-semibold">Избранное</p>

            <div className="-mr-1 cursor-pointer" onClick={setModalFav}>
              <img src={i_close24} />
            </div>
          </div>
          <div className="flex flex-col items-center overflow-scroll">
            {placesFav.map((place) => (
              <ModalFavoritsItem place={place} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
