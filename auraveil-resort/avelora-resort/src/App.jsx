import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

import Rooms from './pages/Rooms';
import RoomDetails from './pages/RoomDetails';
import Facilities from './pages/Facilities';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-[#151515] text-[#FAF9F5] selection:bg-[#C8B89A] selection:text-[#151515]">
        {/* Luxury Navigation Bar */}
        <Navbar />

        {/* Dynamic Main Page Content */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Navigate to="/rooms" replace />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/rooms/:id" element={<RoomDetails />} />
            <Route path="/facilities" element={<Facilities />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* Luxury Footer */}
        <Footer />
      </div>
    </Router>
  );
}
