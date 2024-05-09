import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate(); // Yönlendirme için useNavigate hook kullanılıyor

    // Oturum kontrolü için basit bir fonksiyon
    const isAuth = () => localStorage.getItem('token') !== null;

    // Oturumu kapatma işlevi
    const handleLogout = () => {
        localStorage.removeItem('token'); // Token siliniyor
        navigate('/login'); // Kullanıcı login sayfasına yönlendiriliyor
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">Drone Hub</Link>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    {isAuth() ? (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/rent-list">Rent List</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/drone-list">Drone List</Link>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link btn btn-link" onClick={handleLogout}>Log Out</button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/register">Register</Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
