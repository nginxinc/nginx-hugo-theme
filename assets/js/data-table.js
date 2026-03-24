/**
 * data-table.js
 * Progressive enhancement for data-table shortcode.
 * Adds column sorting to server-rendered HTML tables.
 *
 * No-JS fallback: tables remain fully readable without this script.
 */

(() => {
  const SORT_ASC = 'ascending';
  const SORT_DESC = 'descending';

  /**
   * Initialize all data-table instances on the page.
   */
  function initAll() {
    const wrappers = document.querySelectorAll('.data-table-wrapper');
    for (const wrapper of wrappers) {
      initTable(wrapper);
    }
  }

  /**
   * Initialize a single data-table instance.
   * @param {HTMLElement} wrapper - The .data-table-wrapper element
   */
  function initTable(wrapper) {
    const table = wrapper.querySelector('table');
    if (!table) return;

    const thead = table.querySelector('thead');
    const tbody = table.querySelector('tbody');
    if (!thead || !tbody) return;

    const headers = Array.from(thead.querySelectorAll('th[data-column]'));

    // State
    const state = {
      sortCol: wrapper.dataset.defaultSort || null,
      sortDir: wrapper.dataset.defaultSortDir || 'asc',
    };

    // Cache original rows
    const allRows = Array.from(tbody.querySelectorAll('tr'));

    // Build column index map
    const colIndex = {};
    for (let i = 0; i < headers.length; i++) {
      colIndex[headers[i].dataset.column] = i;
    }

    // --- Sort controls ---
    for (const th of headers) {
      th.setAttribute('tabindex', '0');
      th.setAttribute('role', 'columnheader');

      const handleSort = () => {
        const col = th.dataset.column;
        if (state.sortCol === col) {
          state.sortDir = state.sortDir === 'asc' ? 'desc' : 'asc';
        } else {
          state.sortCol = col;
          state.sortDir = 'asc';
        }
        updateSortIndicators(headers, state);
        render(tbody, allRows, colIndex, state);
      };

      th.addEventListener('click', handleSort);
      th.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleSort();
        }
      });
    }

    // Set initial sort indicators
    updateSortIndicators(headers, state);
  }

  /**
   * Update sort direction indicators on column headers.
   * Icons are rendered by Hugo (Lucide SVGs) and toggled via CSS
   * based on the aria-sort attribute. JS only manages aria-sort.
   */
  function updateSortIndicators(headers, state) {
    for (const th of headers) {
      const col = th.dataset.column;
      if (col === state.sortCol) {
        th.setAttribute(
          'aria-sort',
          state.sortDir === 'desc' ? SORT_DESC : SORT_ASC
        );
      } else {
        th.removeAttribute('aria-sort');
      }
    }
  }

  /**
   * Check whether a string is strictly numeric (rejects partial parses like "100/min").
   * @param {string} s
   * @returns {boolean}
   */
  function isNumeric(s) {
    return s !== '' && !Number.isNaN(Number(s));
  }

  /**
   * Sort rows and update the DOM.
   */
  function render(tbody, allRows, colIndex, state) {
    let rows = allRows;

    if (state.sortCol && colIndex[state.sortCol] !== undefined) {
      const idx = colIndex[state.sortCol];
      const dir = state.sortDir === 'desc' ? -1 : 1;

      // Pre-cache cell text to avoid DOM queries inside the comparator
      const textCache = new Map();
      for (const row of allRows) {
        const cell = row.querySelectorAll('td')[idx];
        textCache.set(row, cell?.textContent?.trim() || '');
      }

      // Decide comparison mode once for the whole column:
      // only use numeric sort when every non-empty value is a strict number.
      const useNumeric = [...textCache.values()].every(
        (v) => v === '' || isNumeric(v)
      );

      rows = [...rows].sort((a, b) => {
        const aText = textCache.get(a);
        const bText = textCache.get(b);

        if (useNumeric) {
          return (Number(aText) - Number(bText)) * dir;
        }

        return (
          aText.localeCompare(bText, undefined, { sensitivity: 'base' }) * dir
        );
      });
    }

    // Update DOM -- clear tbody and re-append in order
    tbody.replaceChildren(...rows);
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
})();
