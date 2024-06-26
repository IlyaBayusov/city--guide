import { createContext } from "react";

import Store from "../Store/Store";

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
}

export const store = new Store();

export const Context = createContext<State>({
  store,
  mapCenter: { lat: 53.9, lng: 27.56 },
  setMapCenter: () => {},
  zoom: 9,
  setZoom: () => {},
  arrCategoriesTypes: [],
  setArrCategoriesTypes: () => {},
});
