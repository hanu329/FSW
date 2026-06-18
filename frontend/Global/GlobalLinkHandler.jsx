// GlobalLinkHandler.jsx - COMPLETE WORKING VERSION (No route array needed!)
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const GlobalLinkHandler = ({ children }) => {
  const navigate = useNavigate();
  const errorTimeoutRef = useRef(null);

  // ============ COMPLETE ERROR DISPLAY FUNCTION ============
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

    // Auto dismiss after 6 seconds
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

  // ============ SMART NAVIGATION WITH FALLBACK ============
  useEffect(() => {
    const handleNavigation = (event) => {
      // Find the closest anchor tag
      const link = event.target.closest('a');
      if (!link) return;

      const href = link.getAttribute('href');
      
      // Skip invalid links
      if (!href || href === '#' || href.startsWith('#')) {
        event.preventDefault();
        showManualError('This link is not configured properly.', link);
        return;
      }

      // Skip external links
      if (href.startsWith('http://') || href.startsWith('https://')) {
        return;
      }

      // Skip mailto, tel, etc.
      if (href.startsWith('mailto:') || href.startsWith('tel:')) {
        return;
      }

      // Only handle internal links
      if (!href.startsWith('/')) {
        return;
      }

      // Prevent default for all internal links
      event.preventDefault();

      // ============ THE SMART APPROACH ============
      // Store current path to check if navigation actually happened
      const currentPath = window.location.pathname;
      
      // Try to navigate
      navigate(href);
      
      // Check if navigation happened after a tiny delay
      setTimeout(() => {
        const newPath = window.location.pathname;
        
        // If the path didn't change and it's not the same page, route doesn't exist
        if (newPath === currentPath && newPath !== href) {
          // Navigate back to current page (to avoid blank state)
          navigate(currentPath);
          showManualError(`The page "${href}" does not exist or is unavailable.`, link);
          console.log(`❌ Route not found: ${href}`);
        } else {
          console.log(`✅ Navigated to: ${href}`);
        }
      }, 50);
    };

    // Add event listener
    document.addEventListener('click', handleNavigation, true);

    return () => {
      document.removeEventListener('click', handleNavigation, true);
      if (errorTimeoutRef.current) {
        clearTimeout(errorTimeoutRef.current);
      }
    };
  }, [navigate]);

  return <>{children}</>;
};

export default GlobalLinkHandler;