import {createContext, useContext} from "react";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
export const ToastContext = createContext(null)
export const useToastNotification = () => useContext(ToastContext)

export default function ToastContextProvider({children}) {
    const showToastMessage = (message, type) => {
        const props = {
            position: "top-center",
            theme: "light",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
        }

        switch(type) {
            case "success":
                toast.success(message, props)
                break;
            case "error":
                toast.error(message, props)
        }
    };

    return (
        <ToastContext.Provider value={showToastMessage}>
            {children}
            <ToastContainer />
        </ToastContext.Provider>
    );
}
