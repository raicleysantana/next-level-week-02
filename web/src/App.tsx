import React from 'react';
import {ToastContainer} from "react-toastify";
import './assets/styles/global.css';
import Routes from "./routes";

function App() {
    return (<>
            <ToastContainer/>
            <Routes/>
        </>
    );
}

export default App;