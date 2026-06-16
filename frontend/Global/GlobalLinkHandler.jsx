// GlobalLinkHandler.jsx
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const GlobalLinkHandler = ({ children }) => {
  const navigate = useNavigate();
  const errorTimeoutRef = useRef(null);

  const showManualError = (message, element) => {
    // Remove existing errors
    const existingError = document.querySelector('.global-link-error');
    if (existingError) existingError.remove();

    // Create error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'global-link-error';
    errorDiv.innerHTML = `
      <div style="
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        background: #dc3545;
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 8px 24px rgba(220, 53, 69, 0.3);
        z-index: 99999;
        display: flex;
        align-items: center;
        gap: 12px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        max-width: 90%;
        animation: slideUp 0.3s ease-out;
      ">
        <span style="font-size: 20px;">⚠️</span>
        <span style="flex: 1; font-size: 14px;">${message}</span>
        <button onclick="this.parentElement.parentElement.remove()" style="
          background: rgba(255,255,255,0.2);
          border: none;
          color: white;
          border-radius: 50%;
          width: 28px;
          height: 28px;
          cursor: pointer;
          font-size: 18px;
        ">
          ×
        </button>
      </div>
      <style>
        @keyframes slideUp {
          from { transform: translateX(-50%) translateY(20px); opacity: 0; }
          to { transform: translateX(-50%) translateY(0); opacity: 1; }
        }
      </style>
    `;
    
    document.body.appendChild(errorDiv);

    // Auto dismiss
    if (errorTimeoutRef.current) {
      clearTimeout(errorTimeoutRef.current);
    }
    errorTimeoutRef.current = setTimeout(() => {
      if (errorDiv.parentNode) {
        errorDiv.remove();
      }
    }, 6000);

    // Highlight the broken link
    if (element) {
      element.style.outline = '2px solid #dc3545';
      element.style.outlineOffset = '2px';
      setTimeout(() => {
        element.style.outline = 'none';
      }, 3000);
    }
  };

  useEffect(() => {
    // Handler for React Router Links
    const handleReactRouterLink = (event) => {
      const link = event.target.closest('a');
      if (!link) return;

      // Check if it's a React Router Link (has data-rr-ui attribute or specific class)
      const isReactRouterLink = link.hasAttribute('data-rr-ui') || 
                                link.classList.contains('active') ||
                                link.getAttribute('href')?.startsWith('/');

      if (!isReactRouterLink) return;

      const href = link.getAttribute('href');
      
      // Skip if no href or it's a fragment
      if (!href || href === '#' || href.startsWith('#')) {
        event.preventDefault();
        showManualError('This link is not configured properly.', link);
        return;
      }

      // Check if it's an external link
      if (href.startsWith('http://') || href.startsWith('https://')) {
        // Let external links be handled by the regular link handler
        return;
      }

      // For internal React Router links, check if route exists
      // We'll check this by trying to validate the route
      event.preventDefault();

      // Check if the route exists by attempting to fetch a lightweight check
      // or checking against your route configuration
      const routeExists = checkRouteExists(href);
      
      if (routeExists) {
        // Navigate using React Router
        navigate(href);
      } else {
        showManualError(`The page "${href}" does not exist or is unavailable.`, link);
      }
    };

    // Handler for regular anchor tags and external links
    const handleRegularLink = async (event) => {
      const link = event.target.closest('a');
      if (!link) return;

      const href = link.getAttribute('href');
      
      // Skip if it's a React Router link (already handled)
      if (link.hasAttribute('data-rr-ui') || link.getAttribute('href')?.startsWith('/')) {
        return;
      }

      // Skip empty or invalid links
      if (!href || href === '#' || href.startsWith('javascript:')) {
        event.preventDefault();
        showManualError('This link is not configured properly.', link);
        return;
      }

      // Skip mailto, tel, etc.
      if (href.startsWith('mailto:') || href.startsWith('tel:')) {
        return;
      }

      // Only handle http/https links
      if (!href.startsWith('http://') && !href.startsWith('https://')) {
        return;
      }

      event.preventDefault();

      // Show loading state
      const originalText = link.textContent;
      link.style.opacity = '0.6';
      link.textContent = '⏳ ' + originalText;

      try {
        // Validate the link
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        await fetch(href, {
          method: 'HEAD',
          mode: 'no-cors',
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        // Reset loading state
        link.style.opacity = '1';
        link.textContent = originalText;

        // Navigate to the link
        window.location.href = href;

      } catch (error) {
        // Reset loading state
        link.style.opacity = '1';
        link.textContent = originalText;

        let errorMessage = 'Unable to access this link.';
        
        if (error.name === 'TimeoutError' || error.name === 'AbortError') {
          errorMessage = 'Connection timed out. Please check your internet connection.';
        }

        showManualError(errorMessage, link);
      }
    };

    // Function to check if a route exists
    const checkRouteExists = (path) => {
      // You can implement this based on your route configuration
      // Option 1: Check against your routes array
      const validRoutes = ['/', '/todo', '/about', '/contact']; // Add all your routes
      return validRoutes.includes(path);
      
      // Option 2: Try to fetch a lightweight version
      // return fetch(path, { method: 'HEAD' }).then(() => true).catch(() => false);
    };

    // Add event listeners
    document.addEventListener('click', handleReactRouterLink);
    document.addEventListener('click', handleRegularLink);

    return () => {
      document.removeEventListener('click', handleReactRouterLink);
      document.removeEventListener('click', handleRegularLink);
      if (errorTimeoutRef.current) {
        clearTimeout(errorTimeoutRef.current);
      }
    };
  }, [navigate]);

  return <>{children}</>;
};

export default GlobalLinkHandler;