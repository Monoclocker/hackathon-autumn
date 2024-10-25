import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function usePageStyles() {
  const location = useLocation();

  useEffect(() => {
    const body = document.getElementsByTagName("body")[0];
    if (
      location.pathname === "/login" ||
      location.pathname === "/registration"
    ) {
      body.style.display = "flex";
      body.style.justifyContent = "center";
      body.style.alignItems = "center";
    } else {
      body.style.display = "block";
      body.style.justifyContent = "null";
      body.style.alignItems = "null";
    }

    return () => {
      body.style.display = "";
      body.style.justifyContent = "";
      body.style.alignItems = "";
    };
  }, [location]);
}

// Хук, котрый меняет стили body, если пользователь на странице регистрации или авторизации, то форма будет в центре по вертикали и горизонтали
