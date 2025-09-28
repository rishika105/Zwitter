import "./App.css";
import { Signup } from "./pages/Signup";
import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import PrivateRoute from "./guards/PrivateRoute";
import Home from "./pages/Home";
import OpenRoute from "./guards/OpenRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/signup" element={
          <OpenRoute>
            <Signup />
          </OpenRoute>
        } />
        <Route path="/login" element={
          <OpenRoute>
            <Login />
          </OpenRoute>
        } />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
