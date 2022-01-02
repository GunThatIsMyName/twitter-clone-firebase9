import { BrowserRouter, Route, Routes } from "react-router-dom";
import InitLoading from "./components/InitLoading";
import Navbar from "./components/Navbar";
import { useAppContext } from "./context/AppContext";
import Auth from "./routes/Auth";
import Home from "./routes/Home";
import Profile from "./routes/Profile";

function App() {
  const { loginStatus, initLoading } = useAppContext();
  return (
    <BrowserRouter>
      {initLoading ? (
        <InitLoading />
      ) : (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={loginStatus ? <Home /> : <Auth />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/" element={<Home />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </>
      )}
    </BrowserRouter>
  );
}

export default App;
