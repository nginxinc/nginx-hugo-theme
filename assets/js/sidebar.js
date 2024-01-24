// This code makes the sidebar remember which sections has been clicked when using the sidebar
$(document).ready(function () {
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

  // sidebar toggle navigation logic
  $("#sidebar-toggle").on("click", function () {
    const collapsed = $("#sidenav").data("sidebar-collapsed") === "true";
    alert(collapsed);
    if (!collapsed) {
      $("#sidenav")
        .data("sidebar-collapsed", "true")
        .removeClass("sidebar-collapsed");
    } else {
      $("#sidenav")
        .data("sidebar-collapsed", "false")
        .addClass("sidebar-collapsed");
    }
  });
});
