document.addEventListener('DOMContentLoaded', () => {
  const productSelectorContent = document.getElementById('product-selector');
  const productSelectorButton = document.getElementById(
    'product-selector-button'
  );

  if (!productSelectorButton || !productSelectorContent) return;

  productSelectorButton.addEventListener('click', () => {
    const isVisible = productSelectorContent.style.display === 'block';
    productSelectorContent.style.display = isVisible ? 'none' : 'block';
  });

  window.addEventListener('click', (event) => {
    const isClickInside =
      productSelectorButton.contains(event.target) ||
      productSelectorContent.contains(event.target);
    if (!isClickInside) {
      productSelectorContent.style.display = 'none';
    }
  });
});
