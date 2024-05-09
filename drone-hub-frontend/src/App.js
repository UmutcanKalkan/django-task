import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import RentListPage from './components/RentListPage';
import HomePage from './components/Home';
import DroneListPage from './components/DroneListPage';  // DroneListPage import ediliyor

function App() {
    const isAuth = () => localStorage.getItem('token') !== null; // Basit bir auth kontrolü

    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/login" element={isAuth() ? <Navigate to="/" /> : <LoginPage />} />
                <Route path="/register" element={isAuth() ? <Navigate to="/" /> : <RegisterPage />} />
                <Route path="/rent-list" element={isAuth() ? <RentListPage /> : <Navigate to="/login" />} />
                <Route path="/drone-list" element={isAuth() ? <DroneListPage /> : <Navigate to="/login" />} />
                <Route path="/" element={isAuth() ? <HomePage /> : <Navigate to="/login" />} />
            </Routes>
        </>
    );
}

export default App;
