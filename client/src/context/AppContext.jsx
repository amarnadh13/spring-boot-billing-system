import {createContext, useEffect, useState} from "react";
import {fetchCategories} from "../Service/CategoryService.js";
import {fetchItems} from "../Service/ItemService.js";


export const AppContext = createContext(null);

export const AppContextProvider = (props) => {

    const[categories, setCategories] = useState([]);
    const [itemsData, setItemsData] = useState([]);

    const [cartItems, setCartItems] = useState([]);

    const addToCart = (item) => {
        const existingItem = cartItems.find(cartItem => cartItem.name === item.name);
        if (existingItem) {
            setCartItems(cartItems.map(cartItem => cartItem.name === item.name ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem));
        } else {
            setCartItems( [...cartItems, {...item, quantity: 1}]);
        }
    }

    const removeFromCart = (itemId) => {
        setCartItems(cartItems.filter(item => item.itemId !== itemId));
    }

    const updateCart = (itemId, newQuantity) => {
        setCartItems(cartItems.map(item => item.itemId === itemId ? { ...item, quantity: newQuantity} : item));
    }

    const clearCart = () => {
        setCartItems([]);
    }


    const [showReceipt, setShowReceipt] = useState(false);
    const [receiptData, setReceiptData] = useState(null);

    const openReceipt = (data) => {
        setReceiptData(data);
        setShowReceipt(true);
    };

    const closeReceipt = () => {
        setShowReceipt(false);
        setReceiptData(null);
    };


    const [auth, setAuth] = useState({token: null, role: null});
    const [authLoading, setAuthLoading] = useState(true);

    useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role) {
        setAuth({ token, role });
    }

    setAuthLoading(false);
}, []);

    useEffect(() => {
        if (authLoading || !auth.token) return;

        const loadData = async () => {
            try {
                const response = await fetchCategories();
                const itemResponse = await fetchItems();

                setCategories(response.data);
                setItemsData(itemResponse.data);
            } catch (error) {
                console.error("Failed to load data", error);

                if (error.response?.status === 401 || error.response?.status === 403) {
                    logout();
                }
            }
        };

        loadData();
    }, [authLoading, auth.token]);

    const setAuthData = (token, role) => {
        if (!token || !role) return ;
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        setAuth({token, role});
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setAuth({ token: null, role: null });
        setCategories([]);
        setItemsData([]);
    };


    const contextValue = {
        categories,
        setCategories,
        auth,
        setAuthData,
        logout,
        authLoading,
        itemsData,
        setItemsData,
        addToCart,
        cartItems,
        removeFromCart,
        updateCart,
        clearCart,
        showReceipt,
        receiptData,
        openReceipt,
        closeReceipt
    }

    return <AppContext.Provider value={contextValue}>
        {props.children}
    </AppContext.Provider>
}
