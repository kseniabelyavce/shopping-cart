
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import ToastContextProvider from "./contexts/ToastContextProvider.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
    <ToastContextProvider>
        <App/>
    </ToastContextProvider>
)
