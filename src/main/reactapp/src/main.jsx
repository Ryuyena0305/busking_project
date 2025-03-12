import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './reservation/App.jsx';  
import { BrowserRouter } from 'react-router-dom';

const root = createRoot(document.querySelector('#root'));  

root.render(
  <StrictMode>
    <BrowserRouter>  
      <App />
    </BrowserRouter>
  </StrictMode>
);
