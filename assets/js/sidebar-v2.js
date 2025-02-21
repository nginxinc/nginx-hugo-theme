document.addEventListener('DOMContentLoaded', () => {
  function expandToCurrentPage() {
    const currentPage = document.getElementById('current-page');
    if (currentPage) {
      let parentLabel = currentPage.closest('li');
      while (parentLabel) {
        const checkbox = parentLabel.querySelector('.toggle-checkbox');
        if (checkbox) {
          checkbox.checked = true;
        }
        parentLabel = parentLabel.closest('ul').closest('li');
      }
    }
  }

  expandToCurrentPage();
});
