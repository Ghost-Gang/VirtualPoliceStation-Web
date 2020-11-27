import React, { useState, useRef } from 'react'
import { Modal, Form } from 'react-bootstrap'
import { useHistory } from "react-router-dom";
import $ from 'jquery'
import firebase from 'firebase/app';
import { useToasts } from 'react-toast-notifications'

function Login(props) {
    // const { signIn, closeSignIn, showFp, showRegister } = props;
    const { addToast } = useToasts();
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [passWd, setPassWd] = useState('');
    const formRef = useRef(null);
    const [disabled, setDisabled] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        $('#signIn').html('SIGNING IN...');
        setDisabled(true);
        firebase.auth().signInWithEmailAndPassword(email, passWd).then((res) => {
            // closeSignIn();
            formRef.current.reset();
            console.log(res.user.uid);
            history.push(`/u/${res.user.uid}/home`);
        }).catch(err => {
            $('#submit').html('SIGN IN');
            setDisabled(false);
            addToast(err.message, { appearance: 'error', autoDismiss: true });
        });
    }

    const [fp, setFp] = useState(false);
    const closeFp = () => setFp(false);
    const showFp = () => {
        setFp(true);
    }

    // let u = sessionStorage.getItem('user');
    // console.log(user);
    const [fpEmail, setfpEmail] = useState('');

    // forgot password
    function resetPassword() {
        firebase.auth().sendPasswordResetEmail(fpEmail).then(function () {
            window.alert('Reset Email Sent');
            setFp(false);
        }).catch(function (error) {
            window.alert(error.message);
        });
    }
    return (
        <div className="my-5">
            <Form ref={formRef} className="mx-auto container card card-body" id="signInForm" style={{ maxWidth: "400px" }}>
                <Modal.Title className="text-center mb-3">SIGN IN</Modal.Title>
                <div className="md-form input-with-pre-icon mt-2">
                    <input type="email" id="email" className="form-control" placeholder="Email" onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="md-form  input-with-pre-icon my-2">
                    <input type="password" id="password" className="form-control" placeholder="Password" onChange={e => setPassWd(e.target.value)} />
                </div>
                <div className="d-flex justify-content-end">
                    <div><p className="link" onClick={showFp}>Forgot password?</p></div>
                </div>
                <button className="btn btn-theme btn-block my-4 btn-rounded" type="button" id="signIn" disabled={disabled} onClick={handleSubmit}>SIGN IN</button>
                <div className="text-center">
                    Not a member?<a href="sign-up" className="link" > Register</a>
                </div>
            </Form>
            {/* FORGOT PASSWORD */}
            <Modal show={fp} onHide={closeFp}>
                <Modal.Header closeButton>
                    <Modal.Title>Forgot Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form id="resetPassForm" className="px-2">
                        <div className="row"><input className="form-control" id="resetEmail" type="email" placeholder="Enter email" onChange={(e) => setfpEmail(e.target.value)} /></div>
                        <div className="row"><button className="btn btn-theme btn-md mx-auto mt-2" id="resetPassBtn" type="button" onClick={resetPassword}>Get reset link</button></div>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Login
