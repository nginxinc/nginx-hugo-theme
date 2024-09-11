$(document).ready(function () {
    const dropdownContent = document.getElementById("dropdown-content");
    const navbarButton = document.getElementById("navbar-sites-button");
    const chevronIcon = document.getElementById("navbar-sites-button-icon");

    $("#navbar-sites-button").on("click", () => {
        chevronIcon.classList.toggle('rotate-chevron');

        if (dropdownContent.style.display === "block") {
            dropdownContent.style.display = "none";
            navbarButton.classList.remove("remove-bottom-radius");
        } else {
            dropdownContent.style.display = "block";
            navbarButton.classList.add("remove-bottom-radius");
        }
    });

    window.onclick = function(event) {
        if (!event.target.matches('#navbar-sites-button') && !event.target.matches('#navbar-sites-button-icon')) {
            if(dropdownContent.style.display !== "none"){
                chevronIcon.classList.toggle('rotate-chevron');
            }
            dropdownContent.style.display = "none"
            navbarButton.classList.remove("remove-bottom-radius");
        }
    }
})