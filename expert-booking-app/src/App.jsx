import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import ExpertList from "./pages/ExpertList/ExpertList";
import ExpertDetail from "./pages/ExpertDetail/ExpertDetail";
import Booking from "./pages/Booking/Booking";
import MyBookings from "./pages/MyBookings/MyBookings";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";

const HeaderWrapper = () => {
  const location = useLocation();

  // Hide header only on Home page
  if (location.pathname === "/") {
    return null;
  }

  return <Header />;
};

function App() {
  return (
    <BrowserRouter>
      <HeaderWrapper />   {/* ✅ Header control yaha render karo */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/experts" element={<ExpertList />} />   {/* ✅ ExpertList route add */}
        <Route path="/experts/:id" element={<ExpertDetail />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/my-bookings" element={<MyBookings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;