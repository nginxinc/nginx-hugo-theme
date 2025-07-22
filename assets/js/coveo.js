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
  const token =
    'eyJhbGciOiJIUzI1NiJ9.eyJzZWFyY2hIdWIiOiJIVUJfRVNfTmdpbnhfRG9jc19BbmRfT3JnIiwidjgiOnRydWUsInRva2VuSWQiOiJ1Ym1mejJpMzRvbmZ3c2FsaHBseHFvMmpjdSIsIm9yZ2FuaXphdGlvbiI6ImY1bmV0d29ya3Nwcm9kdWN0aW9uNXZraG4wMGgiLCJ1c2VySWRzIjpbeyJ0eXBlIjoiVXNlciIsIm5hbWUiOiJhbm9ueW1vdXMiLCJwcm92aWRlciI6IkVtYWlsIFNlY3VyaXR5IFByb3ZpZGVyIn1dLCJyb2xlcyI6WyJxdWVyeUV4ZWN1dG9yIl0sImlzcyI6IlNlYXJjaEFwaSIsImV4cCI6MTc1MzIyOTM0MCwiaWF0IjoxNzUzMTQyOTQwfQ.lsKbajGJBke_M3CzzFO8Vk6m61LpYE2gaBaFq1noqyI';
  const org_id = 'f5networksproduction5vkhn00h';
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

  if (searchPageInterface) {
    await searchPageInterface.initialize({
      accessToken: token,
      organizationId: org_id,
      analytics: { analyticsMode: 'legacy' },
      preprocessRequest: (request) => {
        const body = JSON.parse(request.body);
        body.q = `<@- ${body.q} -@>`;
        request.body = JSON.stringify(body);

        return request;
      },
    });
    await searchPageInterface.executeFirstSearch();
  }

  /* Initialize the header searchbar */
  if (searchBarHeader) {
    await searchBarHeader.initialize({
      accessToken: token,
      organizationId: org_id,
      analytics: { analyticsMode: 'legacy' },
      preprocessRequest: (request) => {
        const body = JSON.parse(request.body);
        body.q = `<@- ${body.q} -@>`;
        request.body = JSON.stringify(body);

        return request;
      },
    });

    await searchBarHeader.executeFirstSearch();
  }

  /* Initialize the sidebar searchbar */
  if (searchBarSidebar) {
    await searchBarSidebar.initialize({
      accessToken: token,
      organizationId: org_id,
      analytics: { analyticsMode: 'legacy' },
      preprocessRequest: (request) => {
        const body = JSON.parse(request.body);
        body.q = `<@- ${body.q} -@>`;
        request.body = JSON.stringify(body);

        return request;
      },
    });

    await searchBarSidebar.executeFirstSearch();
  }

  /* Hide atomic-relevance-inspector */
  const shadowElements = searchBarHeader.shadowRoot.childNodes;
  for (let i = 0; i < shadowElements.length; i++) {
    const val = shadowElements[i];
    if (val.localName === 'atomic-relevance-inspector') {
      val.style.display = 'none';
      break;
    }
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  atomicCoveo();
});
