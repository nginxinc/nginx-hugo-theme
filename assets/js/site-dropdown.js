document.addEventListener('DOMContentLoaded', () => {
  const dropdownContent = document.getElementById('dropdown-content');
  const navbarButton = document.getElementById('navbar-sites-button');

  navbarButton.addEventListener('click', () => {
    if (dropdownContent.style.display === 'block') {
      dropdownContent.style.display = 'none';
    } else {
      dropdownContent.style.display = 'block';
    }
  });

  window.addEventListener('click', (event) => {
    if (!event.target.closest('#navbar-sites-button')) {
      dropdownContent.style.display = 'none';
    }
  });
});
