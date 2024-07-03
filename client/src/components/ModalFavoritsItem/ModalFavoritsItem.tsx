import { useState } from "react";

import i_fav from "@/assets/i_fav.png";
import i_favout from "@/assets/i_favout.png";
import img_fav1 from "@/assets/img_fav1.png";
import { IPlaceInfo } from "../../models/IPlaceInfo";

import i_starGray from "@/assets/i_starGray.png";

type Props = {
  place: IPlaceInfo;
};

export default function ModalFavoritsItem({ place }: Props) {
  const [isFav, setIsFav] = useState(true);
  console.log("items", place);

  return (
    <div className="item w-full mb-3 px-3 py-3 border-2 border-gray-300 rounded-xl">
      <div className="flex justify-center mb-3">
        <img src={img_fav1} alt="" className="rounded-md" />
      </div>

      <div className="flex flex-col">
        <p className="mb-3 max-w-72 text-left text-sm font-semibold">
          {place.name}
        </p>

        <div className="">
          <p className="max-w-80 text-xs font-medium mb-3">
            {place.formatted_address}
          </p>

          <div className="mb-3 flex items-center justify-start">
            <div className="flex">
              <img src={i_starGray} alt="Рейтинг" className="" />
              <img src={i_starGray} alt="Рейтинг" className="" />
              <img src={i_starGray} alt="Рейтинг" className="" />
              <img src={i_starGray} alt="Рейтинг" className="" />
              <img src={i_starGray} alt="Рейтинг" className="" />
            </div>
            <p className="ml-2 text-xs font-semibold">{place.rating}</p>
          </div>
        </div>

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

          <div className="flex items-center gap-3">
            <div className="text-xs font-semibold flex items-center gap-2">
              <img src="" alt="" />
              <p>1 мин - 24 м</p>
            </div>

            <button className="px-3 py-2 text-sm text-white font-medium bg-blue-600 rounded-md">
              Маршрут
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
