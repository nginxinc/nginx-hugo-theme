function isJwtExpired(token) {
  const parts = token.split(".");
  if (parts.length !== 3) {
    return true;
  }

  const [_, payload] = parts;
  const decodedPayload = atob(payload);
  const payloadObj = JSON.parse(decodedPayload);

  const currentTime = Math.floor(Date.now() / 1000);
  const expTime = payloadObj.exp;
  return currentTime >= expTime;
}

async function getsearchObj() {
  const response = await fetch(
    window.location.origin + "/api/v1/auth/search_token"
  );
  return response.json();
}

document.addEventListener("DOMContentLoaded", async function () {
  const token = localStorage.getItem("coveo_jwt_v1");
  const org_id = localStorage.getItem("coveo_org_id_v1");
  let searchObj = { token, org_id };
  if (token === null || org_id === null || isJwtExpired(token)) {
    searchObj = await getsearchObj();
    localStorage.setItem("coveo_jwt_v1", searchObj.token);
    localStorage.setItem("coveo_org_id_v1", searchObj.org_id);
  }

  Coveo.SearchEndpoint.configureCloudV2Endpoint(
    searchObj.org_id,
    searchObj.token,
    `https://${searchObj.org_id}.org.coveo.com/rest/search`
  );

  const analyticsElement = document.querySelector(".CoveoAnalytics");
  if (analyticsElement) {
    const analyticsEndpoint = `https://${searchObj.org_id}.analytics.org.coveo.com/rest/ua`;
    analyticsElement.setAttribute("data-endpoint", analyticsEndpoint);
  }

  const root = document.getElementById("search");
  const searchBoxRoot = document.getElementById("searchbox");
  Coveo.initSearchbox(searchBoxRoot, "/search.html");
  var resetbtn = document.querySelector("#reset_btn");
  if (resetbtn) {
    resetbtn.onclick = function () {
      document.querySelector(".coveo-facet-header-eraser").click();
    };
  }
  Coveo.$$(root).on("querySuccess", function (e, args) {
    resetbtn.style.display = "block";
  });
  Coveo.$$(root).on("afterComponentsInitialization", function (e, data) {
    setTimeout(function () {
      document.querySelector(".CoveoOmnibox input").value = Coveo.state(
        root,
        "q"
      );
    }, 1000);
  });
  Coveo.$("#search").on("newResultsDisplayed", function (e, args) {
    for (var i = 0; i < e.target.lastChild.children.length; i++) {
      //Remove the title for tooltip box
      Coveo.$(".CoveoResultLink").removeAttr("title");
    }
  });
  Coveo.init(root, {
    f5_product_module: {
      dependsOn: "@f5_product",
      dependsOnCondition: (parentFacet) => {
        const id = parentFacet.options.id;
        const value = "NGINX Management Suite";
        const selected = parentFacet.queryStateModel.get(`f:${id}`);
        return selected.includes(value);
      },
    },
  });
});
