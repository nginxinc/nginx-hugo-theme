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

(() => {
  const toc = document.getElementById('TableOfContents');
  if (!toc) return;

  const links = Array.from(toc.querySelectorAll('a[href^="#"]'));
  if (!links.length) return;

  // Map section id -> TOC link
  const linkById = new Map();
  for (const a of links) {
    const id = decodeURIComponent(a.getAttribute('href').slice(1));
    linkById.set(id, a);
  }

  // Find headings that actually exist on the page
  const headings = Array.from(linkById.keys())
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  if (!headings.length) return;

  const setActive = (id) => {
    toc.querySelectorAll('a.is-active').forEach((a) => {
      a.classList.remove('is-active');
    });
    const a = linkById.get(id);
    if (a) a.classList.add('is-active');
  };

  // Use IntersectionObserver to track which section is "current"
  let lastActiveId = null;
  const io = new IntersectionObserver(
    (entries) => {
      // Consider headings that are above the top portion of the viewport as active candidates.
      // Pick the one closest to the top.
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

      if (!visible.length) return;

      const id = visible[0].target.id;
      if (id && id !== lastActiveId) {
        lastActiveId = id;
        setActive(id);
      }
    },
    {
      root: null,
      // Shrink the "active" zone so a section becomes active a bit after it enters
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0,
    }
  );

  headings.forEach((h) => {
    io.observe(h);
  });

  // If you load with a hash, sync immediately
  if (location.hash) setActive(decodeURIComponent(location.hash.slice(1)));
})();
