import { createContext } from "react";
import Store from "../Store/Store";

interface State {
  store: Store;
}

const store = new Store();

export const Context = createContext<State>({ store });
