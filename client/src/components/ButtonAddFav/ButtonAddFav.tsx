import i_favout from "@/assets/i_favout.png";
import i_fav from "@/assets/i_fav.png";
import { addFavoritePlace, deleteFavoritePlace } from "../../firebase";
import { useState } from "react";
import { IPlaceInfo } from "../../models/IPlaceInfo";

type Props = {
  place: IPlaceInfo;
};

export default function ButtonAddFav({ place }: Props) {
  const [isFav, setIsFav] = useState(false);

  const btnClick = async () => {
    if (isFav) {
      await deleteFavoritePlace(place.place_id);
    } else {
      console.log("btnclick", place);

      await addFavoritePlace(place);
    }
    setIsFav(!isFav);
  };

  return (
    <button
      className="relative p-2 border-2 border-gray-300 rounded-md"
      onClick={btnClick}
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
  );
}
