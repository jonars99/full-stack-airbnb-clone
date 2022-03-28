// fetchHelper.js

/**
 * For use with window.fetch
 */
export function jsonHeader(options = {}) {
  return Object.assign(options, {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  });
}

// Additional helper methods

export function getMetaContent(name) {
  const header = document.querySelector(`meta[name="${name}"]`);
  return header && header.content;
}

export function getAuthenticityToken() {
  return getMetaContent('csrf-token');
}

export function authenticityHeader(options = {}) {
  return Object.assign(options, {
    'X-CSRF-Token': getAuthenticityToken(),
    'X-Requested-With': 'XMLHttpRequest',
  });
}

/**
* Lets fetch include credentials in the request. This includes cookies and other possibly sensitive data.
* Note: Never use for requests across (untrusted) domains.
*/
export function safeCredentials(options = {}) {
  return Object.assign(options, {
    credentials: 'include',
    mode: 'same-origin',
    headers: Object.assign((options.headers || {}), authenticityHeader(), jsonHeader()),
  });
}

export function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response.json();
}
