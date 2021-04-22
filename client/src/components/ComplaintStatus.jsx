import React, { useState, useEffect } from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { Badge } from 'react-bootstrap'

function ComplaintStatus(props) {
    console.log(props);
    // let uid = window.location.pathname.split('/')[2];
    const [complaint, setComplaint] = useState({
        accusedCity: "",
        accusedDistrict: "",
        accusedLocality: "",
        accusedName: "",
        accusedPhone: "",
        accusedPincode: "",
        accusedState: "",
        complaintStatement: "",
        evidenceImage: "",
        evidenceName: "",
        imagePath: "",
        incidentDate: "",
        incidentPlace: "",
        localTime: "",
        natureOfComplaint: "",
        subjectOfComplaint: ""
    });
    // const [uid, setUid] = useState('');
    // setUid(props.user.uid);

    useEffect(() => {
        if (props.user.uid !== undefined) setData();
        console.log(props.user.uid !== '');
        // eslint-disable-next-line
    }, [props]);

    const setData = async () => {
        console.log('func calld');
        console.log(props.user.uid);
        await firebase.firestore().collection('Complaints').doc(props.user.uid).get().then(doc => {
            if (doc.exists) {
                setComplaint(doc.data());
                console.log(doc.data());
            }
            else {
                console.log('document not found');
            }
        }).catch(err => console.log(err.message));
    }

    return (
        <div className="py-md-4 my-4">
            <form className="container px-5 card card-body" id="new-complaint-form" style={{ maxWidth: "540px" }}>
                <h4 className="text-center mb-3">Complaint status</h4><Badge variant="warning">Pending</Badge>
                <hr /><h6 className='text-center'>Complaint Detail</h6><hr />
                <div className="row">
                    <div className="col-md-6 col-12">
                        <label>Nature of Complaint:</label>
                        <input type="text" className='form-control' value={complaint.natureOfComplaint} readOnly />
                    </div>
                    <div className="col-md-6 col-12 mt-md-0">
                        <label>Subject of Complaint:</label>
                        <input type="text" className='form-control' value={complaint.subjectOfComplaint} readOnly />
                    </div>
                </div>
                <label>Complaint statement:</label>
                <textarea className="form-control md-textarea" value={complaint.complaintStatement} placeholder="Complaint statement" readOnly></textarea>

                {/* ============================== */}
                <hr /><h6 className="text-center">Accused Detail</h6><hr />
                <div className="row">
                    <div className="col-12">
                        <label>Name:</label>
                        <input type="text" className="form-control" value={complaint.accusedName} placeholder="Name" readOnly />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 col-xs-12">
                        <label>Locality:</label>
                        <input type="text" value={complaint.accusedLocality} className="form-control" placeholder="Locality" readOnly />
                    </div>
                    <div className="col-md-6 col-xs-12">
                        <label>City:</label>
                        <input type="text" value={complaint.accusedCity} className="form-control" placeholder="City" readOnly />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 col-xs-12">
                        <label>District:</label>
                        <input type="text" value={complaint.accusedDistrict} className="form-control" placeholder="District" readOnly />
                    </div>
                    <div className="col-md-6 col-xs-12">
                        <label>State:</label>
                        <input type="text" value={complaint.accusedState} className="form-control" placeholder="State" readOnly />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 col-xs-12">
                        <label>Pincode:</label>
                        <input type="number" value={complaint.accusedPincode} className="form-control" placeholder="Pincode" readOnly />
                    </div>
                    <div className="col-md-6 col-xs-12">
                        <label>Phone:</label>
                        <input type="number" value={complaint.accusedPhone} className="form-control" placeholder="Phone number" readOnly />
                    </div>
                </div>

                {/* ===================================== */}
                <hr /><h6 className="text-center">Incident Detail</h6><hr />
                <div className="row">
                    <div className="col-md-6 col-12">
                        <label>Place:</label>
                        <input type="text" className="form-control" value={complaint.incidentPlace} placeholder="Incident Place" readOnly />
                    </div>
                    <div className="col-md-6 col-12">
                        <label>Date:</label>
                        <input type="text" className="form-control" value={complaint.incidentDate} placeholder="Date" readOnly />
                    </div>
                </div>
                <div className="row mt-3">
                    <label>Evidence:</label>
                    <img src={complaint.evidenceImage} alt="evidenceImage" className='img-fluid' />
                </div>
            </form>
        </div >
    )
}

export default ComplaintStatus
