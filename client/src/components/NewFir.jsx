import React, { useState, useRef } from 'react'
import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/firestore'
import $ from 'jquery'
import { Form } from 'react-bootstrap'

function NewFir(props) {
    // console.log(window.location.pathname.split('/')[2]);
    let uid = window.location.pathname.split('/')[2];

    const [formData, setFormData] = useState('');
    const { crimePlace, criminalName, criminalAddress, statement, dateTime } = formData;
    const [disabled, setDisabled] = useState(false);
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    // const [filePath, setFilePath] = useState('');
    // const [url, setUrl] = useState('');
    const [evidenceName, setEvidenceName] = useState('');
    const [file, setFile] = useState('');
    const formRef = useRef(null);
    const handleSubmit = (e) => {
        e.preventDefault();
        $('#submit').html('Submitting...');
        setDisabled(true);

        // =======================
        if (!file.type.match('image.*')) {
            $('#submit').html('Submit').removeClass('disabled');
            setDisabled(false);
            return console.log('only upload images you fool');
        } else {
            let path = 'FIR' + '/' + uid + '/' + evidenceName;
            let uploadTask = firebase.storage().ref(path).put(file);
            uploadTask.on('state_changed', function (snapshot) {
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                // console.log(progress);
                document.getElementById('progress').innerHTML = Math.ceil(progress) + "%";
            }, function (err) {
                $('#submit').html('Submit');
                setDisabled(false);
                return console.log(err.message);
            }, function () {
                uploadTask.snapshot.ref.getDownloadURL().then(async function (URL) {
                    console.log(URL);
                    // setUrl(URL);
                    // setFilePath(uploadTask.snapshot.metadata.fullPath)
                    // setFilePath(uploadTask.snapshot.metadata.fullPath);
                    // console.log(filePath);
                    // console.log(url);
                    // console.log(path);
                    // console.log(formData);
                    try {
                        await firebase.firestore().collection('FIR').doc(uid).set({
                            Statement: statement,
                            CrimePlace: crimePlace,
                            CriminalName: criminalName,
                            CriminalAddress: criminalAddress,
                            EvidenceImageUrl: URL,
                            DateTime: dateTime,
                            LocalTime: new Date().toLocaleString(),
                            Path: path
                        })
                        // console.log(filePath, url)
                        $('#submit').html('Submit');
                        setDisabled(false);
                        formRef.current.reset();
                        console.log('submitted successfully')
                    } catch (err) {
                        $('#submit').html('Submit');
                        setDisabled(false);
                        console.log(err.message)
                    }

                });
            });
        }
        // =======================








    }
    // ===================
    //New FIr
    // $('#newFir').click(function () {
    // $('#newFir').html('<span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>Submitting...').addClass('disabled');
    // var cUser = auth.currentUser;
    // var statement = document.getElementById('statement').value;
    // var evidenceFile = document.getElementById('evidence').files[0];
    // var crimePlace = document.getElementById('crimePlace').value;
    // var criminalName = document.getElementById('criminalName').value;
    // var criminalAddress = document.getElementById('criminalAddress').value;
    // var dateTime = document.getElementById('dateTime').value;

    // db.collection('FIR').doc(auth.currentUser.email).set({
    //     Statement: statement,
    //     CrimePlace: crimePlace,
    //     CriminalName: criminalName,
    //     CriminalAddress: criminalAddress,
    //     EvidenceImageUrl: '',
    //     DateTime: dateTime,
    //     LocalTime: new Date().toLocaleString()
    // }).then(() => {
    //     var filePath = "FIR" + '/' + cUser.email + '/' + evidenceFile.name;
    //     return firebase.storage().ref(filePath).put(evidenceFile).then((fileSnapshot) => {
    //         return fileSnapshot.ref.getDownloadURL().then(url => {
    //             window.alert('FIR submitted successfully.');
    //             window.location.href = 'home.html';
    //             return db.collection('FIR').doc(auth.currentUser.email).update({
    //                 EvidenceImageUrl: url,
    //                 StorageUrl: fileSnapshot.metadata.fullPath
    //             });
    //         });
    //     });
    // }).catch(error => {
    //     console.log(error.message);
    //     $('#newFir').html('SUBMIT').removeClass('disabled');
    // });
    // // });
    // ===================
    return (
        <div className="py-md-4 my-4">
            <form ref={formRef} className="container px-5 card card-body" id="new-fir-form" style={{ maxWidth: "540px" }} onSubmit={handleSubmit} onChange={handleChange}>
                <h4 className="text-center mb-3">Register FIR</h4>

                <u><h6>Complaint Detail</h6></u>
                <div className="row">
                    <div className="d-inline-block col-md-6 col-12 padding">
                        <code>Nature of Complaint</code>
                        <Form.Control as='select' defaultValue="Choose">
                            <option value="">Select</option>
                            <option value="">Againt Public</option>
                            <option value="">Againts Organization</option>
                            <option value="">Against Police Officer</option>
                            <option value="">Against Public Servant(Civil)</option>
                            <option value="">Wild life case</option>
                            <option value="">Against Army and Paramilitary Force</option>
                            <option value="">Against Foreigners</option>
                            <option value="">Against Department</option>
                            <option value="">Cyber crime</option>
                        </Form.Control>
                    </div>
                    <div className="d-inline-block col-md-6 col-12 padding">
                        <code>Subject of Complaint</code>
                        <Form.Control as='select' defaultValue="Choose">
                            <option value="">Select</option>
                            <option value="">Document missing</option>
                            <option value="">Land dispute</option>
                            <option value="">Civil dispute</option>
                            <option value="">Family dispute</option>
                            <option value="">Domestic violence</option>
                            <option value="">Others</option>
                        </Form.Control>
                    </div>
                </div>
                <textarea className="form-control md-textarea mt-2" name="statement" rows="4" placeholder="Complaint statement" required></textarea>

                <u><h6 className="mt-3">Accused Detail</h6></u>
                <div className="row">
                    <div className="d-inline-block col-md-6 col-12 padding"><input type="text" className="form-control mt-1" name="criminalName" placeholder="Name" required /></div>
                    <div className="d-inline-block col-md-6 col-12 padding"><input type="text" className="form-control mt-1" name="criminalNumber" placeholder="Phone number" required /></div>
                </div>
                <input type="text" className="form-control mt-2" name="criminalAddress" placeholder="Address" required />

                <u><h6 className="mt-3">Incident Detail</h6></u>
                <div className="row">
                    <div className="d-inline-block col-md-6 col-12 padding"><input type="text" className="form-control mt-1" name="crimePlace" placeholder="Crime Place" required /></div>
                    <div className="d-inline-block col-md-6 col-12 padding"><input type="date" className="form-control mt-1" name="crimeDate" placeholder="Date" required /></div>
                </div>
                <div className="row mt-3">
                    <div className="d-inline-block col-md-6 col-12 padding">
                        <code>Evidence image</code>
                        <input type="file" accept="image/*" name="evidence" onChange={(e) => setFile(e.target.files[0])} required /><span id="progress"></span>
                    </div>
                    <div className="d-inline-block col-md-6 col-12 padding"><input type="text" className="form-control mt-1 mt-md-2" name="evidenceName" placeholder="Evidence Name" required onChange={(e) => setEvidenceName(e.target.value.replace(/\s+/g, ''))} /></div>
                </div>

                {/* <input type="number" className="form-control mt-3" name="otp" placeholder="Enter OTP" />
                <div className="row">
                    <div className="col-md-6"><button className="btn btn-primary mr-4 btn-md mt-3 px-3">Request OTP</button></div>
                    <div className="col-md-6"><button className="btn btn-primary btn-md mt-3 px-3">Verify</button></div>
                </div> */}
                <button className="btn btn-primary btn-block mt-3" id="submit" disabled={disabled} name="newFir">Submit</button>
            </form>
        </div >
    )
}

export default NewFir