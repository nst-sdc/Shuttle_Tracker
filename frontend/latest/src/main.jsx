import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ThemeProvider } from './components/ThemeProvider';
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider
      clientId={
        import.meta.env.VITE_GOOGLE_CLIENT_ID || '891360203278-2fr8dl1urjgl3vtd37v9qmdbrq249d14.apps.googleusercontent.com'
      }
    >
      <ThemeProvider defaultTheme="light">
        <App />
      </ThemeProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
