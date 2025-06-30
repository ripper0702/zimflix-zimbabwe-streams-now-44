import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add error boundary for extension compatibility
window.addEventListener('unhandledrejection', function(event) {
  // Suppress errors from browser extensions
  if (event.reason && event.reason.stack && event.reason.stack.includes('chrome-extension://')) {
    console.warn('Browser extension error suppressed:', event.reason.message);
    event.preventDefault();
  }
});

// Additional error handling for extension injections
window.addEventListener('error', function(event) {
  if (event.filename && event.filename.includes('chrome-extension://')) {
    console.warn('Browser extension error suppressed:', event.message);
    event.preventDefault();
    return true;
  }
});

createRoot(document.getElementById("root")!).render(<App />);
