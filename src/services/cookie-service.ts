import Cookies from 'js-cookie';

function setOrganizationCookie(organization: any) {
  Cookies.set('organization', JSON.stringify(organization));
}

function getOrganizationCookie() {
  return Cookies.get('organization');
}

function setThemeCookie(theme: any) {
  Cookies.set('theme', JSON.stringify(theme));
}

function getThemeCookie() {
  return Cookies.get('theme');
}

function resetCookie(cookie: string) {
  Cookies.remove(cookie);
}

export default {
  setOrganizationCookie,
  getOrganizationCookie,
  setThemeCookie,
  getThemeCookie,
  resetCookie,
};
