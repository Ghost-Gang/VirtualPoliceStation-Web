
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

function signIn() {
  const signinForm = document.querySelector('#signInForm');
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  firebase.auth().signInWithEmailAndPassword(email, password).then(cred => {
    console.log(cred);
    console.log('signedin');
    signinForm.reset();
    console.log(auth.currentUser);
  }).catch(err => {
    alert(err.message);
  })
}

function signOut() {
  firebase.auth().signOut();
  window.location.href = 'index.html';
}

function signUp() {

  var fname = document.getElementById('sFName').value;
  var lname = document.getElementById('sLName').value;
  var email = document.getElementById('sEmail').value;
  var password = document.getElementById('sPassword').value;
  var aadhaar = document.getElementById('sAadhaar').value;
  var address = document.getElementById('sAddress').value;
  var city = document.getElementById('sCity').value;
  var district = document.getElementById('sDistrict').value;
  var state = document.getElementById('sState').value;
  var pincode = document.getElementById('sPincode').value;
  var phone = document.getElementById('sPhone').value;
  var signupForm = document.getElementById('signUpForm');

  var fullName = fname + lname;
  var validName = !/[\s~`!@#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?()\._0-9]/.test(fullName);
  var number = /[0-9]/.test(password);
  var upperCase = /[A-Z]/.test(password);
  var lowerCase = /[a-z]/.test(password);
  var specialChar = /[\s~`!@#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?()\._]/.test(password);

  if (validName && fullName != '') {
    if (aadhaar.toString().length === 12) {
      if (password.length >= 8 && number && upperCase && lowerCase && specialChar) {
        if (address.length != '') {
          if (city.length != '') {
            if (district.length != '') {
              if (state.length != '') {
                if (pincode.toString().length === 6) {
                  if (phone.toString().length === 10) {

                    auth.createUserWithEmailAndPassword(email, password).then(() => {

                      auth.onAuthStateChanged((user) => {
                        if (user) {
                          user.updateProfile({
                            displayName: fullName,
                            phoneNumber: phone
                          }).then(() => {
                            console.log('updated');
                            console.log(user.email);
                          }).catch(error => {
                            console.log(error.message);
                          });

                          user.sendEmailVerification().then(function () {
                            alert('verification email sent')
                            // Email sent.
                          }).catch(function (error) {
                            // An error happened.
                            console.log(error.message);
                          });
                          currentUser = user;
                          db.collection('Users').doc(user.email).set({
                            FName: fname,
                            LName: lname,
                            Aadhaar: aadhaar,
                            Address: address,
                            City: city,
                            District: district,
                            State: state,
                            Pincode: pincode,
                            Phone: phone,
                            Email: email
                          }).then(() => {
                            signupForm.reset();
                            console.log("Document successfully written!");
                            window.location.href = 'home.html';
                          }).catch(err => {
                            alert(err.message);
                          });
                        }
                      });
                    }).catch((error) => { alert(error.message); });

                  }
                  else
                    window.alert('Invalid Phone Number');
                }
                else
                  window.alert('Invalid Pincode');
              }
              else
                window.alert("State can't be empty");
            }
            else
              window.alert("District can't be null");
          }
          else
            window.alert("City can't be empty");
        }
        else
          window.alert("Address can't be empty");
      }
      else
        window.alert('Invalid Password.');
    }
    else
      window.alert('Invalid Aadhaar! Should be a 12 digit number.');
  }
  else
    window.alert('Invalid Name');
}

function displayAccDetails() {

  var cUser = auth.currentUser;
  // User is signed in.
  const accDetail = document.getElementById('accDetails');
  //account details
  db.collection('Users').doc(cUser.email).get().then(doc => {
    const html = `<p>Signed in as : ${doc.data().Email}</p>
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