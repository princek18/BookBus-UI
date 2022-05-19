import "./App.css";
import "antd/dist/antd.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { LoginComponent } from "./Components/LoginComponent/LoginComponent";
import { SignUpComponent } from "./Components/SignUpComponent/SignUpComponent";
import { Loader } from "./Components/Loader/Loader";
import MainComponent from "./Components/MainComponent/MainComponent";
import { BusList } from "./Components/MainComponent/BusList/BusList";
import { ReviewTicket } from "./Components/MainComponent/ReviewTicket/ReviewTicket";
import { BookedTicket } from "./Components/MainComponent/BookedTicketComponent/BookedTicket";
import { TicketList } from "./Components/MainComponent/BookedTicketList/TicketList";
import { AdminHeader } from "./AdminComponents/AdminHeader/AdminHeader";
import { AddBuses } from "./AdminComponents/AddBuses/AddBuses";
import { AdminBusList } from "./AdminComponents/AdminBusList/AdminBusList";
import { AdminTickets } from "./AdminComponents/AdminTickets/AdminTickets";

export const baseUrl = "http://127.0.0.1:4000";

export const AuthRoute = ({ children }) => {
  if (!localStorage.getItem("authToken")) {
    return <Navigate to="/login" />;
  }

  return children;
};

const AuthAdminRoute = ({ children }) => {
  if (!localStorage.getItem("authToken") && localStorage.getItem('usertype') !== "Admin") {
    return <Navigate to="/login" />;
  }

  return children;
}

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <Loader />
        <BrowserRouter>
          <Routes>
            {localStorage.getItem('usertype') === 'Admin'?
            <>
            <Route
              path="/admin"
              element={
                <AuthAdminRoute>
                  <AdminHeader/>
                  <AddBuses/>
                </AuthAdminRoute>
              }
            />
            <Route
              path="/admin/buses"
              element={
                <AuthAdminRoute>
                  <AdminHeader/>
                  <AdminBusList/>
                </AuthAdminRoute>
              }
            />
            <Route
              path="/admin/tickets"
              element={
                <AuthAdminRoute>
                  <AdminHeader/>
                  <AdminTickets/>
                </AuthAdminRoute>
              }
            />
            <Route
              path="/admin/*"
              element={
                <AuthAdminRoute>
                  <AdminHeader/>
                </AuthAdminRoute>
              }
            /></>: null}
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
            <Route
              path="/review"
              element={
                <AuthRoute>
                  <MainComponent isSearch={false}/>
                  <ReviewTicket />
                </AuthRoute>
              }
            />
            <Route
              path="/ticket"
              element={
                <AuthRoute>
                  <MainComponent isSearch={false}/>
                  <BookedTicket />
                </AuthRoute>
              }
            />
            <Route
              path="/mybookings"
              element={
                <AuthRoute>
                  <MainComponent isSearch={false}/>
                  <TicketList />
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
