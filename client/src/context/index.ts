import { createContext } from "react";

import Store from "../Store/Store";
import { locMinsk, radius } from "../constans/constans";
import { IPlaceInfo } from "../models/IPlaceInfo";

interface State {
  store: Store;
  mapCenter: { lat: number; lng: number };
  setMapCenter: React.Dispatch<
    React.SetStateAction<{ lat: number; lng: number }>
  >;
  zoom: number;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
  arrCategoriesTypes: string[];
  setArrCategoriesTypes: React.Dispatch<React.SetStateAction<string[]>>;
  inputRadius: number;
  setInputRadius: React.Dispatch<React.SetStateAction<number>>;
  places: object[];
  setPlaces: React.Dispatch<React.SetStateAction<object[]>>;
  placeInfo: IPlaceInfo | object;
  setPlaceInfo: React.Dispatch<React.SetStateAction<object>>;
  userCenter: { lat: number; lng: number };
  setUserCenter: React.Dispatch<
    React.SetStateAction<{ lat: number; lng: number }>
  >;
  modalSearchMenu: boolean;
  setModalSearchMenu: React.Dispatch<React.SetStateAction<boolean>>;
  isLoadedMap: boolean;
  setIsLoadedMap: React.Dispatch<React.SetStateAction<boolean>>;
}

export const store = new Store();

export const Context = createContext<State>({
  store,
  mapCenter: locMinsk,
  setMapCenter: () => {},
  zoom: radius,
  setZoom: () => {},
  arrCategoriesTypes: [],
  setArrCategoriesTypes: () => {},
  inputRadius: radius,
  setInputRadius: () => {},
  places: [],
  setPlaces: () => {},
  placeInfo: {},
  setPlaceInfo: () => {},
  userCenter: {},
  setUserCenter: () => {},
  modalSearchMenu: false,
  setModalSearchMenu: () => {},
  isLoadedMap: false,
  setIsLoadedMap: () => {},
});
