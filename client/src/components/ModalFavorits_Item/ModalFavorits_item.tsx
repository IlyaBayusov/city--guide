import img_fav1 from "../../assets/img_fav1.png";
import i_fav from "../../assets/i_fav.png";
import i_favout from "../../assets/i_favout.png";
import { useState } from "react";

export default function ModalFavorits_item() {
  const [isFav, setIsFav] = useState(false);

  return (
    <div className="item w-full mb-3 px-3 py-3 border-2 border-gray-300 rounded-xl">
      <div className="flex justify-center mb-3">
        <img src={img_fav1} alt="" className="rounded-md" />
      </div>

      <div className="flex flex-col">
        <p className="text-xs font-medium mb-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus,
          ratione mollitia omnis exercitationem consectetur voluptatibus
          obcaecati nesciunt! Error molestias voluptatibus eius. Culpa
          necessitatibus earum officiis saepe natus corporis ut non!
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
  );
}
