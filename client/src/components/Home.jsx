import React, { useEffect } from 'react'
import chat from '../img/chat.png';
import notes from '../img/notes.png';
import note from '../img/note.png';
import profile from '../img/profile.png';
import checklist from '../img/checklist.png';
import '../css/imagehover.min.css'
import calendar from '../img/calendar.png'
import firebase from 'firebase'
import NavBar from './NavBar'

function Home(props) {
    // console.log(props.match.params.uid);
    let user = window.location.pathname.split('/')[2];
    // useEffect(() => {
    //     firebase.auth().onAuthStateChanged(user => {
    //         if (!user) {
    //             window.location.href = "/";
    //         }
    //     })
    // }, []);

    return (

        <div className="container mt-4">
            <div className="row justify-content-around">
                <div className="col-lg-4 col-xs-6 col-md-4 col-sm-6 mb-4">
                    <div className="card card-h">
                        {/* <!-- Card image --> */}
                        <figure className="imghvr-fold-up"><img src={note} alt="alt" />
                            <figcaption>
                                <p>Register a FIR</p>
                            </figcaption>
                        </figure>
                        {/* <!-- Card content --> */}
                        <div className="card-body">
                            {/* <!-- Button --> */}
                            <a href={`/u/${user}/new-fir`} className="btn btn-primary mt-3" id="newFirBtn">New FIR</a>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-xs-6 col-md-4 col-sm-6 mb-4">
                    <div className="card card-h">
                        {/* <!-- Card image --> */}
                        <figure className="imghvr-slide-up"><img src={notes} alt="alt" />
                            <figcaption>
                                <p>See FIR status</p>
                            </figcaption>
                        </figure>
                        {/* <!-- Card content --> */}
                        <div className="card-body">
                            {/* <!-- Button --> */}
                            <a href={`/u/${user}/fir-status`} className="btn btn-primary mt-3" id='firStatus'>FIR Status</a>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-xs-6 col-md-4 col-sm-6 mb-4">
                    <div className="card card-h">
                        {/* <!-- Card image --> */}
                        <figure className="imghvr-slide-up"><img src={profile} alt="alt" />
                            <figcaption>
                                <p>Take a look at your area's criminal records</p>
                            </figcaption>
                        </figure>
                        {/* <!-- Card content --> */}
                        <div className="card-body">
                            {/* <!-- Button --> */}
                            <a href="/home/past-incidents" className="btn btn-primary mt-3" id="pastIncidents">Past incidents</a>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- second row --> */}
            <div className="row justify-content-around">
                <div className="col-lg-4 col-xs-6 col-md-4 col-sm-6 mb-4">
                    <div className="card card-h">
                        {/* <!-- Card image --> */}
                        <figure className="imghvr-slide-up"><img src={checklist} alt="alt" />
                            <figcaption>

                                <p>Hassle free NOC</p>
                            </figcaption>
                        </figure>
                        {/* <!-- Card content --> */}
                        <div className="card-body">
                            {/* <!-- Button --> */}
                            <a href="/home/apply-noc" className="btn btn-primary mt-3" id="applyNoc">Apply NOC</a>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-xs-6 col-md-4 col-sm-6 mb-4">
                    <div className="card card-h">
                        {/* <!-- Card image --> */}
                        <figure className="imghvr-slide-up"><img src={chat} alt="alt" />
                            <figcaption>
                                <p>Clear your doubts, get help.</p>
                            </figcaption>
                        </figure>
                        {/* <!-- Card content --> */}
                        <div className="card-body">
                            {/* <!-- Button --> */}
                            <a href={`/u/${user}/vps-chat`} className="btn btn-primary mt-3">VPS Chat</a>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-xs-6 col-md-4 col-sm-6 mb-4">
                    <div className="card card-h">
                        {/* <!-- Card image --> */}
                        <figure className="imghvr-slide-up"><img src={calendar} alt="alt" />
                            <figcaption>
                                <p>Book appointment with officers</p>
                            </figcaption>
                        </figure>
                        {/* <!-- Card content --> */}
                        <div className="card-body card-body-cascade">
                            {/* <!-- Button --> */}
                            <a href="/home/appointment" className="btn btn-primary mt-3" id="appointment">Appointment</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home