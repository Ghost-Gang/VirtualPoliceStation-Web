const auth = firebase.auth();
const db = firebase.firestore();



window.onload = function () {
    const auth = firebase.auth();
    const db = firebase.firestore();
    function signUpSubmit() {
        const signupForm = document.querySelector("#targer-signup");
        // signUpBtn.addEventListener('click', (e) => {
        e.preventDefault();

        const email = signupForm['signUpEmail'].value;
        const password = signupForm['signUpPassword'].value;

        //signup user
        auth.createUserWithEmailAndPassword(email, password).then(cred => {
            return db.collection('Users').doc(cred.user.email).set({

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
            });
        }).catch(err => {
            alert(err.message);
        });

    }


    // const signUpBtn = document.querySelector("#signUpBtn");
    // // signUpBtn.addEventListener('click', (e) => {
    //     e.preventDefault();

    //     const email = signupForm['signUpEmail'].value;
    //     const password = signupForm['signUpPassword'].value;

    //     //signup user
    //     auth.createUserWithEmailAndPassword(email, password).then(cred => {
    //         return db.collection('users').doc(cred.user.email).set({

    //             fName: signupForm['signUpFName'].value,
    //             lName: signupForm['signUpLName'].value,
    //             aadhaar: signupForm['signUpAadhaar'].value,
    //             address: signupForm['signUpAddress'].value,
    //             city: signupForm['signUpCity'].value,
    //             district: signupForm['signUpDistrict'].value,
    //             state: signupForm['signUpState'].value,
    //             pincode: signupForm['signUpPincode'].value,
    //             phone: signupForm['signUpPhone'].value

    //         }).then(() => {
    //             signupForm.reset();
    //             window.location.href = "main_div.html";
    //         });
    //         //const contain = document.querySelector('#target-signup');
    //         // container.getInstance(contain).close();

    //     }).catch(err => {
    //         alert(err.message);
    //     });

    // });
    function signOut() {
        // const signout = document.querySelector('#signout');
        // signout.addEventListener('click', (e) => {
        // e.preventDefault();
        auth.signOut().then(() => {
            console.log("signout");
            window.location.href = "index.html"
        })
    }
    // const signout = document.querySelector('#signout');
    // signout.addEventListener('click', (e) => {
    //     e.preventDefault();
    //     auth.signOut().then(() => {
    //         console.log("signout");
    //         window.location.href = "index.html"
    //     })
    // });


    function signInSubmit() {
        const signinForm = document.querySelector('#signin-form');
        e.preventDefault();

        const email = signinForm['signInEmail'].value;
        const password = signinForm['signInPassword'].value;

        auth.signInWithEmailAndPassword(email, password).then(cred => {
            console.log(cred);
            signinForm.reset();
            window.location.href = "main_div.html";
        }).catch(err => {
            alert(err.message);
        })
    }

    // const signinForm = document.querySelector('#signin-form');
    // signinForm.addEventListener('submit', (e) => {
    //     e.preventDefault();

    //     const email = signinForm['signInEmail'].value;
    //     const password = signinForm['signInPassword'].value;

    //     auth.signInWithEmailAndPassword(email, password).then(cred => {
    //         console.log(cred);
    //         signinForm.reset();
    //         window.location.href = "main_div.html";
    //     }).catch(err => {
    //         alert(err.message);
    //     })
    // });


    // auth.onAuthStateChanged(user => {
    //     if (user) {
    //         setupUI(user);
    //     }
    //     else {
    //         setupUI();
    //         notlogged();

    //     }
    // });
}