import firebase from 'firebase';
import 'firebase/firestore';

// firebase init goes here
const config = {
  apiKey: 'AIzaSyD9Kqn6cU6MYschxMlG_vU56AqyqqbQ7Nc',
  authDomain: 'wild-space.firebaseapp.com',
  databaseURL: 'https://wild-space.firebaseio.com',
  projectId: 'wild-space',
  storageBucket: 'wild-space.appspot.com',
  messagingSenderId: '885249845133',
  appId: '1:885249845133:web:ca721ab6176b907badffc4',
  measurementId: 'G-Y2MZX4SR5N',
};
firebase.initializeApp(config);

// firebase utils
const db = firebase.firestore();
const auth = firebase.auth();
const currentUser = auth.currentUser;

// date issue fix according to firebase - NO LONGER NECESSARY
// const settings = {
//   timestampsInSnapshots: true,
// };
// db.settings(settings);

// firebase collections
const usersCollection = db.collection('users');
const campaignsCollection = db.collection('campaigns');
const charactersCollection = db.collection('characters');

export default {
  db,
  auth,
  currentUser,
  usersCollection,
  campaignsCollection,
  charactersCollection,
};
