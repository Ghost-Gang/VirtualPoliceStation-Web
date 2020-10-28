$('#signIn').click(function () {
  $('#signIn').html('<span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>SIGNING IN...').addClass('disabled');

  const signinForm = document.querySelector('#signInForm');
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(function () {
      // New sign-in will be persisted with session persistence.
      firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
        signinForm.reset();
        window.location.href = "home.html";
      }).catch(err => {
        $('strong').html(err.message); $('.toast').toast('show');
        $('#signIn').html('SIGN IN').removeClass('disabled');
      })
    })
    .catch(function (error) {
      // Handle Errors here.
      $('strong').html(error.message); $('.toast').toast('show');
      $('#signIn').html('SIGN IN').removeClass('disabled');
    });

  //   firebase.auth().signInWithEmailAndPassword(email, password).then(cred => {
  //     console.log('signedin');
  //   }).then(() => window.location.href = "home.html")
  //     .catch(err => {
  //       $('strong').html(err.message); $('.toast').toast('show');
  //       $('#signIn').html('SIGN IN').removeClass('disabled');
  //     });
});

function signOut() {
  firebase.auth().signOut();
}

$('#signUp').click(function () {

  $('#signUp').html('<span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>Loading...').addClass('disabled');

  function caseException(string) {
    $('strong').html(string); $('.toast').toast('show');
    $('#signUp').html('SIGN UP').removeClass('disabled');
  }

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
                          })
                            // .then(() => {
                            //   console.log(user.email);
                            // })
                            .catch(error => {
                              caseException(error.message);
                            });
                          user.sendEmailVerification().then(function () {
                            // Email sent.
                            alert('verification email sent')
                          }).catch(function (error) {
                            // An error happened.
                            caseException(error.message);
                          });
                          currentUser = user;
                          db.collection('User-Details').doc(user.email).set({
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
                            caseException(err.message);
                          });
                        }
                      });
                    }).catch((error) => { caseException(error.message); });
                  }
                  else { caseException("Invalid Phone number"); }
                }
                else { caseException("Invalid Pincode"); }
              }
              else { caseException("State can't be empty"); }
            }
            else { caseException("District can't be empty"); }
          }
          else { caseException("City can't be empty"); }
        }
        else { caseException("Address can't be empty"); }
      }
      else { caseException("Invalid Password"); }
    }
    else { caseException('Aadhaar should be a 12 digit number'); }
  }
  else { caseException('Invalid Name'); }
});

function displayAccDetails() {
  var cUser = auth.currentUser;
  // console.log(cUser);
  // console.log(cUser.email);
  // User is signed in.
  const accDetail = document.getElementById('accDetails');
  //account details
  db.collection('User-Details').doc(cUser.email).get().then(doc => {
    console.log(doc);
    const html = `<p>Signed in as : ${doc.data().Email}</p>
            <p>Name: ${doc.data().FName}&nbsp;${doc.data().LName}</p>
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
  var emailAddress = document.getElementById('resetEmail').value;

  auth.sendPasswordResetEmail(emailAddress).then(function () {
    window.alert('Reset Email Sent');
    window.location.href = 'index.html';
  }).catch(function (error) {
    window.alert(error.message);
  });
}

//New FIr
$('#newFir').click(function () {
  $('#newFir').html('<span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>Submitting...').addClass('disabled');
  var cUser = auth.currentUser;
  var statement = document.getElementById('statement').value;
  var evidenceFile = document.getElementById('evidence').files[0];
  var crimePlace = document.getElementById('crimePlace').value;
  var criminalName = document.getElementById('criminalName').value;
  var criminalAddress = document.getElementById('criminalAddress').value;
  var dateTime = document.getElementById('dateTime').value;

  db.collection('FIR').doc(auth.currentUser.email).set({
    Statement: statement,
    CrimePlace: crimePlace,
    CriminalName: criminalName,
    CriminalAddress: criminalAddress,
    EvidenceImageUrl: '',
    DateTime: dateTime,
    LocalTime: new Date().toLocaleString()
  }).then(() => {
    var filePath = "FIR" + '/' + cUser.email + '/' + evidenceFile.name;
    return firebase.storage().ref(filePath).put(evidenceFile).then((fileSnapshot) => {
      return fileSnapshot.ref.getDownloadURL().then(url => {
        window.alert('FIR submitted successfully.');
        window.location.href = 'home.html';
        return db.collection('FIR').doc(auth.currentUser.email).update({
          EvidenceImageUrl: url,
          StorageUrl: fileSnapshot.metadata.fullPath
        });
      });
    });
  }).catch(error => {
    console.log(error.message);
    $('#newFir').html('SUBMIT').removeClass('disabled');
  });
});

function firStatus() {
  auth.onAuthStateChanged(user => {
    if (user) {
      const firStatement = document.getElementById('firStatement');
      const userDetails = document.getElementById('userDetails');
      //user datails
      db.collection('User-Details').doc(user.email).get().then(doc => {
        var html = `<p>Full Name : ${doc.data().FName} ${doc.data().LName}</p>
        <p>Aadhaar : ${doc.data().Aadhaar}</p>
        <p>Address: ${doc.data().Address}</p>
        <p>City: ${doc.data().City}</p>
        <p>District: ${doc.data().District}</p>
        <p>State: ${doc.data().State}</p>
        <p>Pincode: ${doc.data().Pincode}</p>
        <p>Phone Number : ${doc.data().Phone}</p>`
        userDetails.innerHTML = html;
      }).catch(error => {
        console.log(error.message)
      })
      //fir statement
      db.collection('FIR').doc(user.email).get().then(doc => {
        var html = `<p>Crime Place : ${doc.data().CrimePlace}</p>
                    <p>Criminal Address : ${doc.data().CriminalAddress}</p>
                    <p>FIR register time : ${doc.data().LocalTime}</p>
                    <p>Crime Time : ${doc.data().DateTime}</p>
                    <p class="text-break"><span>Statement : </span>${doc.data().Statement}</p>
                    <span>Evidence : </span><img src="${doc.data().EvidenceImageUrl}" class="img-fluid">`
        firStatement.innerHTML = html;
        $('#loader').addClass('d-none');
      }).catch(error => {
        console.log(error.message)
      })
    }
  })
}

$('#newFirBtn').click(function () {
  $('#newFirBtn').html('<span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>Loading...').addClass('disabled');
});
$('#firStatus').click(function () {
  $('#firStatus').html('<span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>Loading...').addClass('disabled');
});
$('#pastIncidents').click(function () {
  $('#pastIncidents').html('<span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>Loading...').addClass('disabled');
})
$('#applyNoc').click(function () {
  $('#applyNoc').html('<span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>Loading...').addClass('disabled');
})
$('#appointment').click(function () {
  $('#appointment').html('<span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>Loading...').addClass('disabled');
})

