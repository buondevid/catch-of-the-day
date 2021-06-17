import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBu6Yt3e9v1traS4_d7O0KXB44pk18n6bc",
    authDomain: "catch-of-the-day-dab-d60d9.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-dab-d60d9-default-rtdb.firebaseio.com",
})

const base = Rebase.createClass(firebaseApp.database());

export {firebaseApp};
export default base;