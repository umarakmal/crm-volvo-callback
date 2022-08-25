import React from 'react';
import { hydrate, render } from 'react-dom';
import './index.css';
import Routess from './Routes';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );


const rootElement = document.getElementById('root');
if (rootElement.hasChildNodes()) {
    hydrate(<Routess />, rootElement);
} else {
    render(<Routess />, rootElement);
}