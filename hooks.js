import { createEffect, createSignal, onMount } from "solid-js";
import { api } from "./services/counter";
import { useStore } from "./useStore";

export const useGetCountQuery = () => {
  const [state, dispatch] = useStore();

  const [lastPromise, setLastPromise] = createSignal();
  const [hookState, setHookState] = createSignal(
    api.endpoints.getCount.select()(state())
  );

  onMount(() => {
    setLastPromise(dispatch(api.endpoints.getCount.initiate()));
  });

  createEffect(() => {
    const nextState = api.endpoints.getCount.select()(state());
    setHookState(nextState);
  });

  function read() {
    const value = hookState();
    return value.data;
  }

  function refetch() {
    return lastPromise().refetch();
  }

  Object.defineProperties(read, {
    isLoading: {
      get() {
        return hookState()?.isLoading && !hookState().data;
      },
    },
    isFetching: {
      get() {
        return hookState()?.isLoading;
      },
    },
    isSuccess: {
      get() {
        return hookState()?.isSuccess;
      },
    },
    isError: {
      get() {
        return hookState()?.isError;
      },
    },
  });
  return [read, { refetch }];
};
