import { onCleanup, createSignal } from "solid-js";

import { api } from "./services/counter";
import { configureStore } from "@reduxjs/toolkit";


const reduxStore = configureStore({
  reducer: {
    api: api.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware)
});

const withReduxStoreSignal = (store) => {
  const [state, setState] = createSignal(store.getState())
   const unsubscribe = store.subscribe(() => setState(store.getState()))

  onCleanup(() => unsubscribe());

  return [state, store.dispatch];
};

export const useStore = () => withReduxStoreSignal(reduxStore);
