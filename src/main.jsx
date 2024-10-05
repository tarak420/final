import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.jsx';
import store from './redux/store'; // Import your store
import './index.css';
import NotificationContainer from './components/shared/NotificationContainer.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}> {/* Wrap your App in Provider */}
      <NotificationContainer />
      <App />
    </Provider>
  </StrictMode>,
);
