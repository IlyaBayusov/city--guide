import { createContext } from "react";

import Store from "../Store/Store";
import { locMinsk, radius } from "../constans/constans";

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
});
