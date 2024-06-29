import { useContext, useEffect, useState } from "react";

import MapItem from "../components/Map/MapItem";
import MapNav from "../components/MapNav/MapNav";
import ModalFavorits from "../components/ModalFavorits/ModalFavorits";
import ModalLogout from "../components/ModalLogout/ModalLogout";
import SearchMenu from "../components/SearchMenu/SearchMenu";
import { Context } from "../context";
import ModalSearchMenu from "../components/ModalSearchMenu/ModalSearchMenu";
import ModalInfoPlace from "../components/ModalInfoPlace/ModalInfoPlace";
import ModalOpeningHours from "../components/ModalOpeningHours/ModalOpeningHours";

export default function MapPage() {
  const [modalLogout, setModalLogout] = useState(false);
  const [modalFav, setModalFav] = useState(false);
  const [modalSearchMenu, setModalSearchMenu] = useState(false);
  const [modalInfoPlace, setModalInfoPlace] = useState(false);
  const [modalOpeningHours, setModalOpeningHours] = useState(false);

  // const [coords, setCoords] = useState([]);
  // const [userLocation, setUserLocation] = useState<number[]>([]);

  const { store } = useContext(Context);

  const toggleSetModalFav = () => {
    setModalFav(!modalFav);
  };
  const toggleSetModalLogout = () => {
    setModalLogout(!modalLogout);
  };
  const toggleSetModalSearchMenu = () => {
    setModalSearchMenu(!modalSearchMenu);
  };
  const toggleSetModalInfoPlace = () => {
    setModalInfoPlace(!modalInfoPlace);
  };
  const toggleSetModalOpeningHours = () => {
    setModalOpeningHours(!modalOpeningHours);
  };

  return (
    <>
      <div className="wrapper relative">
        <MapNav setModalLogout={toggleSetModalLogout} />

        <div className="map1 flex justify-center items-center h-full w-full absolute top-0 left-0 z-0 bg-slate-400">
          <MapItem
            modalInfoPlace={modalInfoPlace}
            setModalInfoPlace={toggleSetModalInfoPlace}
          />
        </div>

        {/* нижнее меню */}
        <SearchMenu
          setModalFav={toggleSetModalFav}
          setModalSearchMenu={toggleSetModalSearchMenu}
        />

        {/* модальное информация о месте */}
        <ModalInfoPlace
          modalInfoPlace={modalInfoPlace}
          setModalInfoPlace={toggleSetModalInfoPlace}
          modalOpeningHours={modalOpeningHours}
          setModalOpeningHours={toggleSetModalOpeningHours}
        />
        {/* модальное график работы */}
        <ModalOpeningHours
          modalOpeningHours={modalOpeningHours}
          setModalOpeningHours={toggleSetModalOpeningHours}
        />

        {/* модальное нижнее меню */}
        <ModalSearchMenu
          modalSearchMenu={modalSearchMenu}
          setModalSearchMenu={toggleSetModalSearchMenu}
        />

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
