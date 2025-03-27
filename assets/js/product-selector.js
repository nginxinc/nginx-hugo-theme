document.addEventListener('DOMContentLoaded', () => {
  const productSelectorContent = document.getElementById('product-selector');
  const productSelectorButton = document.getElementById(
    'product-selector-button'
  );

  if (productSelectorButton === null || productSelectorContent == null) {
    return;
  }

  productSelectorButton.addEventListener('click', () => {
    /* Logic for hiding/showing ONLY when the button is clicked */
    if (productSelectorContent.style.display === 'block') {
      productSelectorContent.style.display = 'none';
      productSelectorButton.classList.remove('remove-bottom-radius');
    } else {
      productSelectorContent.style.display = 'block';
      productSelectorButton.classList.add('remove-bottom-radius');
    }
  });

  window.addEventListener('click', (event) => {
    /* Greedy Logic to hide the product selector when something other than the button is clicked. Assumes everything has an id containing "product-selector" */
    if (!event.target.id.includes('product-selector')) {
      productSelectorContent.style.display = 'none';
      productSelectorButton.classList.remove('remove-bottom-radius');
    }
  });
});
