import Menubar from "./components/Menubar/Menubar.jsx";
import ManageCategory from "./pages/ManageCategory/ManageCategory.jsx";
import ManageUsers from "./pages/ManageUsers/ManageUsers.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Explore from "./pages/Explore/Explore.jsx";
import { Routes, Route, useLocation, Navigate, Outlet } from "react-router-dom";
import ManageItems from "./pages/ManageItems/ManageItems.jsx";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login/Login.jsx";
import OrderHistory from "./pages/OrderHistory/OrderHistory.jsx";
import { useContext } from "react";
import { AppContext } from "./context/AppContext.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import ReceiptPopup from "./components/ReceiptPopup/ReceiptPopup.jsx";

const App = () => {
    const location = useLocation();
    const {auth, authLoading, showReceipt, receiptData, closeReceipt} = useContext(AppContext);

    const showMenu = auth.token && location.pathname !== "/login";

    const LoginRoute = () => {
        if (authLoading) return <div>Loading...</div>;
        return auth.token ? <Navigate to="/dashboard" replace /> : <Outlet />;
    };

    const ProtectedRoute = () => {
        if (authLoading) return <div>Loading...</div>;
        if (!auth.token) return <Navigate to="/login" replace />;
        return <Outlet />;
    };

    const AdminRoute = () => {
        if (authLoading) return <div>Loading...</div>;
        if (!auth.token) return <Navigate to="/login" replace />;
        if (auth.role !== "ROLE_ADMIN") return <Navigate to="/dashboard" replace />;
        return <Outlet />;
    };

    return (
        <div>
            {/* Menubar */}
            <Toaster />
            {showReceipt && (
                <ReceiptPopup
                    orderDetails={receiptData}
                    onClose={closeReceipt}
                    onPrint={() => window.print()}
                />
            )}

            <Routes>
                {/* AUTH */}
                <Route path="/login" element={ <LoginRoute> <Login /> </LoginRoute> } />

                {/* PROTECTED */}
                {/* Protected Routes */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/explore" element={<Explore />} />
                    <Route path="/orders" element={<OrderHistory />} />
                </Route>

                {/* ADMIN ONLY */}
                <Route element={<AdminRoute />}>
                    <Route path="/category" element={<ManageCategory />} />
                    <Route path="/users" element={<ManageUsers />} />
                    <Route path="/items" element={<ManageItems />} />
                </Route>

                {/* ROOT */}
                <Route path="/" element={ auth.token ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace /> } />

                {/* NOT FOUND */}
                <Route path="*" element={ <NotFound />} />
            </Routes>
        </div>
    );
};

export default App;
