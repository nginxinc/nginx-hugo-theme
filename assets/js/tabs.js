window.addEventListener('DOMContentLoaded', () => {
  const tabLists = document.querySelectorAll('.tab-labels');

  tabLists.forEach((tabList) => {
    const tabs = tabList.querySelectorAll(':scope > li > [role="tab"]');

    let tabFocus = 0;
    let selectedTab =
      tabs[0].getAttribute('aria-selected') === 'true' ? tabs[0] : null;
    tabList.addEventListener('keyup', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        // Reset existing the aria-selected that is true
        selectedTab.setAttribute('aria-selected', 'false');
        selectedTab = e.target;

        // Change the tabs
        changeTabs(e);
      }
    });

    tabList.addEventListener('keydown', (e) => {
      // Prevent page scrolling on space key hit
      if (e.key === ' ') {
        e.preventDefault();
      } else {
        if (
          e.key === 'ArrowRight' ||
          e.key === 'ArrowLeft' ||
          e.key === 'Home' ||
          e.key === 'End'
        ) {
          tabs[tabFocus].setAttribute('tabindex', -1);
          selectedTab =
            tabs[tabFocus].getAttribute('aria-selected') === 'true'
              ? tabs[tabFocus]
              : selectedTab;
          if (e.key === 'ArrowRight') {
            tabFocus = (tabFocus + 1) % tabs.length;
          } else if (e.key === 'ArrowLeft') {
            tabFocus = tabFocus - 1;
            if (tabFocus < 0) {
              tabFocus = tabs.length - 1;
            }
          } else if (e.key === 'Home') {
            tabFocus = 0;
          } else if (e.key === 'End') {
            tabFocus = tabs.length - 1;
          }

          tabs[tabFocus].setAttribute('tabindex', 0);
          tabs[tabFocus].focus();
        }
      }
    });
  });
});

function changeTabs(e) {
  const toggle = document.getElementById(e.target.getAttribute('for'));
  const label = e.target;

  // Toggle to new content + update Aria attributes
  if (toggle) {
    toggle.checked = true;
  }
  label.setAttribute('aria-selected', 'true');
}
