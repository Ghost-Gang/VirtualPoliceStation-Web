import React from 'react'
import chat from '../img/chat.png';
import notes from '../img/notes.png';
import note from '../img/note.png';
import profile from '../img/profile.png';
import checklist from '../img/checklist.png';
import calendar from '../img/calendar.png'
import police from '../img/police.png'

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
        <div className="container">
            <div>
                <div className="row mt-md-5">
                    <div className="col d-md-none"><img src={police} alt="police" className='img-fluid' style={{ maxHeight: '500' + 'px' }} /></div>
                    <div className="col-md-8 pt-5 px-4" id='description'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo hic culpa quis ad perferendis eaque possimus inventore nostrum praesentium, cupiditate cumque, officiis quae totam animi similique! Debitis accusamus ad blanditiis?</div>
                    <div className="col d-none d-md-block"><img src={police} alt="police" className='img-fluid' style={{ maxHeight: '500' + 'px' }} /></div>
                </div>
            </div>

            <div className="col-md-10 mx-auto my-5">
                <div className="container mt-4">
                    <div className="row">
                        <div className="col-lg-4 col-sm-6 mb-4">
                            <div className="card card-body z-depth-1">
                                <div className="card-img-top">
                                    <img src={note} alt="alt" className='img-fluid' />
                                </div>
                                <div className="mx-auto mt-3">
                                    <a href={`/u/${user}/new-complaint`} className="btn btn-theme mt-3">New Complaint</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6 mb-4">
                            <div className="card card-body z-depth-1">
                                <div className="card-img-top">
                                    <img src={notes} alt="alt" className='img-fluid' />
                                </div>
                                <div className="mx-auto mt-3">
                                    <a href={`/u/${user}/complaint-status`} className="btn btn-theme mt-3">Complaint status</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6 mb-4">
                            <div className="card card-body z-depth-1">
                                <div className="card-img-top">
                                    <img src={profile} alt="alt" className='img-fluid' />
                                </div>
                                <div className="mx-auto mt-3">
                                    <a href={`/u/${user}/past-incidents`} className="btn btn-theme mt-3" id="pastIncidents">Past incidents</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- second row --> */}
                    <div className="row">
                        <div className="col-lg-4 col-sm-6 mb-4">
                            <div className="card card-body z-depth-1">
                                <div className="card-img-top">
                                    <img src={checklist} alt="alt" className='img-fluid' />
                                </div>
                                <div className="mx-auto mt-3">
                                    <a href={`/u/${user}/apply-noc`} className="btn btn-theme mt-3">Apply for NOC</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6 mb-4">
                            <div className="card card-body z-depth-1">
                                <div className="card-img-top">
                                    <img src={chat} alt="alt" className='img-fluid' />
                                </div>
                                <div className="mx-auto mt-3">
                                    <a href={`/u/${user}/vps-chat`} className="btn btn-theme mt-3">Virtual Assistance</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6 mb-4">
                            <div className="card card-body z-depth-1">
                                <div className="card-img-top">
                                    <img src={calendar} alt="alt" className='img-fluid' />
                                </div>
                                <div className="mx-auto mt-3">
                                    <a href={`/u/${user}/character-certificate`} className="btn btn-theme mt-3" id="appointment">Character certificate</a>
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