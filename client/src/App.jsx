import Menubar from "./components/Menubar/Menubar.jsx";
import ManageCategory from "./pages/ManageCategory/ManageCategory.jsx";
import ManageUsers from "./pages/ManageUsers/ManageUsers.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Explore from "./pages/Explore/Explore.jsx";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
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
    if (authLoading) {
        return <div>Loading...</div>;
    }

    const LoginRoute = ({children}) => {
        return auth.token ? <Navigate to="/dashboard" replace /> : children;
    };

    const ProtectedRoute = ({children}) => {
        if (!auth.token) {
            return <Navigate to="/login" replace />;
        }
        return children;
    };

    const AdminRoute = ({children}) => {
        if (authLoading) return null;

        if (!auth.token) {
            return <Navigate to="/login" replace />;
        }

        if (auth.role !== "ROLE_ADMIN") {
            return <Navigate to="/dashboard" replace />;
        }

        return children;
    };

    return (
        <div>
            {auth.token && location.pathname !== "/login" && <Menubar />}
            <Toaster />
            {showReceipt && (
                <ReceiptPopup
                    orderDetails={receiptData}
                    onClose={closeReceipt}
                    onPrint={() => window.print()}
                />
            )}

            if (authLoading) {
                return <div>Loading...</div>;
            }



            <Routes>
                {/* AUTH */}
                <Route path="/login" element={ <LoginRoute> <Login /> </LoginRoute> } />

                {/* PROTECTED */}
                <Route path="/dashboard" element={ <ProtectedRoute> <Dashboard /> </ProtectedRoute> } />
                <Route path="/explore" element={ <ProtectedRoute> <Explore /> </ProtectedRoute> } />
                <Route path="/orders" element={ <ProtectedRoute> <OrderHistory /> </ProtectedRoute> } />

                {/* ADMIN ONLY */}
                <Route path="/category" element={ <AdminRoute> <ManageCategory /> </AdminRoute> } />
                <Route path="/users" element={ <AdminRoute> <ManageUsers /> </AdminRoute> } />
                <Route path="/items" element={ <AdminRoute> <ManageItems /> </AdminRoute> } />

                {/* ROOT */}
                <Route path="/" element={ auth.token ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace /> } />

                {/* NOT FOUND */}
                <Route path="*" element={ <NotFound />} />
            </Routes>
        </div>
    );
};

export default App;
