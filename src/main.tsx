import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Providers } from "./redux/provider.tsx";
import "react-datepicker/dist/react-datepicker.css";
import "overlayscrollbars/overlayscrollbars.css";
import "react-toastify/dist/ReactToastify.css";
import "react-tooltip/dist/react-tooltip.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./styles/tabler-icons/tabler-icons.min.css";
import "./styles/fontawesome/all.min.css";
import "./styles/fontawesome/sharp-solid.min.css";
import "./styles/fontawesome/sharp-regular.min.css";
import "./styles/scss/style.scss";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Providers>
    <App />
    <ToastContainer />
  </Providers>
);
