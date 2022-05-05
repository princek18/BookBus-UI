import "./App.css";
import "antd/dist/antd.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { LoginComponent } from "./Components/LoginComponent/LoginComponent";
import { SignUpComponent } from "./Components/SignUpComponent/SignUpComponent";
import { Loader } from "./Components/Loader/Loader";
import MainComponent from "./Components/MainComponent/MainComponent";
import { BusList } from "./Components/MainComponent/BusList/BusList";

export const baseUrl = "http://127.0.0.1:4000";

export const AuthRoute = ({ children }) => {
  if (!localStorage.getItem("authToken")) {
    return <Navigate to="/login" />;
  }

  return children;
};

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <Loader />
        <BrowserRouter>
          <Routes>
            <Route
              path="*"
              element={
                <AuthRoute>
                  <MainComponent isSearch={true} />
                </AuthRoute>
              }
            />
            <Route
              path="/"
              element={
                <AuthRoute>
                  <MainComponent isSearch={true} />
                </AuthRoute>
              }
            />
            <Route
              path="/search"
              element={
                <AuthRoute>
                  <MainComponent isSearch={false}/>
                  <BusList />
                </AuthRoute>
              }
            />
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/signup" element={<SignUpComponent />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
