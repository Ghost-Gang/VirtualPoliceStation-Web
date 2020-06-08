
// Your web app's Firebase configuration

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
// firebase.auth();
// firebase.firestore();

function signIn() {
  // e.preventDefault();
  const signinForm = document.querySelector('#signInForm');

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  firebase.auth().signInWithEmailAndPassword(email, password).then(cred => {
    console.log(cred);
    console.log('signedin');
    signinForm.reset();
  }).catch(err => {
    alert(err.message);
  })
}

function signOut() {
  firebase.auth().signOut();
}

function signUp() {

  fname = document.getElementById('sFName').value;
  lname = document.getElementById('sLName').value;
  password = document.getElementById('sPassword').value;
  aadhaar = document.getElementById('sAadhaar').value;
  address = document.getElementById('sAddress').value;
  city = document.getElementById('sCity').value;
  district = document.getElementById('sDistrict').value;
  state = document.getElementById('sState').value;
  pincode = document.getElementById('sPincode').value;
  phone = document.getElementById('sPhone').value;

  var fullName = fname + lname;
  var validName = !/[\s~`!@#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?()\._0-9]/.test(fullName);
  var number = /[0-9]/.test(password);
  var upperCase = /[A-Z]/.test(password);
  var lowerCase = /[a-z]/.test(password);
  var specialChar = /[\s~`!@#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?()\._]/.test(password);

  if (validName) {
    if (password.length >= 8 && number && upperCase && lowerCase && specialChar) {
      if (aadhaar.toString().length === 12) {
        if (address.length != '') {
          if (city.length != '') {
            if (district.length != '') {
              if (state.length != '') {
                if (pincode.toString().length === 6) {
                  if (phone.toString().length === 10) {

                    const signupForm = document.getElementById('signUpForm');
                    const email = document.getElementById('sEmail').value;
                    const password = document.getElementById('sPassword').value;

                    //signup user
                    firebase.auth().createUserWithEmailAndPassword(email, password).then(cred => {
                      return firebase.firestore().collection('User-Data').doc(cred.user.email).set({

                        FName: fname,
                        LName: lname,
                        Aadhaar: aadhaar,
                        Address: address,
                        City: city,
                        District: district,
                        State: state,
                        Pincode: pincode,
                        Phone: phone

                      }).then(() => {
                        signupForm.reset();
                        // window.location.href = "home.html";
                      });

                    }).catch(err => {
                      alert(err.message);
                      console.log(err.message)
                    });

                  }
                  else
                    window.alert('Invalid Phone Number');
                }
                else
                  window.alert('Invalid Pincode');
              }
              else
                window.alert("State can't be empty")

            }
            else
              window.alert("District can't be null");

          }
          else
            window.alert("City can't be empty");

        }
        else
          window.alert("Address can't be empty")
      }
      else
        window.alert('invalid Aadhaar');
    }
    else
      window.alert('Invalid ! Password must be 8 characters long and must contain an uppsercase, a lowercase, a special character and a number');
  }
  else
    window.alert('Invalid Name');

}

const accDetail = document.getElementById('accDetails');

const setupUI = (user) => {
  if (user) {
    //account details
    firebase.firestore().collection('User-Data').doc(user.email).get().then(doc => {
      const html = `<p>Signed in as : ${user.email}
            <p>Name: ${doc.data().FName} ${doc.data().LName}</p>
            <p>Aadhaar: ${doc.data().Aadhaar}</p>
            <p>Address: ${doc.data().Address}</p>
            <p>City: ${doc.data().City}</p>
            <p>District: ${doc.data().District}</p>
            <p>State: ${doc.data().State}</p>
            <p>Pincode: ${doc.data().Pincode}</p>
            <p>Phone: ${doc.data().Phone}</p>`

      accDetail.innerHTML = html;
    })
  }
  else {

  }
}

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    setupUI(user);
  }
  else {
    setupUI();
  }
});

function resetPassword() {
  var auth = firebase.auth();
  var emailAddress = document.getElementById('resetEmail').value;

  auth.sendPasswordResetEmail(emailAddress).then(function () {
    window.alert('Reset Email Sent');
    window.location.href = 'index.html';
  }).catch(function (error) {
    window.alert(error.message);
  });
}



