import React from 'react'
import chat from '../img/chat.png';
import notes from '../img/notes.png';
import checklist from '../img/checklist.png';
import character from '../img/profile.png'

function Home(props) {
    let user = window.location.pathname.split('/')[2];
    return (
        <div className="container">
            <div className="col-md-10 mx-auto my-5">
                <div className="container mt-4">
                    <div className="row">
                        <div className="col-lg-4 col-sm-6 mb-4 mx-auto">
                            <div className="card card-body z-depth-1">
                                <div className="card-img-top">
                                    <img src={notes} alt="alt" className='img-fluid' />
                                </div>
                                <div className="mx-auto mt-3">
                                    <a href={`/u/${user}/complaint-status`} className="btn btn-theme mt-3">View Complaints</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6 mb-4 mx-auto">
                            <div className="card card-body z-depth-1">
                                <div className="card-img-top">
                                    <img src={checklist} alt="alt" className='img-fluid' />
                                </div>
                                <div className="mx-auto mt-3">
                                    <a href={`/u/${user}/apply-noc`} className="btn btn-theme mt-3">NOC Applications</a>
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
                                    <a href={`/u/${user}/character-certificate`} className="btn btn-theme mt-3" id="appointment">Character certificates</a>
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