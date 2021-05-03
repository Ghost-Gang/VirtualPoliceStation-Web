import React from 'react'
import { useState, useEffect } from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { Card, Form } from 'react-bootstrap'
import Loader from './Loader'

function ViewComplaints() {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        loadComplaints();
    }, []);
    const loadComplaints = async () => {
        await firebase.firestore().collection('Complaints').get().then(collection => {
            let temp_arr = [];
            collection.forEach(doc => {
                console.log(doc.data())
                temp_arr.push({
                    uid: doc.id,
                    accusedName: doc.data().accusedName,
                    incidentDate: doc.data().incidentDate,
                    incidentPlace: doc.data().incidentPlace,
                    natureOfComplaint: doc.data().natureOfComplaint,
                    subjectOfComplaint: doc.data().subjectOfComplaint,
                    evidenceImage: doc.data().evidenceImage,
                    status: doc.data().status
                })
            });
            setComplaints(temp_arr);
            setLoading(false);
        }).catch(err => console.log(err.message));
    }
    console.log(complaints.length);
    return (
        <>
            {
                loading ? <Loader /> :
                    <div className="container">
                        <div className="row">
                            {
                                complaints && complaints.map(complaint => <ComplaintCard key={Math.random()} data={complaint} />)
                            }
                        </div>
                    </div>
            }
        </>
    )
}

const ComplaintCard = ({ data }) => {
    const [status, setStatus] = useState("");
    // firebase.firestore().collection('Complaints').
    const handleSubmit = () => {
        firebase.firestore().collection('Complaints').doc(data.uid).update({
            status: status
        })
    }
    console.log(status);
    return (
        <div className="col-md-4 mx-auto my-3 py-2">
            <Card>
                <Card.Header>{data.uid}</Card.Header>
                <Form.Control as='select' onChange={(e) => setStatus(e.target.value)}>
                    <option >{data.status}</option>
                    <option value="inprogress">In-Progress</option>
                    <option value="approved">Approved</option>
                </Form.Control>
                <Card.Body>
                    <p> AccusedName: {data.accusedName}</p>
                    <p> IncidentDate: {data.incidentDate}</p>
                    <p> IncidentPlace: {data.incidentPlace}</p>
                    <p> NatureOfComplaint: {data.natureOfComplaint}</p>
                    <p> SubjectOfComplaint: {data.subjectOfComplaint}</p>
                </Card.Body>
                <Card.Img src={data.evidenceImage} className="evidenceImage" />
                <button className="btn btn-theme mt-5 px-1" type="button" onClick={handleSubmit}>Submit</button>
            </Card>
        </div>
    )
}

export default ViewComplaints