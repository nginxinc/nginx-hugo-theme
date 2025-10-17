const hideShadowElement = (shadowRoot, selector, timeout = 5000) => {
  if (!shadowRoot) return;

  const hideElement = () => {
    const el = shadowRoot.querySelector(selector);
    if (el) {
      el.style.display = 'none';
      return true;
    }
    return false;
  };

  if (hideElement()) {
    return;
  }

  const observer = new MutationObserver((_mutations, obs) => {
    if (hideElement()) {
      obs.disconnect();
    }
  });

  observer.observe(shadowRoot, { childList: true, subtree: true });

  setTimeout(() => observer.disconnect(), timeout);
};

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

async function getValidSearchCredentials() {
  const accessToken = localStorage.getItem('coveo_jwt_v1');
  const organizationId = localStorage.getItem('coveo_org_id_v1');

  const needsFetch =
    !accessToken || !organizationId || isJwtExpired(accessToken);

  if (needsFetch) {
    const { token, org_id } = await getsearchObj();
    localStorage.setItem('coveo_jwt_v1', token);
    localStorage.setItem('coveo_org_id_v1', org_id);
    return {
      accessToken: token,
      organizationId: org_id,
    };
  }

  return {
    accessToken,
    organizationId,
  };
}

async function atomicCoveo() {
  await customElements.whenDefined('atomic-search-interface');
  const credentials = await getValidSearchCredentials();

  document.querySelectorAll('atomic-search-interface').forEach(async (el) => {
    await el.initialize({
      ...credentials,
      analytics: { analyticsMode: 'legacy' },
      preprocessRequest: (request) => {
        const body = JSON.parse(request.body);
        body.q = `<@- ${body.q} -@>`;
        request.body = JSON.stringify(body);
        return request;
      },
    });
    await el.executeFirstSearch();
  });

  const headerSearchBar = document.querySelector('#search-standalone-header');
  if (headerSearchBar?.shadowRoot) {
    hideShadowElement(headerSearchBar.shadowRoot, 'atomic-relevance-inspector');
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  atomicCoveo();
});
