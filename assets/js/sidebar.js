const LOCAL_STORAGE_COLLAPSE_KEY = "sidebar-collapsed";

function handleInitialCollapse() {
  const collapsed = localStorage.getItem(LOCAL_STORAGE_COLLAPSE_KEY);

  if (collapsed === "true") {
    $("#sidebar-toggle-button").attr({
      "aria-expanded": "false",
      title: "Show sidebar navigation",
    });
    $(".sidenav").css("max-width", "2.4rem");
    $("#sidebar-wrapper").addClass("sidebar-toggle-collapsed");
    $(".content").addClass("sidebar-content-collapsed-width");
    $(".nginx-docs-api-container").addClass("sidebar-redoc-collapsed-width");
  } else {
    $("#sidebar-toggle-button").attr({
      "aria-expanded": "true",
      title: "Hide sidebar navigation",
    });
    $(".sidenav").css("max-width", "100%");
    $("#sidebar-wrapper").addClass("hide-sidebar-border");
  }
}

function handleSetCollapse() {
  $("#sidebar-wrapper").addClass("sidebar-toggle-animate");

  const collapsed = localStorage.getItem(LOCAL_STORAGE_COLLAPSE_KEY);

  if (collapsed === "false") {
    $("#sidebar-toggle-button").attr({
      "aria-expanded": "false",
      title: "Show sidebar navigation",
    });
    $("#sidebar-wrapper").addClass("sidebar-toggle-collapsed");
    $(".content").addClass("sidebar-content-collapsed-width");
    $(".nginx-docs-api-container").addClass("sidebar-redoc-collapsed-width");
    localStorage.setItem(LOCAL_STORAGE_COLLAPSE_KEY, true);
  } else {
    $("#sidebar-toggle-button").attr({
      "aria-expanded": "true",
      title: "Hide sidebar navigation",
    });
    $(".sidenav").css("max-width", "100%");
    $("#sidebar-wrapper").addClass("hide-sidebar-border");
    $("#sidebar-wrapper").removeClass("sidebar-toggle-collapsed");
    $(".content").removeClass("sidebar-content-collapsed-width");
    $(".nginx-docs-api-container").removeClass("sidebar-redoc-collapsed-width");
    localStorage.setItem(LOCAL_STORAGE_COLLAPSE_KEY, false);
  }
}

function handleAnimationEnd(event) {
  const collapsed = localStorage.getItem(LOCAL_STORAGE_COLLAPSE_KEY);
  if (collapsed === "true") {
    $(this).css("max-width", "2.4rem");
  }
}

// This code makes the sidebar remember which sections has been clicked when using the sidebar
$(document).ready(function () {
  // sidebar toggle navigation logic
  handleInitialCollapse();
  $("#sidebar-toggle-button").on("click", handleSetCollapse);
  $(".sidenav").on("transitionend", handleAnimationEnd);

  $(".sidebar .nginx-toc-link a").each(function (i, item) {
    if (item.dataset.menuId == $(".main").data("menuId")) {
      $(item).css("color", "#429345");
      $(item).css("font-weight", "500");

      // Remove "collapsed" class and set aria-expanded to "true" for the current item
      $(item).removeClass("collapsed");
      $(item).attr("aria-expanded", "true");

      // Capture data-target value
      var targetId = $(item).data("target");
      if (!targetId) {
        var hrefValue = $(item).attr("href");
        // Add "show" class to the corresponding divs with matching id
        var targetDivs = $("div[id='" + hrefValue.replace("#", "") + "']");
        targetDivs.addClass("show");
      } else {
        $(targetId).addClass("show");
      }

      // Expand parents
      $(item)
        .parents(".collapse")
        .each(function (i, el) {
          var col = new bootstrap.Collapse(el, {
            toggle: false,
          });
          col.show();
        });

      $(item).next(".accordion-body").find(".collapse").addClass("show");
    }
  });
});
