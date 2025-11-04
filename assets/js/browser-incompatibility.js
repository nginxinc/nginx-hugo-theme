navigator.browserVersion = (() => {
  var ua = navigator.userAgent;
  var tem;
  var M =
    ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) ||
    [];
  if (/trident/i.test(M[1])) {
    tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
    return 'IE ' + (tem[1] || '');
  }
  if (M[1] === 'Chrome') {
    tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
    if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
  }
  M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
  tem = ua.match(/version\/(\d+)/i);
  if (tem != null) M.splice(1, 1, tem[1]);
  return M.join(' ');
})();

const currentBrowser = navigator.browserVersion.split(' ').at(0);
const currentVersion = navigator.browserVersion.split(' ').at(1);

// Minimum version for FULL support. Source - https://caniuse.com/css-nesting
const supportedNestedCSS = {
  Safari: 17.2,
  Chrome: 112,
  Firefox: 117,
  Opera: 106,
};

// Set the alert if first time visiting
if (!localStorage.getItem('isBrowserVersionChecked')) {
  if (currentVersion < supportedNestedCSS[currentBrowser]) {
    alert(
      `Incompatible browser\n\nPlease update your browser from ${currentBrowser} ${currentVersion} to ${currentBrowser} ${supportedNestedCSS[currentBrowser]} for full support.`
    );
  }
  localStorage.setItem('isBrowserVersionChecked', true);
}
