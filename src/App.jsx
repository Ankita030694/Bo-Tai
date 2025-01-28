import React from 'react';
import Home from './pages/home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from './pages/About/about';
import ContactUs from './pages/contact/contact';
import AdminHome from './pages/Admin/Home/Home';
import ReservationDetails from './pages/Admin/ReservationDetails/ReservationDetails';
import Reservation from './pages/reservation/reservationpage';
import AdminContact from './pages/Admin/Contact/Contact';
import AddOutlet from './pages/Admin/AddOutlet/AddOutlet';
import Login from './pages/Login/Login';
import './App.css'
import Thankyou from './components/Thankyou/Thankyou';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/contact" element={<ContactUs/>} />
          <Route path="/reservation" element={<Reservation/>} />
          <Route path="/admin" element={<AdminHome/>} />
          <Route path="/admin/reservation" element={<ReservationDetails/>} />
          <Route path= "/admin/contact"  element={<AdminContact/>} />
          <Route path= "/admin/add/outlet"  element={<AddOutlet/>} />
          <Route path= "/login"  element={<Login/>} />
          <Route path= "/thanks"  element={<Thankyou/>} />

         
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
