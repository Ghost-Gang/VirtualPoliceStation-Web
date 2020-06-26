var firebaseConfig = {
    apiKey: "AIzaSyDO1j6ZIs4C8rhIENE0JDJPXSz0QK5ffHY",
    authDomain: "info-virtualpolicestation.firebaseapp.com",
    databaseURL: "https://info-virtualpolicestation.firebaseio.com",
    projectId: "info-virtualpolicestation",
    storageBucket: "info-virtualpolicestation.appspot.com",
    messagingSenderId: "926154003622",
    appId: "1:926154003622:web:803c15bce06a3e4e6f5067",
    measurementId: "G-MBDRKDQ6W7"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var auth = firebase.auth();
var db = firebase.firestore();