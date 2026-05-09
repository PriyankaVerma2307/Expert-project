import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import ExpertList from "./pages/ExpertList/ExpertList";
import ExpertDetail from "./pages/ExpertDetail/ExpertDetail";
import Booking from "./pages/Booking/Booking";
import MyBookings from "./pages/MyBookings/MyBookings";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";

const HeaderWrapper = () => {
  const location = useLocation();

  if (["/", "/login", "/signup"].includes(location.pathname)) {
    return null;
  }

  return <Header />;
};

function App() {
  return (
    <BrowserRouter>
      <HeaderWrapper />   

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/experts" element={<ExpertList />} />   
        <Route path="/experts/:id" element={<ExpertDetail />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;