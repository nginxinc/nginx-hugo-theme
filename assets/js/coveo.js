function isJwtExpired(token) {
  const parts = token.split('.');
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
    window.location.origin + '/api/v1/auth/search_token'
  );
  return response.json();
}

async function atomicCoveo() {
  /* Fetch the credentials */
  await customElements.whenDefined('atomic-search-interface');
  const token = localStorage.getItem('coveo_jwt_v1');
  const org_id = localStorage.getItem('coveo_org_id_v1');
  let searchObj = { token, org_id };

  if (token === null || org_id === null || isJwtExpired(token)) {
    searchObj = await getsearchObj();
    localStorage.setItem('coveo_jwt_v1', searchObj.token);
    localStorage.setItem('coveo_org_id_v1', searchObj.org_id);
  }

  /* Initialize the interfaces with credentials */
  const searchPageInterface = document.querySelector('#search-v2');
  const searchBarHeader = document.querySelector('#search-standalone-header');
  const searchBarSidebar = document.querySelector('#search-standalone-sidebar');
  const sidebar = document.querySelector('#sidebar-layout');

  if (searchPageInterface) {
    await searchPageInterface.initialize({
      accessToken: token,
      organizationId: org_id,
      analytics: { analyticsMode: 'legacy' },
      preprocessRequest: (request, clientOrigin, metadata) => {
        const body = JSON.parse(request.body);
        body.q = `<@- ${body.q} -@>`;
        request.body = JSON.stringify(body);

        return request;
      },
    });
    await searchPageInterface.executeFirstSearch();
  } else {
    if (sidebar) {
      await searchBarSidebar.initialize({
        accessToken: token,
        organizationId: org_id,
        analytics: { analyticsMode: 'legacy' },
        preprocessRequest: (request, clientOrigin, metadata) => {
          const body = JSON.parse(request.body);
          body.q = `<@- ${body.q} -@>`;
          request.body = JSON.stringify(body);

          return request;
        },
      });
      await searchBarSidebar.executeFirstSearch();
    }
  }

  /* Initialize the header searchbar*/
  await searchBarHeader.initialize({
    accessToken: token,
    organizationId: org_id,
    analytics: { analyticsMode: 'legacy' },
    preprocessRequest: (request, clientOrigin, metadata) => {
      const body = JSON.parse(request.body);
      body.q = `<@- ${body.q} -@>`;
      request.body = JSON.stringify(body);

      return request;
    },
  });

  await searchBarHeader.executeFirstSearch();
}

async function legacyCoveo() {
  const token = localStorage.getItem('coveo_jwt_v1');
  const org_id = localStorage.getItem('coveo_org_id_v1');
  let searchObj = { token, org_id };
  if (token === null || org_id === null || isJwtExpired(token)) {
    searchObj = await getsearchObj();
    localStorage.setItem('coveo_jwt_v1', searchObj.token);
    localStorage.setItem('coveo_org_id_v1', searchObj.org_id);
  }

  Coveo.SearchEndpoint.configureCloudV2Endpoint(
    searchObj.org_id,
    searchObj.token,
    `https://${searchObj.org_id}.org.coveo.com/rest/search`
  );

  const analyticsElement = document.querySelector('.CoveoAnalytics');
  if (analyticsElement) {
    const analyticsEndpoint = `https://${searchObj.org_id}.analytics.org.coveo.com/rest/ua`;
    analyticsElement.setAttribute('data-endpoint', analyticsEndpoint);
  }

  const root = document.getElementById('search');
  const searchBoxRoot = document.getElementById('searchbox');
  Coveo.initSearchbox(searchBoxRoot, '/search.html');
  const resetbtn = document.querySelector('#reset_btn');
  if (resetbtn) {
    resetbtn.onclick = () => {
      document.querySelector('.coveo-facet-header-eraser').click();
    };
  }
  Coveo.$$(root).on('querySuccess', (e, args) => {
    resetbtn.style.display = 'block';
  });
  Coveo.$$(root).on('afterComponentsInitialization', (e, data) => {
    setTimeout(() => {
      document.querySelector('.CoveoOmnibox input').value = Coveo.state(
        root,
        'q'
      );
    }, 1000);
  });
  Coveo.$('#search').on('newResultsDisplayed', (e, args) => {
    for (let i = 0; i < e.target.lastChild.children.length; i++) {
      //Remove the title for tooltip box
      Coveo.$('.CoveoResultLink').removeAttr('title');
    }
  });
  Coveo.init(root, {
    f5_product_module: {
      dependsOn: '@f5_product',
      dependsOnCondition: (parentFacet) => {
        const id = parentFacet.options.id;
        const value = 'NGINX Management Suite';
        const selected = parentFacet.queryStateModel.get(`f:${id}`);
        return selected.includes(value);
      },
    },
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  if (localStorage.getItem('useNewTheme') === 'true') {
    atomicCoveo();
  } else {
    legacyCoveo();
  }
});
