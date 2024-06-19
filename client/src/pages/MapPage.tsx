import { useContext, useEffect, useRef, useState } from "react";
import ModalFavorits from "../components/ModalFavorits/ModalFavorits";
import ModalLogout from "../components/ModalLogout/ModalLogout";
import MapNav from "../components/MapNav/MapNav";
import SearchMenu from "../components/SearchMenu/SearchMenu";
import MapItem from "../components/Map/MapItem";
import { Context } from "../context";

export default function MapPage() {
  const [modalLogout, setModalLogout] = useState(false);
  const [modalFav, setModalFav] = useState(false);
  const [coords, setCoords] = useState([]);
  const [userLocation, setUserLocation] = useState<number[]>([]);

  const { store } = useContext(Context);

  // AIzaSyDwvdUv3uftChhHm4JfYaufOt1rZcAkhtY

  // const handlePlacemarkDrag = (e) => {
  //   e.get("target").geometry.getCoordinates();
  // };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          setUserLocation([latitude, longitude]);
        },
        (error) => {
          console.error("Ошибка при получении геопозиции:", error);
        }
      );
    } else {
      console.error("Геолокация не поддерживается вашим браузером");
    }
  };

  const toggleSetModalFav = () => {
    setModalFav(!modalFav);
  };
  const toggleSetModalLogout = () => {
    setModalLogout(!modalLogout);
  };

  return (
    <>
      <div className="wrapper relative">
        <MapNav setModalLogout={toggleSetModalLogout} />

        <div className="map1 flex justify-center items-center h-full w-full absolute top-0 left-0 z-0 bg-slate-400">
          <div id="map"></div>
          <button onClick={() => getUserLocation()}>нажми</button>
          <MapItem />
        </div>

        {/* нижнее меню */}
        <SearchMenu setModalFav={toggleSetModalFav} />

        {/* модальное окно избранных */}
        <ModalFavorits modalFav={modalFav} setModalFav={toggleSetModalFav} />

        {/* модальное окно выхода*/}
        <ModalLogout
          modalLogout={modalLogout}
          setModalLogout={toggleSetModalLogout}
        />
      </div>
    </>
  );
}
