import CookieService from './cookie-service';
import fb from '@/firebaseConfig';
import {User, OrganizationSettings} from '@/types';

function saveUser(uid: string, user: User) {
  fb.usersCollection.doc(uid).set({
    name: user.name,
    role: user.role,
  });
}

function getDefaultOrganization() {
  return {
    campaignTracker: {
      size: 4,
      position: 1,
    },
    characterSheet: {
      size: 8,
      position: 2,
    },
    notes: {
      size: 12,
      position: 3,
    },
    characterNotes: {
      size: 12,
      position: 5,
    },
  };
}

function resetOrganization() {
  CookieService.resetCookie('organization');
}

function getDefaultTheme() {
  return {
    primary: '#210E39',
    secondary: '#53208a',
    background: '#FEFFFE',
    headerText: '#FEFFFE',
    bodyText: '#210E39',
    accent: '#560D55',
    error: '#960200',
    info: '#8C8CF2',
    success: '#DDABF8',
    warning: '#A66102',
  };
}

export default {
  saveUser,
  getDefaultOrganization,
  resetOrganization,
  getDefaultTheme,
};
