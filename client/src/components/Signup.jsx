import React, { useState, useRef, useEffect } from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap'
import { useToasts } from 'react-toast-notifications'
import firebase from 'firebase/app';
import 'firebase/auth';
import { Form } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';

const Signup = () => {
    useEffect(() => {
        document.title = "Sign up";
    }, []);
    const [formData, setFormData] = useState('');
    let { fname, lname, email, pass, aadhaar, locality, city, district, state, pin, phone } = formData;
    let [loading, setLoading] = useState(false);
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const history = useHistory();
    const { addToast } = useToasts();
    const formRef = useRef(null);
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        console.log(formData);

        let fullName = fname + lname;
        let validName = !/[\s~`!@#$%^&*+=\-[\]';,/{}|\\":<>?()._0-9]/.test(fullName);
        let number = /[0-9]/.test(pass);
        let upperCase = /[A-Z]/.test(pass);
        let lowerCase = /[a-z]/.test(pass);
        let specialChar = /[\s~`!@#$%^&*+=\-[\]';,/{}|\\":<>?()._0-9]/.test(pass);
        setLoading(false)
        // ====================
        console.log(fullName.length)
        console.log(validName)
        console.log(fullName !== "");
        if (validName && fullName !== '') {
            if (aadhaar.toString().length === 12) {
                if (pass !== '' && pass.length >= 8 && number && upperCase && lowerCase && specialChar) {
                    if (pin.toString().length === 6) {
                        if (phone.toString().length === 10) {
                            firebase.auth().createUserWithEmailAndPassword(email, pass).then(() => {
                                firebase.auth().onAuthStateChanged((user) => {
                                    if (user) {
                                        user.updateProfile({
                                            displayName: fullName,
                                            phoneNumber: phone
                                        }).catch(err => {
                                            addToast(err.message, { appearance: 'error', autoDismiss: true });
                                            setLoading(false);
                                        });
                                        user.sendEmailVerification().then(function () {
                                            firebase.auth().signOut();
                                            // Email sent.
                                            alert('verification email sent')
                                        }).catch(function (err) {
                                            // An error happened.
                                            addToast(err.message, { appearance: 'error', autoDismiss: true });
                                            setLoading(false);
                                        });
                                        firebase.firestore().collection('User-Details').doc(user.uid).set({
                                            FName: fname,
                                            LName: lname,
                                            Aadhaar: aadhaar,
                                            Locality: locality,
                                            City: city,
                                            District: district,
                                            State: state,
                                            Pincode: pin,
                                            Phone: phone,
                                            Email: email
                                        }).then(() => {
                                            formRef.current.reset();
                                            sessionStorage.setItem('user', user.uid);
                                            // closeSignUp();
                                            history.push(`/u/${user.uid}/home`);
                                        }).catch(err => {
                                            addToast(err.message, { appearance: 'error', autoDismiss: true });
                                            setLoading(false);
                                        });
                                    }
                                });
                            }).catch((err) => {
                                addToast(err.message, { appearance: 'error', autoDismiss: true });
                                setLoading(false);
                            });

                        }
                        else {
                            addToast("Invalid Phone number", { appearance: 'warning', autoDismiss: true }); setLoading(false);
                        }
                    }
                    else {
                        addToast("Invalid Pincode", { appearance: 'warning', autoDismiss: true }); setLoading(false);
                    }
                }

                else {
                    addToast("Invalid Password", { appearance: 'warning', autoDismiss: true }); setLoading(false);
                }
            }
            else {
                addToast('Aadhaar should be a 12 digit number', { appearance: 'warning', autoDismiss: true }); setLoading(false);
            }
        }
        else {
            addToast('Invalid Name', { appearance: 'warning', autoDismiss: true }); setLoading(false);
        }

        // ====================

    }

    return (
        <div className='my-5'>

            <Form ref={formRef} className="px-3 container card card-body" id="signUpForm" onChange={handleChange} onSubmit={handleSubmit} style={{ maxWidth: "540px" }}>
                <Modal.Title className="text-center mb-3">SIGN UP</Modal.Title>
                <div className="row">
                    <div className="d-inline-block col-md-6 col-12 padding"><input type="text" name="fname" className="form-control mb-2" placeholder="First name" required /></div>
                    <div className="d-inline-block col-md-6 col-12 padding"><input type="text" name="lname" className="form-control mb-2" placeholder="Last name" /></div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-6"><input type="email" name="email" className="form-control mb-2" placeholder="E-mail" required /></div>
                    <div className="col-12 col-md-6"><input type="number" name="aadhaar" className="form-control mb-2" placeholder="Aadhaar Number" required /></div>
                </div>
                <input type="password" className="form-control" name="pass" placeholder="Password" required />
                <small className="form-text text-muted mb-2">Minimum 8 characters long, an uppercase, a lowercase, a number, a special character.</small>
                <input type="number" className="form-control mb-2" name="sOtp" placeholder="Enter OTP" readOnly />
                <Button className="btn btn-theme mr-1 btn-md mb-3" disabled>Request OTP</Button>
                <Button className="btn btn-theme btn-md mb-3" disabled>Verify</Button>
                <div className="row">
                    <div className="col-12 col-md-6"><input type="text" name="locality" className="form-control mb-2 mr-auto" placeholder="Locality" required /></div>
                    <div className="col-12 col-md-6"><input type="text" name="city" className="form-control mb-2 mr-auto" placeholder="City" required /></div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-6"><input type="text" name="district" className="form-control mb-2 mr-auto" placeholder="District" required /></div>
                    <div className="col-12 col-md-6"><input type="text" name="state" className="form-control mb-2 mr-auto" placeholder="State" required /></div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-6"><input type="number" name="pin" className="form-control mb-2" placeholder="Pincode" required /></div>
                    <div className="col-12 col-md-6"><input type="number" name="phone" className="form-control mb-2" placeholder="Phone number" required /></div>
                </div>
                {
                    loading ?
                        <Button className="btn btn-theme btn-block" disabled><Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /><span className='ml-2'>Signing up</span></Button> :
                        <button className="btn btn-theme btn-block mt-3">Sign up</button>
                }
            </Form>
        </div>

    )
}

export default Signup