document.addEventListener('DOMContentLoaded', async function () {

    // Netlify function to get the coveo search token via API
    async function getsearchObj() {
      const response = await fetch(
        window.location.origin+"/api/v1/auth/search_token"
      );
      return response.json();
    }

    const searchObj = await getsearchObj()
    Coveo.SearchEndpoint.configureCloudV2Endpoint(searchObj.org_id, searchObj.token, `https://${searchObj.org_id}.org.coveo.com/rest/search`);

    const analyticsElement = document.querySelector('.CoveoAnalytics');
    if (analyticsElement) {
      const analyticsEndpoint = `https://${searchObj.org_id}.analytics.org.coveo.com/rest/ua`;
      analyticsElement.setAttribute('data-endpoint', analyticsEndpoint);
    }

    const root = document.getElementById("search");
    const searchBoxRoot = document.getElementById("searchbox");
    Coveo.initSearchbox(searchBoxRoot, "/search.html");
    var resetbtn = document.querySelector('#reset_btn');
    if (resetbtn) {
      resetbtn.onclick = function () {
        document.querySelector('.coveo-facet-header-eraser').click();
      };
    }
    Coveo.$$(root).on("querySuccess", function (e, args) {
      resetbtn.style.display = "block";
    });
    Coveo.$$(root).on('afterComponentsInitialization', function (e, data) {
      setTimeout(function () {
        document.querySelector('.CoveoOmnibox input').value = Coveo.state(root, 'q');
      }, 1000);
    });
    Coveo.$('#search').on("newResultsDisplayed", function (e, args) {
      for (var i = 0; i < e.target.lastChild.children.length; i++) {
        //Remove the title for tooltip box  
        Coveo.$('.CoveoResultLink').removeAttr('title');         
      }
    });
    Coveo.init(root, {
      f5_product_module: {
        dependsOn: "@f5_product",
        dependsOnCondition: (parentFacet) => {
          const id = parentFacet.options.id;
          const value = "NGINX Management Suite";
          const selected = parentFacet.queryStateModel.get(`f:${id}`)
          return selected.includes(value);
        }
      }
    });
  })
  
  