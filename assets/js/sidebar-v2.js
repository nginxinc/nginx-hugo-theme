document.addEventListener("DOMContentLoaded", function() {
    function expandToCurrentPage() {
        var currentPage = document.getElementById("current-page");
        if (currentPage) {
            var parentLabel = currentPage.closest("li");
            while (parentLabel) {
                var checkbox = parentLabel.querySelector(".toggle-checkbox");
                if (checkbox) {
                    checkbox.checked = true;
                }
                parentLabel = parentLabel.closest("ul").closest("li");
            }
        }
    }

    expandToCurrentPage();
})