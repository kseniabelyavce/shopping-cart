import {createContext, useContext} from "react";
import {ToastContainer, toast, ToastOptions} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export type ToastContextType = {
    showToastMessage: (message: string, type: string) => void
}
export const ToastContext = createContext<ToastContextType | null>(null)
export const useToastNotification = () => useContext(ToastContext)

export default function ToastContextProvider({children}: any) {
    function showToastMessage(message: string, type: string) {
        const props: ToastOptions = {
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
                break;
            default:
                toast.success(message, props);
        }
    }

    return (
        <ToastContext.Provider value={{showToastMessage}}>
            {children}
            <ToastContainer />
        </ToastContext.Provider>
    );
}
