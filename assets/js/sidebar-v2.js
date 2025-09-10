document.addEventListener('click', (e) => {
  const toggle = e.target.closest('.sidebar__toggle');
  const sidebarMobileToggle = e.target.closest('.sidebar__mobile__toggle');
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

    if (!expanded) {
      sidebar.classList.add('sidebar__mobile-open');
    } else {
      sidebar.classList.remove('sidebar__mobile-open');
    }

    // Set the aria for all the toggle buttons so they are in lockstep
    const toggleButtons = document.getElementsByClassName(
      'sidebar__mobile__toggle'
    );
    for (const button of [...toggleButtons]) {
      button.setAttribute('aria-expanded', String(!expanded));
    }
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const currentPage = window.location.pathname;
  const match = Array.from(
    document.querySelectorAll('.sidebar__link--current')
  ).find((el) => el?.id?.includes(currentPage));

  if (match) match.scrollIntoView({ behavior: 'instant', block: 'start' });
});

const debounce = (callback, wait) => {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback(...args);
    }, wait);
  };
};

window.addEventListener(
  'resize',
  debounce(() => {
    const sidebar = document.getElementById('sidebar-v2');
    if (
      window.innerWidth > 88 * 16 &&
      sidebar.classList.contains('sidebar__mobile-open')
    ) {
      sidebar.classList.remove('sidebar__mobile-open');
    }
  }, 200)
);
