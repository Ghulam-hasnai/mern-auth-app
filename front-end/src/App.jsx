import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useEffect, useState } from "react";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  function Protected({element}){
    return isAuth ? element : <Navigate to="/login" />
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsAuth(true);
      if (
        location.pathname === "/" ||
        location.pathname === "/signup" ||
        location.pathname === "/login"
      ) {
        navigate("/home", {replace : false});
      }
    }
  }, [location , navigate , isAuth]);
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Home" element={<Protected element={<Home />} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
