import { Autocomplete, LoadScript } from "@react-google-maps/api";
import { useContext, useState } from "react";
import i_close12 from "@/assets/i_close12.png";
import { Context } from "../../context";
import Loader from "../Loader/Loader";

const libraries = ["places"];

type Props = {};

export default function InputSearchMenu({}: Props) {
  const [inputSearch, setInputSearch] = useState("");
  const [isClose, setIsClose] = useState(false);
  const [autocomplete, setAutocomplete] = useState(null);

  const {
    setZoom,
    setMapCenter,
    setPlaces,
    setModalSearchMenu,
    isLoadedMap,
    setIsLoadedMap,
  } = useContext(Context);

  const onLoad = (autocomplete) => {
    setAutocomplete(autocomplete);
  };

  const onPlaceChanged = async () => {
    if (autocomplete !== null) {
      const place = await autocomplete.getPlace();
      console.log("place", place);
      const placeRes = {
        place_id: place.place_id,
        name: place.name,
        rating: place.rating,
        formatted_address: place.formatted_address,
        business_status: place.business_status,
        photo: place.photos,
        position: {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        },
        types: place.types,
        user_ratings_total: place.user_ratings_total,
        opening_hours: place.opening_hours || null,
        isOpen: place.opening_hours ? place.opening_hours.isOpen() : null,
        icon: place.icon,
      };
      setPlaces([placeRes]);
      setInputSearch(`${placeRes.name}, ${placeRes.formatted_address}`);
      setZoom(17);
      setMapCenter({
        lat: placeRes.position.lat,
        lng: placeRes.position.lng,
      });
      setIsClose(false);
      setModalSearchMenu(false);
      setInputSearch("");
    } else {
      console.log("Ошибка автокомплита");
    }
  };

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setIsClose(true);
    } else {
      setIsClose(false);
    }
    setInputSearch(e.target.value);
  };

  const buttonClick = () => {
    setIsClose(false);
    setInputSearch("");
  };

  if (!isLoadedMap) return <Loader />;

  return (
    <div className="relative flex-grow">
      <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
        <input
          type="text"
          placeholder="Поиск"
          className="w-full rounded-lg py-2 px-4 text-sm border border-gray-300 bg-gray-100 text-black font-medium caret-blue-500"
          onChange={(e) => inputChange(e)}
          value={inputSearch}
        />
      </Autocomplete>

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
  );
}
