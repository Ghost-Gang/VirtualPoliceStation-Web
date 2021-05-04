import React from 'react'
import { useState, useEffect } from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/database'
import { Card } from 'react-bootstrap'
import Loader from './Loader'

function ViewNOCs() {
    const [NOCs, setNOCs] = useState([]);
    const [loading, setLoading] = useState(true);
    console.log(NOCs);
    useEffect(() => {
        loadNOCs();
    }, []);
    const loadNOCs = () => {
        const temp_arr = [];
        firebase.database().ref('NOC').child('Exhibition').get().then(snapshots => {
            snapshots.forEach(snapshot => {
                temp_arr.push(snapshot.val());
            })
            setNOCs(temp_arr);
            setLoading(false);
            // console.log(snapshot.);
        }).catch(err => {
            console.log(err);
        })
    }
    // console.log(complaints.length);
    return (
        <>
            {   loading ?
                <Loader /> :
                <div className="container">
                    <div className="row">
                        {
                            NOCs && NOCs.map(NOC => <NOCCard key={Math.random()} data={NOC} />)
                        }
                    </div>
                </div>
            }
        </>
    )
}

const NOCCard = ({ data }) => {
    // const [status, setStatus] = useState("");
    // // firebase.firestore().collection('Complaints').
    // const handleSubmit = () => {
    //     firebase.firestore().collection('Complaints').doc(data.uid).update({
    //         status: status
    //     })
    // }
    // console.log(status);
    return (
        <div className="col-md-4 mx-auto my-3 py-2">
            <Card>
                <Card.Header>{data.uid}</Card.Header>
                {/* <Form.Control as='select' onChange={(e) => setStatus(e.target.value)}>
                    <option >{data.status}</option>
                    <option value="inprogress">In-Progress</option>
                    <option value="approved">Approved</option>
                </Form.Control> */}
                <Card.Body>
                    <p> User ID: {data.uid}</p>
                    <p> Topic: {data.topic}</p>
                    <p> Organization Name: {data.orgName}</p>
                    <p> Member Name: {data.mFName}</p>
                    <p> Location: {data.lName}</p>
                    <p> Event start date: {data.eventStartDate}</p>
                    <p> Event end date: {data.eventEndDate}</p>
                </Card.Body>
                {/* <Card.Img src={data.evidenceImage} className="evidenceImage" /> */}
                {/* <button className="btn btn-theme mt-5 px-1" type="button" onClick={handleSubmit}>Submit</button> */}
            </Card>
        </div>
    )
}

export default ViewNOCs