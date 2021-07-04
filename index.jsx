import { render } from "solid-js/web";
import { useGetCountQuery } from "./hooks";

import { worker } from "./mocks/browser";
import { api } from "./services/counter";
import { useStore } from "./useStore";

function App() {
  const [state, dispatch] = useStore();
  const [getCount, { refetch } ] = useGetCountQuery();

  return (
    <main>
      <h1>RTK Query Solid Example</h1>
      <button
        onClick={() => {
          dispatch(api.endpoints.incrementCount.initiate(1));
        }}
      >
        {getCount()?.count || 0}
      </button>{" "}
      <button
        onClick={() => refetch()}
      >
        refetch
      </button>{" "}
      <code>
        Incremented <strong>{getCount()?.count}</strong> times
      </code>
      <p>isLoading: {String(getCount.isLoading)}</p>
      <p>isFetching: {String(getCount.isFetching)}</p>
      <p>isSuccess: {String(getCount.isSuccess)}</p>
      <p>isError: {String(getCount.isError)}</p>
    </main>
  );
}

worker.start().then(() => render(App, document.getElementById("app")));
