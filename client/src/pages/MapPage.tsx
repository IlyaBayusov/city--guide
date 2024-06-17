import { useState } from "react";
import { YMaps, Map } from "@pbe/react-yandex-maps";
import ModalFavorits from "../components/ModalFavorits/ModalFavorits";
import ModalLogout from "../components/ModalLogout/ModalLogout";
import MapNav from "../components/MapNav/MapNav";
import SearchMenu from "../components/SearchMenu/SearchMenu";

export default function MapPage() {
  const [modalLogout, setModalLogout] = useState(false);
  const [modalFav, setModalFav] = useState(false);

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

        <div className="map flex justify-center items-center h-full w-full absolute top-0 left-0 z-0 bg-slate-400">
          {/* <h1 className="text-white/70 text-3xl font-semibold">Карты</h1> */}
          {/* <YMaps>
            <Map
              className="w-full h-full"
              defaultState={{ center: [55.75, 37.57], zoom: 9 }}
            />
          </YMaps> */}
        </div>

        {/* -------------------- */}
        {/* нижнее меню */}
        {/* -------------------- */}
        <SearchMenu setModalFav={toggleSetModalFav} />

        {/* -------------------- */}
        {/* модальное окно избранных */}
        {/* -------------------- */}
        <ModalFavorits modalFav={modalFav} setModalFav={toggleSetModalFav} />

        {/* -------------------- */}
        {/* модальное окно выхода*/}
        {/* -------------------- */}
        <ModalLogout
          modalLogout={modalLogout}
          setModalLogout={toggleSetModalLogout}
        />
      </div>
    </>
  );
}
