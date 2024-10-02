import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {   HashRouter } from "react-router-dom";
import { Provider } from "react-redux"; // Додайте цей імпорт
import store from "./redux/store.js"; // Додайте цей імпорт

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
);
// basename="/ToNoteTest"