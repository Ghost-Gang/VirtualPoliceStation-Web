import React from 'react'
import { useState, useEffect } from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'

function ViewComplaints() {
    const [complaints, setComplaints] = useState("");
    useEffect(() => {
        firebase.firestore().collection('Complaints').get().then(doc => {
            console.log(doc);
        }).catch(err => console.log(err.message));
    }, []);

    return (
        <>
            bala
        </>
    )
}

export default ViewComplaints