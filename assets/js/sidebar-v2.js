document.addEventListener('click', (e) => {
  const toggle = e.target.closest('.sidebar__toggle');
  if (toggle) {
    const chevron = toggle.querySelector('.sidebar__chevron');
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    const panel = document.getElementById(toggle.getAttribute('aria-controls'));

    // Toggle the expanded state
    toggle.setAttribute('aria-expanded', String(!expanded));

    // Toggle visibility of the content
    if (panel) {
      panel.hidden = expanded;
    }

    // Toggle chevron direction class
    if (chevron) {
      chevron.classList.toggle('sidebar__chevron--open', !expanded);
    }
  }
});
