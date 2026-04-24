const SESSION_COOKIE_NAME = "dn_admin_session";

function getSessionToken() {
  const secret = process.env.ADMIN_SESSION_SECRET ?? "change-this-session-secret";
  return `ok.${secret}`;
}

export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD ?? "admin1234";
}

export function isValidAdminPassword(password: string) {
  return password === getAdminPassword();
}

export function getSessionCookieName() {
  return SESSION_COOKIE_NAME;
}

export function getExpectedSessionCookieValue() {
  return getSessionToken();
}
