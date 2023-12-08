import { Provider } from "react-redux";
import Dashboard from "./Dashboard";
import AuthLayer from "./AuthLayer";
import storeConfig from "./store/store";
import { PersistGate } from "redux-persist/integration/react";

export default function App() {
  const { store, persistor } = storeConfig;
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthLayer />
      </PersistGate>
    </Provider>
  );
}
