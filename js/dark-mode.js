// Dark mode toggle logic
// - Toggles "dark-mode" class on <body>
// - Uses localStorage to remember the user's choice across pages

(function () {
  const STORAGE_KEY = 'preferred-theme';
  const body = document.body;
  const toggleLabel = document.querySelector('.theme-toggle-label');

  if (!toggleLabel || !body) return;

  // Apply saved theme on load
  const savedTheme = localStorage.getItem(STORAGE_KEY);
  if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    toggleLabel.textContent = '☀️';
  }

  toggleLabel.addEventListener('click', function (event) {
    event.preventDefault();

    const isDark = body.classList.toggle('dark-mode');
    localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');

    // Swap icon for better feedback
    toggleLabel.textContent = isDark ? '☀️' : '🌙';
  });
})();


