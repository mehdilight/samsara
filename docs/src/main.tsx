import React from 'react';
import { createRoot } from 'react-dom/client';
import 'samsara/styles.css';
import './docs.css';
import { App } from './App';

createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
