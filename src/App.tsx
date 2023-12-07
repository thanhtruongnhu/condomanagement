import { Provider } from "react-redux";
import Dashboard from "./Dashboard";
import AuthLayer from "./AuthLayer";
import store from "./store/store";

export default function App() {
  return (
    <Provider store={store}>
      <AuthLayer />
    </Provider>
  );
}
