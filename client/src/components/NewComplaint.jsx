import React, { useState, useRef, useEffect } from 'react'
import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/firestore'
import { Form, Button, Spinner } from 'react-bootstrap'
import { useToasts } from 'react-toast-notifications'
import axios from 'axios'

function NewComplaint(props) {
    // console.log(window.location.pathname.split('/')[2]);
    let [user, setUser] = useState('');
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

    const [formData, setFormData] = useState('');
    let [loading, setLoading] = useState(false);
    const { addToast } = useToasts();
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const [file, setFile] = useState('');
    const formRef = useRef(null);
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        console.log(formData);
        const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;

        // =======================
        if (!file.type.match('image.*')) {
            return addToast('Select only images', { appearance: 'warning', autoDismiss: true });
        } else {
            let path = 'Complaints' + '/' + user.uid + '/' + formData.evidenceName;
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
                    formData.evidenceImage = URL;
                    formData.localTime = new Date().toLocaleString();
                    formData.imagePath = path;
                    console.log(URL);
                    try {
                        await firebase.firestore().collection('Complaints').doc(user.uid).set(formData);
                        axios.post(`${origin}/api/new-complaint`, { email: user.email, name: user.displayName }).then(res => {
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
            <form ref={formRef} className="container px-5 card card-body" id="new-complaint-form" style={{ maxWidth: "540px" }} onSubmit={handleSubmit} onChange={handleChange}>
                <h4 className="text-center mb-3">Register Complaint</h4>

                <hr /><h6 className='text-center'>Complaint Detail</h6><hr />
                <div className="row">
                    <div className="col-md-6 col-12">
                        <label>Nature of Complaint:</label>
                        <Form.Control as='select' name='natureOfComplaint' required>
                            <option value="">Choose..</option>
                            <option value="against-public">Againt Public</option>
                            <option value="against-org">Againts Organization</option>
                            <option value="against-police">Against Police Officer</option>
                            <option value="against-public-servant">Against Public Servant(Civil)</option>
                            <option value="wild-life">Wild life case</option>
                            <option value="against-army-and-paramilitary">Against Army and Paramilitary Force</option>
                            <option value="against-foreigners">Against Foreigners</option>
                            <option value="against-department">Against Department</option>
                            <option value="cyber-crime">Cyber crime</option>
                        </Form.Control>
                    </div>
                    <div className="col-md-6 col-12 mt-2 mt-md-0">
                        <label>Subject of Complaint:</label>
                        <Form.Control as='select' name='subjectOfComplaint' required>
                            <option value="">Choose..</option>
                            <option value="document-missing">Document missing</option>
                            <option value="land-dispute">Land dispute</option>
                            <option value="civil-dispute">Civil dispute</option>
                            <option value="family-dispute">Family dispute</option>
                            <option value="domestic-violence">Domestic violence</option>
                            <option value="others">Others</option>
                        </Form.Control>
                    </div>
                </div>
                <textarea className="form-control md-textarea mt-2" name="complaintStatement" rows="3" placeholder="Complaint statement" required></textarea>

                {/* ============================== */}
                <hr /><h6 className="text-center">Accused Detail</h6><hr />
                <div className="row">
                    <div className="col-12"><input type="text" className="form-control mt-2" name="accusedName" placeholder="Name" required /></div>
                </div>
                <div className="row">
                    <div className="col-md-6 col-xs-12"><input type="text" name="accusedLocality" className="form-control mt-2" placeholder="Locality" required /></div>
                    <div className="col-md-6 col-xs-12"><input type="text" name="accusedCity" className="form-control mt-2" placeholder="City" required /></div>
                </div>
                <div className="row">
                    <div className="col-md-6 col-xs-12"><input type="text" name="accusedDistrict" className="form-control mt-2" placeholder="District" required /></div>
                    <div className="col-md-6 col-xs-12"><input type="text" name="accusedState" className="form-control mt-2" placeholder="State" required /></div>
                </div>
                <div className="row">
                    <div className="col-md-6 col-xs-12"><input type="number" name="accusedPincode" className="form-control mt-2" placeholder="Pincode" required /></div>
                    <div className="col-md-6 col-xs-12"><input type="number" name="accusedPhone" className="form-control mt-2" placeholder="Phone number" required /></div>
                </div>

                {/* ===================================== */}
                <hr /><h6 className="text-center">Incident Detail</h6><hr />
                <div className="row">
                    <div className="col-md-6 col-12"><input type="text" className="form-control mt-2" name="incidentPlace" placeholder="Incident Place" required /></div>
                    <div className="col-md-6 col-12"><input type="date" className="form-control mt-2" name="incidentDate" placeholder="Date" required /></div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-6 col-12">
                        <label>Evidence image:</label>
                        <input type="file" accept="image/*" name='evidenceImage' onChange={(e) => setFile(e.target.files[0])} required /><span id="progress"></span>
                    </div>
                    <div className="col-md-6 col-12"><input type="text" className="form-control mt-2" name="evidenceName" placeholder="Evidence Name" onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} required /></div>
                </div>

                {/* <input type="number" className="form-control mt-3" name="otp" placeholder="Enter OTP" />
                <div className="row">
                    <div className="col-md-6"><button className="btn btn-theme mr-4 btn-md mt-3 px-3">Request OTP</button></div>
                    <div className="col-md-6"><button className="btn btn-theme btn-md mt-3 px-3">Verify</button></div>
                </div> */}
                {
                    loading ?
                        <Button className="btn btn-theme btn-block" disabled><Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /><span className='ml-2'>Submitting...</span></Button> :
                        <button className="btn btn-theme btn-block mt-3">Submit</button>
                }

            </form>
        </div>
    )
}

export default NewComplaint