import { Provider } from "react-redux";
import Dashboard from "./Dashboard";
import storeConfig from "./store/store";
import { PersistGate } from "redux-persist/integration/react";

const { store, persistor } = storeConfig;

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Dashboard />
      </PersistGate>
    </Provider>
  );
}
