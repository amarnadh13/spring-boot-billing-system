import './Menubar.css';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {useContext, useState, useEffect} from "react";
import {AppContext} from "../../context/AppContext.jsx";
import {assets} from "../../assets/assets.js";

const Menubar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {logout, auth} = useContext(AppContext);
    const [open, setOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate("/login", {replace: true});
    }

    useEffect(() => {
        setOpen(false);
        document.body.style.overflow = "auto";
    }, [location.pathname]);

    const isActive = (path) => {
        return location.pathname === path;
    }

    const isAdmin = auth.role === "ROLE_ADMIN";

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="/dashboard">
                <img src={assets.system} alt="Logo" height="40"/>
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" onClick={() => setOpen(!open)}>
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className={`collapse navbar-collapse p-2 ${open ? "show" : ""}`} id="navbarNav">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className={`nav-link ${isActive('/dashboard') ? 'fw-bold text-warning' : ''}`} to="/dashboard">Dashboard</Link>
                    </li>
                    <li className="nav-item">
                        <Link className={`nav-link ${isActive('/explore') ? 'fw-bold text-warning' : ''}`} to="/explore">Explore</Link>
                    </li>
                    {
                        isAdmin && (
                            <>
                                <li className="nav-item">
                                    <Link className={`nav-link ${isActive('/items') ? 'fw-bold text-warning' : ''}`} to="/items">Manage Items</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={`nav-link ${isActive('/category') ? 'fw-bold text-warning' : ''}`} to="/category">Manage Category</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={`nav-link ${isActive('/users') ? 'fw-bold text-warning' : ''} ? 'fw-bold text-warning' : ''}`} to="/users">Manage Users</Link>
                                </li>
                            </>
                        )
                    }
                    <li className="nav-item">
                        <Link className={`nav-link ${isActive('/orders') ? 'fw-bold text-warning' : ''}`} to="/orders">Order History</Link>
                    </li>
                </ul>
                <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                    <li className="nav-item dropdown">
                        <a href="#" className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src={assets.profile} alt="" height={32} width={32} />
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown" >
                            <li>
                                <a className="dropdown-item" href="#">
                                    settings
                                </a>
                            </li>
                            <li>
                                <a className="dropdown-item" href="#">
                                    Activity log
                                </a>
                            </li>
                            <li>
                                <hr className="dropdown-divider"/>
                            </li>
                            <li>
                                <a className="dropdown-item" href="#" onClick={handleLogout}>
                                    Logout
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Menubar;
