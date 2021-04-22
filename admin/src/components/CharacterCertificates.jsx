import React from 'react'
import { useState, useEffect } from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { Card } from 'react-bootstrap'

function CharacterCertificates() {
    const [certificates, setCertificates] = useState([]);
    useEffect(() => {
        loadCertificates();
    }, []);
    const loadCertificates = async () => {
        await firebase.firestore().collection('CharCert').get().then(collection => {
            let temp_arr = [];
            collection.forEach(doc => {
                console.log(doc.data())
                temp_arr.push({
                    uid: doc.id,
                    purposeDetails: doc.data().purposeDetails,
                    purpose: doc.data().purpose,
                    anyCrimeRecord: doc.data().anyCrimeRecord,
                    affidavitImg: doc.data().affidavitImg
                })
            });
            setCertificates(temp_arr);
        }).catch(err => console.log(err.message));
    }
    return (
        <>
            <div className="container">
                <div className="row">
                    {
                        certificates && certificates.map(certificate => <CertificateCard key={Math.random()} data={certificate} />)
                    }
                </div>
            </div>
        </>
    )
}

const CertificateCard = ({ data }) => {
    return (
        <div className="col-md-4 mx-auto my-3 py-2">
            <Card>
                <Card.Header>{data.uid}</Card.Header>
                <Card.Body>
                    <p> Any Crime Record: {data.anyCrimeRecord}</p>
                    <p> Purpose: {data.purpose}</p>
                    <p> Purpose Details: {data.purposeDetails}</p>
                </Card.Body>
                <Card.Img src={data.affidavitImg} className="affidavitImg" />
            </Card>
        </div>
    )
}

export default CharacterCertificates