import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { Modal, Button } from 'react-bootstrap'

function Profile() {
    let uid = window.location.pathname.split('/')[2];

    let [userData, setUserData] = useState({
        Aadhaar: "",
        Address: "",
        City: "",
        District: "",
        Email: "",
        FName: "",
        LName: "",
        Phone: "",
        Pincode: "",
        State: ""
    });
    let [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    useEffect(() => {
        firebase.firestore().collection('User-Details').doc(uid).get().then(doc => {
            setUserData(doc.data());
        }).catch(err => console.log(err));
    }, [])

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    }
    const handleSubmit = e => {
        e.preventDefault();
        console.log(userData);
        firebase.firestore().collection('User-Details').doc(uid).update(userData).then(() => {
            firebase.auth().onAuthStateChanged(cUser => {
                cUser.updateProfile({
                    displayName: userData.FName + " " + userData.LName
                })
            })
            handleClose();
        }).catch(err => console.error(err));
    }

    return (
        <>
            <div className='my-5'>
                <form className="px-3 container card card-body" style={{ maxWidth: "540px" }}>
                    <h2 className="text-center">My Profile</h2>
                    <div className="row">
                        <div className="d-inline-block col-md-6 col-12 padding"><input type="text" name="FName" value={userData.FName} className="form-control mb-2" placeholder="First name" readOnly /></div>
                        <div className="d-inline-block col-md-6 col-12 padding"><input type="text" name="LName" value={userData.LName} className="form-control mb-2" placeholder="Last name" readOnly /></div>
                    </div>
                    <div className="row">
                        <div className="d-inline-block col-md-6 col-xs-12 padding"><input type="email" name="Email" value={userData.Email} className="form-control mb-2" placeholder="E-mail" readOnly /></div>
                        <div className="d-inline-block col-md-6 col-xs-12 padding"><input type="number" name="Aadhaar" value={userData.Aadhaar} className="form-control mb-2" placeholder="Aadhaar Number" readOnly readOnly /></div>
                    </div>
                    <div className="row">
                        <div className="d-inline-block col-md-6 col-xs-12 padding"><input type="text" name="Address" value={userData.Address} className="form-control mb-2 mr-auto" placeholder="Address" readOnly /></div>
                        <div className="d-inline-block col-md-6 col-xs-12 padding"><input type="text" name="City" value={userData.City} className="form-control mb-2 mr-auto" placeholder="City" readOnly /></div>
                    </div>
                    <div className="row">
                        <div className="d-inline-block col-md-6 col-xs-12 padding"><input type="text" name="District" value={userData.District} className="form-control mb-2 mr-auto" placeholder="District" readOnly /></div>
                        <div className="d-inline-block col-md-6 col-xs-12 padding"><input type="text" name="State" value={userData.State} className="form-control mb-2 mr-auto" placeholder="State" readOnly /></div>
                    </div>
                    <div className="row">
                        <div className="d-inline-block col-md-6 col-xs-12 padding"><input type="number" name="Pincode" value={userData.Pincode} className="form-control mb-2" placeholder="Pincode" readOnly /></div>
                        <div className="d-inline-block col-md-6 col-xs-12 padding"><input type="number" name="Phone" value={userData.Phone} className="form-control mb-2" placeholder="Phone number" readOnly /></div>
                    </div>
                    <button className="btn btn-secondary mt-2 btn-block" type="button" onClick={handleShow}>Edit</button>
                </form>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="px-3 container card card-body" style={{ maxWidth: "540px" }}>
                        <h2 className="text-center">My Profile</h2>
                        <div className="row">
                            <div className="d-inline-block col-md-6 col-12 padding"><input type="text" name="FName" value={userData.FName} className="form-control mb-2" placeholder="First name" onChange={handleChange} /></div>
                            <div className="d-inline-block col-md-6 col-12 padding"><input type="text" name="LName" value={userData.LName} className="form-control mb-2" placeholder="Last name" onChange={handleChange} /></div>
                        </div>
                        <div className="row">
                            <div className="d-inline-block col-md-6 col-xs-12 padding"><input type="email" name="Email" value={userData.Email} className="form-control mb-2" placeholder="E-mail" readOnly onChange={handleChange} /></div>
                            <div className="d-inline-block col-md-6 col-xs-12 padding"><input type="number" name="Aadhaar" value={userData.Aadhaar} className="form-control mb-2" placeholder="Aadhaar Number" readOnly onChange={handleChange} /></div>
                        </div>
                        <div className="row">
                            <div className="d-inline-block col-md-6 col-xs-12 padding"><input type="text" name="Address" value={userData.Address} className="form-control mb-2 mr-auto" placeholder="Address" onChange={handleChange} /></div>
                            <div className="d-inline-block col-md-6 col-xs-12 padding"><input type="text" name="City" value={userData.City} className="form-control mb-2 mr-auto" placeholder="City" onChange={handleChange} /></div>
                        </div>
                        <div className="row">
                            <div className="d-inline-block col-md-6 col-xs-12 padding"><input type="text" name="District" value={userData.District} className="form-control mb-2 mr-auto" placeholder="District" onChange={handleChange} /></div>
                            <div className="d-inline-block col-md-6 col-xs-12 padding"><input type="text" name="State" value={userData.State} className="form-control mb-2 mr-auto" placeholder="State" onChange={handleChange} /></div>
                        </div>
                        <div className="row">
                            <div className="d-inline-block col-md-6 col-xs-12 padding"><input type="number" name="Pincode" value={userData.Pincode} className="form-control mb-2" placeholder="Pincode" onChange={handleChange} /></div>
                            <div className="d-inline-block col-md-6 col-xs-12 padding"><input type="number" name="Phone" value={userData.Phone} className="form-control mb-2" placeholder="Phone number" onChange={handleChange} /></div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <button className="btn btn-theme" id="submit" onClick={handleSubmit}>
                        Save Changes
                    </button>
                </Modal.Footer>
            </Modal>
        </>

    )
}

export default Profile
