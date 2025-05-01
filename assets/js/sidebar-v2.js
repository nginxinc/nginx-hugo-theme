document.addEventListener('DOMContentLoaded', () => {
  const toggles = document.querySelectorAll('.sidebar__toggle');

  toggles.forEach((toggle) => {
    const parent = toggle.closest('li.sidebar__section');
    const children = parent.querySelector('.sidebar__children');

    toggle.addEventListener('click', () => {
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', !isExpanded);
      children.hidden = isExpanded;
    });
  });
});
