import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './reservation/App.jsx';
// import Seat from './seat/seat.jsx';
// import ResvSeat from './seat/resvseat.jsx';
// import ResvSeat2 from './seat/resvseat2.jsx';
import { BrowserRouter } from 'react-router-dom';

const root = createRoot(document.querySelector('#root'));  

root.render(
  <StrictMode>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </StrictMode>
);
// import App from './admin/App.jsx';
// root.render(<App />);
