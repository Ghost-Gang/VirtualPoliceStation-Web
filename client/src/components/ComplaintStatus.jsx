import React, { useState, useEffect } from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'

function ComplaintStatus() {
    let uid = window.location.pathname.split('/')[2];
    const [fir, setFir] = useState({});
    useEffect(() => {
        firebase.firestore().collection('Complaints').doc(uid).get().then(doc => {
            if (doc.exists) {
                let temp = {
                    statement: doc.data().Statement,
                    place: doc.data().CrimePlace,
                    name: doc.data().CriminalName,
                    address: doc.data().CriminalAddress,
                    image: doc.data().EvidenceImageUrl,
                    dateTime: doc.data().DateTime
                }
                setFir(temp);
                console.log(doc.data());
            }
            else {
                console.log('document not found');
            }
        }).catch(err => console.log(err.message));
    }, [])

    return (
        <div className="container">
            <div className="mx-auto" id="fir-status">
                <p>Statement: {fir.statement}</p>
                <p>CrimePlace: {fir.place}</p>
                <p>CriminalName: {fir.name}</p>
                <p>CriminalAddress:{fir.address} </p>
                <img src={fir.image} alt="evidence" className="img-fluid" />
                <p>DateTime:{fir.dateTime}</p>
            </div>
        </div>
    )
}

export default ComplaintStatus
