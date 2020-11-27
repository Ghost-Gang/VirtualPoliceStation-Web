import React, { useState, useRef, useEffect } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import '../css/char-cert.css'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { useToasts } from 'react-toast-notifications';
import axios from 'axios'

function CharCert() {
    const [formData, setFormData] = useState('');
    const [file, setFile] = useState('');
    let [user, setUser] = useState('');
    let [loading, setLoading] = useState(false);
    const formRef = useRef(null);
    let [origin, setOrigin] = useState('');
    useEffect(() => {
        firebase.auth().onAuthStateChanged(User => {
            if (User) {
                setUser(User);
            }
        });
        if (window.location.port === "3000") {
            setOrigin('http://localhost:5000');
        } else {
            setOrigin(window.location.origin);
        }
    }, []);
    console.log(origin);

    const { purpose, purposeDetails, anyCrimeRecord, crimeRecordDetails } = formData;
    const { addToast } = useToasts();

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const handleSubmit = async e => {
        e.preventDefault();
        console.log(formData);
        console.log(file);

        setLoading(true)
        // =======================
        if (!file.type.match('image.*')) {
            return addToast('Select only images', { appearance: 'warning', autoDismiss: true });
        } else {
            let path = 'CharCert' + '/' + user.uid + '/' + file.name;
            let uploadTask = firebase.storage().ref(path).put(file);
            uploadTask.on('state_changed', function (snapshot) {
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                // console.log(progress);
                document.getElementById('progress').innerHTML = Math.ceil(progress) + "%";
            }, function (err) {
                setLoading(false);
                document.getElementById('progress').innerHTML = "";
                return addToast(err.message, { appearance: 'error', autoDismiss: true });
            }, function () {
                uploadTask.snapshot.ref.getDownloadURL().then(async function (URL) {
                    formData.affidavitImg = URL;
                    formData.localTime = new Date().toLocaleString();
                    formData.imagePath = path;
                    console.log(URL);
                    try {
                        await firebase.firestore().collection('CharCert').doc(user.uid).set(formData);
                        axios.post(`${origin}/api/character-certificate`, { email: user.email, name: user.displayName }).then(res => {
                            console.log(res);
                            if (res.data.message) {
                                addToast(res.data.message, { appearance: 'info', autoDismiss: true });
                            } else {
                                addToast('Submitted successfully', { appearance: 'success', autoDismiss: true });
                                formRef.current.reset();
                            }
                            setLoading(false);
                            document.getElementById('progress').innerHTML = "";
                        }).catch(err => {
                            setLoading(false);
                            addToast(err.message, { appearance: 'error', autoDismiss: true });
                        });

                    } catch (err) {
                        setLoading(false);
                        document.getElementById('progress').innerHTML = "";
                        addToast(err.message, { appearance: 'error', autoDismiss: true });
                    }
                });
            });
        }
        // =======================

    }
    return (
        <div className="py-md-4 my-4">
            <form ref={formRef} className="container card card-body px-5" style={{ maxWidth: "540px" }} onChange={handleChange} onSubmit={handleSubmit}>
                <h2 className='text-center pt-2 pb-3'>Character Certificate</h2>
                <label>Purpose for applying:</label>
                <Form.Control as="select" name='purpose' value={purpose} required>
                    <option value="">Choose...</option>
                    <option value='private-service'>Private Service</option>
                    <option value='govt-service'>Govt. Service</option>
                </Form.Control>
                <label htmlFor="" className='mt-3'>Purpose Details:</label>
                <textarea name="purposeDetails" id="" rows="2" className='form-control' placeholder='Purpose details' required></textarea>
                <p className="mt-3 mb-1">
                    Do you have any criminal record or any criminal proceedings against
                    you or your family in any part of the country?<span className='text-danger'>*</span>
                </p>
                <div className="row">
                    <Form.Check type="radio" value="yes" label='Yes' id="yes" name="anyCrimeRecord" className="ml-3" required />
                    <Form.Check type="radio" value="no" label='No' id="no" name="anyCrimeRecord" className="ml-3" required />
                </div>
                <label className='mt-3'>If yes provide details:</label>
                <textarea className="form-control mb-3" name="crimeRecordDetails" rows="2" placeholder="Provide details"
                    required={anyCrimeRecord === 'yes' ? true : false} disabled={anyCrimeRecord === 'yes' ? false : true} value={anyCrimeRecord === 'yes' ? crimeRecordDetails : ''}></textarea>
                <label htmlFor='aff-img'>Upload Affidavit</label>
                <input type="file" accept="image/*" name='affidavitImg' required onChange={(e) => setFile(e.target.files[0])} /><span id='progress'></span>
                {
                    loading ?
                        <Button className="btn btn-theme btn-block" disabled><Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /><span className='ml-2'>Submitting...</span></Button> :
                        <button className="btn btn-theme btn-block mt-3" id="submit">Submit</button>
                }
            </form>
        </div >
    );
}

export default CharCert;
