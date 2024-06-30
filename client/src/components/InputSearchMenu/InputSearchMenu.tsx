import { Autocomplete, LoadScript } from "@react-google-maps/api";
import { useContext, useState } from "react";
import i_close12 from "@/assets/i_close12.png";
import { Context } from "../../context";

const libraries = ["places"];

type Props = {};

export default function InputSearchMenu({}: Props) {
  const [inputSearch, setInputSearch] = useState("");
  const [isClose, setIsClose] = useState(false);
  const [autocomplete, setAutocomplete] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const { setZoom, setMapCenter, setPlaces, setModalSearchMenu } =
    useContext(Context);

  const onLoad = (autocomplete) => {
    setAutocomplete(autocomplete);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      console.log(place);
      setSelectedPlace(place);
      setInputSearch(`${place.name}, ${place.formatted_address}`);
      setZoom(17);
      setMapCenter({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
      setPlaces([]);
      setIsClose(false);
      setModalSearchMenu(false);
      setInputSearch("");
    } else {
      console.log("Ошибка автокомплита");
    }
  };

  const inputChange = (e) => {
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

  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_FIREBASE_GOOGLEMAPS_API_KEY}
      libraries={libraries} // Используйте предопределенный массив
    >
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
    </LoadScript>
  );
}
