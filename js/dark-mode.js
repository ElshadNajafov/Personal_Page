/**
 * Dark Mode Toggle Functionality
 * 
 * Toggles "dark-mode" class on <body> element and uses localStorage
 * to persist the user's theme preference across page loads.
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'preferred-theme';
  const body = document.body;
  const toggleButton = document.querySelector('.theme-toggle-button');

  // Exit early if required elements are missing
  if (!toggleButton || !body) {
    return;
  }

  /**
   * Apply saved theme preference on page load
   */
  function applySavedTheme() {
    try {
      const savedTheme = localStorage.getItem(STORAGE_KEY);
      if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        toggleButton.textContent = '☀️';
      }
    } catch (error) {
      // localStorage may be unavailable in some contexts
      console.warn('Could not access localStorage:', error);
    }
  }

  /**
   * Toggle dark mode and update button icon
   */
  function toggleDarkMode() {
    const isDark = body.classList.toggle('dark-mode');
    
    try {
      localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');
    } catch (error) {
      console.warn('Could not save theme preference:', error);
    }

    // Update button icon to reflect current theme
    toggleButton.textContent = isDark ? '☀️' : '🌙';
  }

  // Initialize theme on page load
  applySavedTheme();

  // Attach click event listener to toggle button
  toggleButton.addEventListener('click', toggleDarkMode);
})();

