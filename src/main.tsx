import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { securityMiddleware } from './lib/security-middleware'
import { ThemeProvider } from './providers/ThemeProvider'

// Initialize security middleware
securityMiddleware.initialize();

// Apply Content Security Policy - Version allégée pour la production
if (typeof document !== 'undefined') {
  const meta = document.createElement('meta');
  meta.httpEquiv = 'Content-Security-Policy';
  meta.content = "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline' https:; font-src 'self' https:; img-src 'self' data: https: blob:; connect-src 'self' https: wss:; object-src 'none';";
  document.head.appendChild(meta);
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);
