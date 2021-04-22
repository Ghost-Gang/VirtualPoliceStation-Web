import React from 'react'
import { useState, useEffect } from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { Card } from 'react-bootstrap'

function ViewComplaints() {
    const [complaints, setComplaints] = useState([]);
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
                    evidenceImage: doc.data().evidenceImage
                })
            });
            setComplaints(temp_arr);
        }).catch(err => console.log(err.message));
    }
    console.log(complaints.length);
    return (
        <>
            <div className="container">
                <div className="row">
                    {
                        complaints && complaints.map(complaint => <ComplaintCard key={Math.random()} data={complaint} />)
                    }
                </div>
            </div>
        </>
    )
}

const ComplaintCard = ({ data }) => {
    return (
        <div className="col-md-4 mx-auto my-3 py-2">
            <Card>
                <Card.Header>{data.uid}</Card.Header>
                <Card.Body>
                    <p> AccusedName: {data.accusedName}</p>
                    <p> IncidentDate: {data.incidentDate}</p>
                    <p> IncidentPlace: {data.incidentPlace}</p>
                    <p> NatureOfComplaint: {data.natureOfComplaint}</p>
                    <p> SubjectOfComplaint: {data.subjectOfComplaint}</p>
                </Card.Body>
                <Card.Img src={data.evidenceImage} className="evidenceImage" />
            </Card>
        </div>
    )
}

export default ViewComplaints