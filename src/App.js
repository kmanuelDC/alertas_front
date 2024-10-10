// import './App.css';
import { Provider } from "react-redux";
import { AppRoutes } from './routes/routes';
import { store } from "./store/reducers/store";
import 'leaflet/dist/leaflet.css';


function App() {
  return (
    <Provider store={store}>
      <AppRoutes />
    </Provider >

  );
}

export default App;
