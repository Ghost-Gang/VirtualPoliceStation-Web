import React, { useState, useRef } from 'react';
import { Modal } from 'react-bootstrap'
import $ from 'jquery';
import { useToasts } from 'react-toast-notifications'
import firebase from 'firebase/app';
import 'firebase/auth';
import { Form } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState('');
    const { fname, lname, email, pass, aadhaar, address, city, district, state, pin, phone } = formData;
    const [disabled, setDisabled] = useState(false);
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const history = useHistory();
    const { addToast } = useToasts();
    const formRef = useRef(null);
    const handleSubmit = (e) => {
        e.preventDefault();
        $('#submit').html('SIGNING UP...');
        setDisabled(true);
        console.log(formData);

        let fullName = fname + lname;
        firebase.auth().createUserWithEmailAndPassword(email, pass).then(() => {

            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    user.updateProfile({
                        displayName: fullName,
                        phoneNumber: phone
                    })
                        // .then(() => {
                        //   console.log(user.email);
                        // })
                        .catch(err => {
                            addToast(err.message, { appearance: 'error', autoDismiss: true });
                        });
                    user.sendEmailVerification().then(function () {
                        // Email sent.
                        alert('verification email sent')
                    }).catch(function (err) {
                        // An error happened.
                        addToast(err.message, { appearance: 'error', autoDismiss: true });
                        $('#submit').html('SIGN UP');
                        setDisabled(false);
                    });
                    firebase.firestore().collection('User-Details').doc(user.uid).set({
                        FName: fname,
                        LName: lname,
                        Aadhaar: aadhaar,
                        Address: address,
                        City: city,
                        District: district,
                        State: state,
                        Pincode: pin,
                        Phone: phone,
                        Email: email
                    }).then(() => {
                        formRef.current.reset();
                        console.log("Document successfully written!");
                        sessionStorage.setItem('user', user.uid);
                        // closeSignUp();
                        history.push(`/u/${user.uid}/home`)
                    }).catch(err => {
                        addToast(err.message, { appearance: 'error', autoDismiss: true });
                        setDisabled(false);
                        $('#submit').html('SIGN UP');
                    });
                }
            });
        }).catch((err) => {
            addToast(err.message, { appearance: 'error', autoDismiss: true });
            setDisabled(false);
            $('#submit').html('SIGN UP');
        });
    }

    return (
        <div className='my-5'>

            <Form ref={formRef} className="px-3 container card card-body" id="signUpForm" onChange={handleChange} onSubmit={handleSubmit} style={{ maxWidth: "540px" }}>
                <Modal.Title className="text-center">SIGN UP</Modal.Title>
                <div className="row">
                    <div className="d-inline-block col-md-6 col-12 padding"><input type="text" name="fname" className="form-control mb-2" placeholder="First name" /></div>
                    <div className="d-inline-block col-md-6 col-12 padding"><input type="text" name="lname" className="form-control mb-2" placeholder="Last name" /></div>
                </div>
                <div className="row">
                    <div className="d-inline-block col-md-6 col-xs-12 padding"><input type="email" name="email" className="form-control mb-2" placeholder="E-mail" /></div>
                    <div className="d-inline-block col-md-6 col-xs-12 padding"><input type="number" name="aadhaar" className="form-control mb-2" placeholder="Aadhaar Number" /></div>
                </div>
                <input type="password" className="form-control" name="pass" placeholder="Password" />
                <small className="form-text text-muted mb-2">Minimum 8 characters long, an uppercase, a lowercase, a number, a special character.</small>
                <input type="number" className="form-control mb-2" name="sOtp" placeholder="Enter OTP" />
                <button className="btn btn-theme mr-1 btn-md mb-3">Request OTP</button>
                <button className="btn btn-theme btn-md mb-3">Verify</button>
                <div className="row">
                    <div className="d-inline-block col-md-6 col-xs-12 padding"><input type="text" name="address" className="form-control mb-2 mr-auto" placeholder="Address" /></div>
                    <div className="d-inline-block col-md-6 col-xs-12 padding"><input type="text" name="city" className="form-control mb-2 mr-auto" placeholder="City" /></div>
                </div>
                <div className="row">
                    <div className="d-inline-block col-md-6 col-xs-12 padding"><input type="text" name="district" className="form-control mb-2 mr-auto" placeholder="District" /></div>
                    <div className="d-inline-block col-md-6 col-xs-12 padding"><input type="text" name="state" className="form-control mb-2 mr-auto" placeholder="State" /></div>
                </div>
                <div className="row">
                    <div className="d-inline-block col-md-6 col-xs-12 padding"><input type="number" name="pin" className="form-control mb-2" placeholder="Pincode" /></div>
                    <div className="d-inline-block col-md-6 col-xs-12 padding"><input type="number" name="phone" className="form-control mb-2" placeholder="Phone number" /></div>
                </div>
                <button className="btn btn-theme mt-2 btn-block" type="submit" id="submit" disabled={disabled}>Sign Up</button>
            </Form>
        </div>

    )
}

export default Signup