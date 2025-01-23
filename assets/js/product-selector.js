$(document).ready(function () {
    const productSelectorContent = document.getElementById("product-selector");

    $("#product-selector-button").on("click", () => {
        if (productSelectorContent.style.display === "block") {
            productSelectorContent.style.display = "none";
        } else {
            productSelectorContent.style.display = "block";
        }
    });

    window.onclick = function(event) {
        if (!event.target.matches('#product-selector-button') && !event.target.matches('#product-selector-button-icon')) {
            productSelectorContent.style.display = "none"
        }
    }
})