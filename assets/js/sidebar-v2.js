document.addEventListener('click', (e) => {
  const toggle = e.target.closest('.sidebar__toggle');
  const sidebarMobileToggle = e.target.closest('.sidebar-mobile-toggle');
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
  } else if (sidebarMobileToggle) {
    // Show the sidebar
    const sidebar = document.getElementById('sidebar-v2');
    const expanded =
      sidebarMobileToggle.getAttribute('aria-expanded') === 'true';
    sidebar.setAttribute(
      'style',
      !expanded ? 'display: block;' : 'display: none;'
    );

    // Set the aria for all the toggle buttons so they are in lockstep
    const toggleButtons = document.getElementsByClassName(
      'sidebar-mobile-toggle'
    );
    for (const button of [...toggleButtons]) {
      button.setAttribute('aria-expanded', String(!expanded));
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
