import React, { useState, useEffect } from 'react'
import chat from '../img/chat.png';
import notes from '../img/notes.png';
import checklist from '../img/checklist.png';
import character from '../img/profile.png'
import firebase from 'firebase'
import 'firebase/firestore'

function Home(props) {
    let user = window.location.pathname.split('/')[2];
    const [userCount, setUserCount] = useState(0);
    const [complaintCount, setComplaintCount] = useState(0);
    const [characterCount, setCharacterCount] = useState(0);

    useEffect(() => {
        firebase.firestore().collection('User-Details').get().then(snapshot => {
            setUserCount(snapshot.size)
        }).catch(err => {
            console.log(err);
        });
        firebase.firestore().collection('Complaints').get().then(snapshot => {
            setComplaintCount(snapshot.size)
        }).catch(err => {
            console.log(err);
        });
        firebase.firestore().collection('CharCert').get().then(snapshot => {
            setCharacterCount(snapshot.size)
        }).catch(err => {
            console.log(err);
        })
    }, [])

    return (
        <div className="container">
            <div className="col-md-10 mx-auto my-5">
                <p className="text-center">Number of users: {userCount}</p>
                <p className="text-center">Number of complaints: {complaintCount}</p>
                <p className="text-center">Number of character certificates: {characterCount}</p>

                <div className="container mt-4">
                    <div className="row">
                        <div className="col-lg-4 col-sm-6 mb-4 mx-auto">
                            <div className="card card-body z-depth-1">
                                <div className="card-img-top">
                                    <img src={notes} alt="alt" className='img-fluid' />
                                </div>
                                <div className="mx-auto mt-3">
                                    <a href={`/u/${user}/view-complaints`} className="btn btn-theme mt-3">View Complaints</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6 mb-4 mx-auto">
                            <div className="card card-body z-depth-1">
                                <div className="card-img-top">
                                    <img src={checklist} alt="alt" className='img-fluid' />
                                </div>
                                <div className="mx-auto mt-3">
                                    <a href={`/u/${user}/noc-applications`} className="btn btn-theme mt-3">NOC Applications</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- second row --> */}
                    <div className="row">
                        <div className="col-lg-4 col-sm-6 mb-4 mx-auto">
                            <div className="card card-body z-depth-1">
                                <div className="card-img-top">
                                    <img src={chat} alt="alt" className='img-fluid' />
                                </div>
                                <div className="mx-auto mt-3">
                                    <a href={`/u/${user}/admin-chat`} className="btn btn-theme mt-3">Virtual Assistance</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6 mb-4 mx-aut">
                            <div className="card card-body z-depth-1">
                                <div className="card-img-top">
                                    <img src={character} alt="alt" className='img-fluid' />
                                </div>
                                <div className="mx-auto mt-3">
                                    <a href={`/u/${user}/character-certificates`} className="btn btn-theme mt-3" id="appointment">Character certificates</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home