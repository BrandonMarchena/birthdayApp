import firebase from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyBOmTqDuFObhgRBKUHYOMJQfmQvHvf_WpY",
    authDomain: "birthdayapp-react-native-99f46.firebaseapp.com",
    projectId: "birthdayapp-react-native-99f46",
    storageBucket: "birthdayapp-react-native-99f46.appspot.com",
    messagingSenderId: "3671941188",
    appId: "1:3671941188:web:080d20f744220557b8dc11"
  };

export default firebase.initializeApp(firebaseConfig);