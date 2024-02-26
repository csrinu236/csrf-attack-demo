import "./main.scss";
import LoginForm from "./components/LoginForm";
import { useEffect } from "react";
import { csrfToken } from "./utils";

function App() {
  useEffect(() => {
    window.addEventListener("beforeunload", function (event) {
      localStorage.removeItem("csrfToken");
    });

    document.addEventListener("DOMContentLoaded", function () {
      csrfToken.key = localStorage.getItem("csrfToken");
    });
  }, []);
  return <LoginForm></LoginForm>;
}

export default App;
