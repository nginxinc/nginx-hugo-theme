document.addEventListener('click', (e) => {
  const toggle = e.target.closest('.sidebar__toggle');
  if (toggle) {
    const chevron = toggle.querySelector('.sidebar__chevron');
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    const panel = document.getElementById(toggle.getAttribute('aria-controls'));

    toggle.setAttribute('aria-expanded', String(!expanded));

    if (panel) {
      panel.hidden = expanded;
    }

    if (chevron) {
      chevron.classList.toggle('sidebar__chevron--open', !expanded);
    }
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.querySelector('.sidebar__ul');

  if (!sidebar) return;

  const activeLink = sidebar.querySelector('.sidebar__link--current');

  if (activeLink) {
    activeLink.scrollIntoView({
      behavior: 'auto',
      block: 'center',
      inline: 'nearest',
    });
  }
});
