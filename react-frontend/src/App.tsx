import "./App.css";
import { Signup } from "./pages/Signup";
import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import PrivateRoute from "./guards/PrivateRoute";
import Home from "./pages/Home";
import OpenRoute from "./guards/OpenRoute";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Footer } from "./components/Footer";
import { GetToken } from "./lib/getToken";
import Error from "./components/Error";

function App() {
  const token = GetToken();

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        {token ? <></> : <Navbar />}
        <div className="flex max-w-7xl mx-auto ml-0">
          {token ? <Sidebar /> : <></>}

          <Routes>
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/login"
              element={
                <OpenRoute>
                  <Login />{" "}
                </OpenRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <OpenRoute>
                  <Signup />
                </OpenRoute>
              }
            />

            <Route element={<Error />} path="*"></Route>
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
