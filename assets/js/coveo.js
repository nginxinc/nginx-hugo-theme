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

  /* Initialize the header searchbar*/
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

document.addEventListener('DOMContentLoaded', async () => {
  atomicCoveo();
});
