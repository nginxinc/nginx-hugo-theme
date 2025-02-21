document.addEventListener('DOMContentLoaded', () => {
  const productSelectorContent = document.getElementById('product-selector');
  const productSelectorButton = document.getElementById(
    'product-selector-button'
  );

  if (productSelectorButton === null || productSelectorButton == null) {
    return;
  }

  productSelectorButton.addEventListener('click', () => {
    if (productSelectorContent.style.display === 'block') {
      productSelectorContent.style.display = 'none';
      productSelectorButton.classList.remove('remove-bottom-radius');
    } else {
      productSelectorContent.style.display = 'block';
      productSelectorButton.classList.add('remove-bottom-radius');
    }
  });

  window.addEventListener('click', (event) => {
    if (
      !event.target.matches('#product-selector-button') &&
      !event.target.matches('#product-selector-button-icon')
    ) {
      productSelectorContent.style.display = 'none';
    }
    productSelectorButton.classList.remove('remove-bottom-radius');
  });
});
