const SEARCH_HUB = 'HUB_ES_Nginx_Docs_And_Org';

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

async function sendCoveoRequest(payload, endpoint = '') {
  const { organizationId, accessToken } = await getValidSearchCredentials();
  const url = `https://${organizationId}.org.coveo.com/rest/${endpoint}/`;

  fetch(
    new Request(url, {
      method: 'POST',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      }),
      body: JSON.stringify(payload),
    })
  )
    .then((response) => {
      if (!response.ok) {
        // Throw some error to user
      }
      return response.json();
    })
    .then((responseData) => {
      const queryText = payload.q;
      const duration = responseData.duration;
      const searchUid = responseData.searchUid;

      logQuery(queryText, duration, searchUid);
    });
}

async function sendCoveoAnalyticsRequest(payload) {
  const { organizationId, accessToken } = await getValidSearchCredentials();
  const url = `https://${organizationId}.analytics.org.coveo.com/rest/ua/v15/analytics/search`;

  fetch(
    new Request(url, {
      method: 'POST',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      }),
      body: JSON.stringify(payload),
    })
  )
    .then((response) => {
      if (!response.ok) {
        // Throw some error to user
      }
      return response.json();
    })
    .then((responseData) => {
      console.log(responseData);
    });
}

/**
 * Sends a request for suggestions based on given query. Should run everytime a query is updated.
 *
 * @param {*} q
 */
const suggestQuery = async (q) => {};

/**
 * Sends a request to submit the given query. Should run whenever the form is submitted.
 *
 * @param {*} q
 */
const submitQuery = async (q) => {
  const payload = {
    q: q,
    locale: 'en-US',
    searchHub: SEARCH_HUB,
    tab: 'default',
  };

  sendCoveoRequest(payload, 'search/v2');

  // const destination = `/search.html?q=${q}`;
  // window.location.href = destination;
};

const logQuery = async (q, duration, searchUid) => {
  const payload = {
    language: 'en',
    queryText: q,
    responseTime: duration,
    searchQueryUid: searchUid,
    actionCause: 'searchFromLink',
  };

  sendCoveoAnalyticsRequest(payload);
};

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('standalone__searchbox-form');
  const input = document.getElementById('standalone__searchbox-input');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const q = encodeURIComponent(input.value.trim());
    submitQuery(q);
  });
});
