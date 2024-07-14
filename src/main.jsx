
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import ToastContextProvider from "./contexts/ToastContextProvider.jsx";
import {createTheme, MantineProvider} from '@mantine/core'
import '@mantine/core/styles.css';

const greyBlue = [
    '#eef3ff',
    '#dce4f5',
    '#b9c7e2',
    '#94a8d0',
    '#748dc1',
    '#5f7cb8',
    '#5474b4',
    '#44639f',
    '#39588f',
    '#2d4b81'
];

const theme = createTheme({
    colors: {
        greyBlue,
    }
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <MantineProvider theme={theme}>
        <ToastContextProvider>
            <App/>
        </ToastContextProvider>
    </MantineProvider>
)
