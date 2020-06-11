import CookieService from './cookie-service';
import {customTheme} from '../theme';
import cookieService from './cookie-service';
import fb from '../firebaseConfig';
import {User} from '@/types';

function saveUser(uid: string, user: User) {
  fb.usersCollection.doc(uid).set({
    name: user.name,
    role: user.role,
  });
}

function setOrganization(settings: any) {
  CookieService.setOrganizationCookie(settings);
}

function getOrganization() {
  const settings = cookieService.getOrganizationCookie();
  if (settings) {
    return JSON.parse(settings);
  } else {
    return {
      campaignTracker: {
        size: '4',
        position: '1',
      },
      characterSheet: {
        size: '8',
        position: '2',
      },
      notes: {
        size: '12',
        position: '3',
      },
    };
  }
}
function resetOrganization() {
  CookieService.resetCookie('organization');
}

function setTheme(theme: any) {
  CookieService.setThemeCookie(theme);
}

function getTheme() {
  const theme = CookieService.getThemeCookie();
  if (theme) {
    return JSON.parse(theme);
  }
  return customTheme;
}

function resetTheme() {
  CookieService.resetCookie('theme');
}

export default {
  saveUser,
  setOrganization,
  getOrganization,
  resetOrganization,
  setTheme,
  getTheme,
  resetTheme,
};
