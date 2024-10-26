import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function usePageStyles() {
  const location = useLocation();
  const bodyRef = useRef(document.body); // Создаем реф для body

  useEffect(() => {
    const body = bodyRef.current; // Получаем текущий элемент body
    if (
      location.pathname === "/login" ||
      location.pathname === "/registration"
    ) {
      body.style.display = "flex";
      body.style.justifyContent = "center";
      body.style.alignItems = "center";
    } else {
      body.style.display = "block";
      body.style.justifyContent = "";
      body.style.alignItems = "";
    }

    return () => {
      body.style.display = "";
      body.style.justifyContent = "";
      body.style.alignItems = "";
    };
  }, [location]);
}
