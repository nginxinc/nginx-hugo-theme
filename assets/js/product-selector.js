document.addEventListener("DOMContentLoaded", function() {
    const productSelectorContent = document.getElementById("product-selector");
    const productSelectorButton = document.getElementById("product-selector-button");

    productSelectorButton.addEventListener("click", function() {
        if (productSelectorContent.style.display === "block") {
            productSelectorContent.style.display = "none";
        } else {
            productSelectorContent.style.display = "block";
        }
    });

    window.addEventListener("click", function(event) {
        if (!event.target.matches('#product-selector-button') && !event.target.matches('#product-selector-button-icon')) {
            productSelectorContent.style.display = "none";
        }
    });
});