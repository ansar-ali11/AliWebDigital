import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { getRouter } from './router'
import './styles.css'

const queryClient = new QueryClient()
const router = getRouter()

// Scroll Reveal Animation Component
function ScrollRevealSetup() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-child');
    revealElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}

// App wrapper component
function App() {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ScrollRevealSetup />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StrictMode>
  )
}

createRoot(document.getElementById('root')!).render(<App />)