import { Outlet } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";

const ErrorLayout = () => {
  const darkMode = useAppSelector((state) => state.theme.isDark);

  return (
    <main
      className={`home-call-center error-layout ${
        darkMode ? "dark-theme" : "light-theme"
      }`}
    >
      <Outlet />
    </main>
  );
};
export default ErrorLayout;
