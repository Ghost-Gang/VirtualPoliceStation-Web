import React, { useState, useEffect } from 'react'
import { Tab, Tabs, Form, Button, Spinner } from 'react-bootstrap'
import firebase from 'firebase/app'
import 'firebase/database'
import axios from 'axios'
import { useToasts } from 'react-toast-notifications'

function ApplyNoc() {
    let [user, setUser] = useState('');
    let [origin, setOrigin] = useState('');

    useEffect(() => {
        firebase.auth().onAuthStateChanged(User => {
            if (User) {
                setUser(User);
            }
        });
        window.location.port === "3000" ? setOrigin('http://localhost:5000') : setOrigin(process.env.REACT_APP_server_address);
    }, []);

    const [exhibitionData, setExhibitionData] = useState({ topic: "exhibition" });
    const [processionData, setProcessionData] = useState({ topic: "procession" });
    const [protestData, setProtestData] = useState({ topic: "protest" });
    const [loudspeakerData, setLoudspeakerData] = useState({ topic: "loudspeaker" });
    const [loading, setLoading] = useState(false);
    const { addToast } = useToasts();

    // Exhibition
    const handleSubmitExhibition = e => {
        e.preventDefault();
        setLoading(true);
        console.log(exhibitionData);
        return firebase.database().ref('NOC').child('Exhibition').push(exhibitionData, err => {
            if (err) {
                console.log(err);
                setLoading(false)
            }
            else {
                axios.post(`${origin}/api/noc`, { email: user.email, name: user.displayName }).then(res => {
                    if (res.data.message) {
                        addToast(res.data.message, { appearance: 'info', autoDismiss: true });
                    } else {
                        addToast('Submitted successfully', { appearance: 'success', autoDismiss: true });
                    }
                    setLoading(false);
                }).catch(err => {
                    setLoading(false);
                    addToast(err.message, { appearance: 'error', autoDismiss: true });
                });
            }
        })

    }
    const handleChangeExhibition = e => {
        setExhibitionData({ ...exhibitionData, [e.target.name]: e.target.value });
    }

    // Procession
    const handleSubmitProcession = e => {
        e.preventDefault();
        console.log(processionData);
    }
    const handleChangeProcession = e => {
        setProcessionData({ ...processionData, [e.target.name]: e.target.value });
    }

    // Protest
    const handleSubmitProtest = e => {
        e.preventDefault();
        console.log(protestData);
    }
    const handleChangeProtest = e => {
        setProtestData({ ...protestData, [e.target.name]: e.target.value });
    }


    // Loudspeaker
    const handleSubmitLoudspeaker = e => {
        e.preventDefault();
        console.log(loudspeakerData);
    }
    const handleChangeLoudspeaker = e => {
        setLoudspeakerData({ ...loudspeakerData, [e.target.name]: e.target.value });
    }

    return (
        <div className="col-12 col-md-9 mx-auto my-5">
            <Tabs fill variant='pills' defaultActiveKey="exhibition" id="uncontrolled-tab-example">
                <Tab eventKey="exhibition" title="NOC for Mela / Exhibition">
                    <form className='col-12 col-md-11 mt-4 mx-auto card card-body px-md-5' onSubmit={handleSubmitExhibition} onChange={handleChangeExhibition}>
                        {/* ============================== */}
                        <hr /><h6 className="text-center">Organization Details</h6><hr />
                        <div className="row">
                            <div className="col-md-6 col-12"><input type="text" name="orgName" className="form-control mb-2" placeholder="Organization Name" required /></div>
                            <div className="col-md-6 col-12"><input type="number" name="orgPhone" className="form-control mb-2" placeholder="Organization Phone" required /></div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-12"><input type="text" name="orgLocality" className="form-control mb-2 mr-auto" placeholder="House number / locality" required /></div>
                            <div className="col-md-6 col-12"><input type="text" name="orgCity" className="form-control mb-2 mr-auto" placeholder="City" required /></div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-12"><input type="text" name="orgDistrict" className="form-control mb-2 mr-auto" placeholder="District" required /></div>
                            <div className="col-md-6 col-12"><input type="text" name="orgState" className="form-control mb-2 mr-auto" placeholder="State" required /></div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-12"><input type="number" name="orgPin" className="form-control mb-2" placeholder="Pincode" required /></div>
                            <div className="col-md-6 col-12"><input type="text" name="orgPS" className="form-control mb-2 mr-auto" placeholder="Police Station" required /></div>
                        </div>

                        <hr /><h6 className="text-center">Organizing member details</h6><hr />
                        <div className="row">
                            <div className="col-md-6 col-12"><input type="text" name="mFName" className="form-control mb-2" placeholder="First Name" required /></div>
                            <div className="col-md-6 col-12"><input type="text" name="mLName" className="form-control mb-2 mr-auto" placeholder="Last Name" required /></div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-12"><input type="text" name="mRole" className="form-control mb-2" placeholder="Role" required /></div>
                            <div className="col-md-6 col-12"><input type="text" name="mDesignation" className="form-control mb-2 mr-auto" placeholder="Designation" required /></div>
                        </div>

                        {/* ============================== */}
                        <hr /><h6 className="text-center">Location Details</h6><hr />
                        <div className="row">
                            <div className="col-md-6 col-12"><input type="text" name="lName" className="form-control mb-2" placeholder="Location Name" required /></div>
                            <div className="col-md-6 col-12">
                                <div className="row">
                                    <div className="col"><input type="number" name="lArea" className="form-control" placeholder="Area in Sq.Ft" required /></div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-12 mt-2">
                                <Form.Control as="select" name="lNatureOfStructure" className='form-control'>
                                    <option>Choose Nature of Structure</option>
                                    <option>Temporary</option>
                                    <option>Permanent</option>
                                </Form.Control>
                            </div>
                            <div className="col-md-6 col-12 mt-2">
                                <select name="lTypeOfStructure" className='form-control'>
                                    <option value="">Choose type of Structure</option>
                                    <option value="open">Open</option>
                                    <option value="closed">Closed</option>
                                </select>
                            </div>
                        </div>

                        {/* ============================== */}
                        <hr /><h6 className="text-center">Details of the Event</h6><hr />
                        <div className="row">
                            <div className="col">
                                <Form.Control as="select" name="eventType" id="" className='form-control'>
                                    <option>Choose type of event</option>
                                    <option value="musical">Musical</option>
                                    <option value="ecudational">Educational</option>
                                    <option value="bollywood">Bollywood</option>
                                    <option value="religious">Religious</option>
                                    <option value="public">Public</option>
                                </Form.Control>
                            </div>
                        </div>
                        <div className='row mt-3'>
                            <div className="col-md-6 col-12">
                                <div className="row">
                                    <div className="col pr-0"><label htmlFor="start-date" className='mt-2'>Start Date:</label></div>
                                    <div className="col pl-0"><input type="date" name="eventStartDate" className="form-control mb-2" placeholder="Start Date" required /></div>
                                </div>
                            </div>
                            <div className="col-md-6 col-12">
                                <div className="row">
                                    <div className="col pr-0"><label htmlFor="end-date" className='mt-2'>End Date:</label></div>
                                    <div className="col pl-0"><input type="date" name="eventEndDate" className="form-control mb-2 mr-auto" placeholder="End Date" required /></div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-12">
                                <div className='row'>
                                    <div className="col"><label>Start time of Event:</label></div>
                                    <div className="col-4"><input type="time" name="eventStartTime" required /></div>
                                </div>
                            </div>
                            <div className="col-md-6 col-12">
                                <div className='row'>
                                    <div className="col"><label>Proposed time limit of Event:</label></div>
                                    <div className="col-4"><input type="time" name="eventTimeLimit" required /></div>
                                </div>
                            </div>
                        </div>

                        {/* ============================== */}
                        <hr /><h6 className='text-center'>Traffic security details</h6><hr />
                        <div className="row mt-1">
                            <div className="col-md-6 col-12"><label>Space made available for parking:</label></div>
                            <div className="col-md-6 col-12">
                                <div className="row">
                                    <div className="col">
                                        <Form.Check type="radio" label="Yes" name="spaceForParking" className="ml-3" />
                                    </div>
                                    <div className="col">
                                        <Form.Check type="radio" label="No" name="spaceForParking" className="ml-3" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-1">
                            <div className="col-md-6 col-12"><label>Proposed number of security cameras:</label></div>
                            <div className="col-md-6 col-12"><input type="number" name="cameraCount" id="" className="form-control" required /></div>
                        </div>
                        {
                            loading ?
                                <Button className="btn btn-theme btn-block" disabled><Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /><span className='ml-2'>Submitting...</span></Button> :
                                <button className="btn btn-theme btn-block mt-3">Submit</button>
                        }
                    </form>
                </Tab>

                <Tab eventKey="procession" title="NOC for Procession">
                    <form className='col-12 col-md-11 mt-4 mx-auto card card-body px-md-5' onSubmit={handleSubmitProcession} onChange={handleChangeProcession}>
                        {/* ============================== */}
                        <hr /><h6 className="text-center">Organization Details</h6><hr />
                        <div className="row">
                            <div className="col-md-6 col-12"><input type="text" name="orgName" className="form-control mb-2" placeholder="Organization Name" required /></div>
                            <div className="col-md-6 col-12"><input type="number" name="orgPhone" className="form-control mb-2" placeholder="Organization Phone" required /></div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-12"><input type="text" name="orgLocality" className="form-control mb-2 mr-auto" placeholder="House number / locality" required /></div>
                            <div className="col-md-6 col-12"><input type="text" name="orgCity" className="form-control mb-2 mr-auto" placeholder="City" required /></div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-12"><input type="text" name="orgDistrict" className="form-control mb-2 mr-auto" placeholder="District" required /></div>
                            <div className="col-md-6 col-12"><input type="text" name="orgState" className="form-control mb-2 mr-auto" placeholder="State" required /></div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-12"><input type="number" name="orgPin" className="form-control mb-2" placeholder="Pincode" required /></div>
                            <div className="col-md-6 col-12"><input type="text" name="orgPS" className="form-control mb-2 mr-auto" placeholder="Police Station" required /></div>
                        </div>

                        {/* ============================== */}
                        <hr /><h6 className="text-center">Details of procession</h6><hr />

                        <div className="row">
                            <div className="col-md-6 col-12">
                                <Form.Control as="select" name="typeOfProcession" className='form-control mt-2' required>
                                    <option >Choose type of Procession</option>
                                    <option value="agitation">Agitation</option>
                                    <option value="general">General</option>
                                    <option value="others">Others</option>
                                    <option value="political">Political</option>
                                    <option value="religious">Religious</option>
                                </Form.Control>
                                <div className='row mt-2'>
                                    <div className="col"><label>Time limit:</label></div>
                                    <div className="col-4 pr-0"><input type="time" name="timeLimit" required /></div>
                                </div>
                            </div>
                            <div className="col-md-6 col-12">
                                <label>Brief description:</label>
                                <textarea name="description" cols="30" rows="3" className="form-control" required></textarea>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6 col-12 mt-3">
                                <label>Starting point:</label>
                                <input type="text" name="startLocality" className="form-control mb-2 mr-auto" placeholder="House number / locality" required />
                                <input type="text" name="startCity" className="form-control mb-2 mr-auto" placeholder="City" required />
                                <input type="text" name="startDistrict" className="form-control mb-2 mr-auto" placeholder="District" required />
                                <input type="text" name="startState" className="form-control mb-2 mr-auto" placeholder="State" required />
                                <input type="number" name="startPin" className="form-control mb-2" placeholder="Pincode" required />
                                <input type="text" name="startPs" className="form-control mb-2 mr-auto" placeholder="Police Station" required />
                            </div>
                            <div className="col-md-6 col-12 mt-3">
                                <label>Ending point:</label>
                                <input type="text" name="endLocality" className="form-control mb-2 mr-auto" placeholder="House number / locality" required />
                                <input type="text" name="endCity" className="form-control mb-2 mr-auto" placeholder="City" required />
                                <input type="text" name="endDistrict" className="form-control mb-2 mr-auto" placeholder="District" required />
                                <input type="text" name="endState" className="form-control mb-2 mr-auto" placeholder="State" required />
                                <input type="number" name="endPin" className="form-control mb-2" placeholder="Pincode" required />
                                <input type="text" name="endPs" className="form-control mb-2 mr-auto" placeholder="Police Station" required />
                            </div>
                        </div>
                        <button type="submit" className='btn btn-block btn-theme mt-3'>Submit</button>
                    </form>
                </Tab>

                <Tab eventKey="protest" title="NOC for Protest">
                    <form className='col-12 col-md-11 mt-4 mx-auto card card-body px-md-5' onChange={handleChangeProtest} onSubmit={handleSubmitProtest}>

                        {/* ============================== */}
                        <hr /><h6 className="text-center">Organization Details</h6><hr />
                        <div className="row">
                            <div className="col-md-6 col-12"><input type="text" name="orgName" className="form-control mb-2" placeholder="Organization Name" required /></div>
                            <div className="col-md-6 col-12"><input type="number" name="orgPhone" className="form-control mb-2" placeholder="Organization Phone" required /></div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-12"><input type="text" name="orgLocality" className="form-control mb-2 mr-auto" placeholder="House number / locality" required /></div>
                            <div className="col-md-6 col-12"><input type="text" name="orgCity" className="form-control mb-2 mr-auto" placeholder="City" required /></div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-12"><input type="text" name="orgDistrict" className="form-control mb-2 mr-auto" placeholder="District" required /></div>
                            <div className="col-md-6 col-12"><input type="text" name="orgState" className="form-control mb-2 mr-auto" placeholder="State" required /></div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-12"><input type="number" name="orgPin" className="form-control mb-2" placeholder="Pincode" required /></div>
                            <div className="col-md-6 col-12"><input type="text" name="orgPS" className="form-control mb-2 mr-auto" placeholder="Police Station" required /></div>
                        </div>

                        <hr /><h6 className="text-center">Details of protest</h6><hr />
                        <div className="row">
                            <div className="col-md-6 col-12">
                                <label htmlFor="">Organization / Person against the protest:</label>
                            </div>
                            <div className="col-md-6 col-12">
                                <input type="text" name="protestAgainst" className="form-control mb-2" placeholder="Name goes here" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-12 mt-2">
                                <div className="row">
                                    <div className="col pr-md-0"><label htmlFor="protestPlace">Place of protest</label></div>
                                    <div className="col pl-md-0"><input type="text" name="protestPlace" className="form-control mb-2" placeholder="Place" required /></div>
                                </div>
                            </div>
                            <div className="col-md-6 col-12 mt-2">
                                <div className="row">
                                    <div className="col-6"><label htmlFor="">Type of structure</label></div>
                                    <div className="col-6 ">
                                        <Form.Control as="select" name="" id="" className='form-control px-1'>
                                            <option>Choose..</option>
                                            <option value="open">Open</option>
                                            <option value="clsed">Closed</option>
                                        </Form.Control>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-12 mt-2">
                                <div className="row">
                                    <div className="col"><label>Start time of Event:</label></div>
                                    <div className="col-4"><input type="time" name="eventStartTime" id="" className='mt-2' required /></div>
                                </div>
                            </div>
                            <div className="col-md-6 col-12 mt-2">
                                <div className="row">
                                    <div className="col"><label>Proposed time limit of Event:</label></div>
                                    <div className="col-4"><input type="time" name="eventTimeLimit" id="" className='mt-2' required /></div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-12 mt-2">
                                <div className="row">
                                    <div className="col-4 pr-0"><label>Start date:</label></div>
                                    <div className="col-8 pl-0"><input type="date" name="eventStartDate" className="form-control mb-2" placeholder="Start Date" required /></div>
                                </div>
                            </div>
                            <div className="col-md-6 col-12 mt-2">
                                <div className="row">
                                    <div className="col-4 pr-0"><label>End date:</label></div>
                                    <div className="col-8 pl-0"><input type="date" name="eventEndDate" className="form-control mb-2" placeholder="End Date" required /></div>
                                </div>
                            </div>
                        </div>
                        <textarea name="protestDescription" id="" cols="30" rows="3" className='form-control mt-2 mb-3' placeholder='Brief description'></textarea>
                        <button type="submit" className='btn btn-theme btn-block'>Submit</button>
                    </form>
                </Tab>

                <Tab eventKey="loudSpeaker" title="NOC for use of loudspeakers">
                    <form className='col-12 col-md-11 mt-4 mx-auto card card-body px-md-5' onChange={handleChangeLoudspeaker} onSubmit={handleSubmitLoudspeaker}>

                        {/* ============================== */}
                        <hr /><h6 className="text-center">Vehicle Details</h6><hr />
                        <div className="row">
                            <div className="col-md-6 col-12"><input type="text" name="vNumber" className="form-control mb-2" placeholder="Vehicle Reg. number" required /></div>
                            <div className="col-md-6 col-12"><input type="text" name="vDriverName" className="form-control mb-2" placeholder="Driver Name" required /></div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-12"><input type="text" name="vDriverLicenseNumber" className="form-control mb-2" placeholder="Driver license number" required /></div>
                        </div>

                        {/* ============================== */}
                        <hr /><h6 className="text-center">Location Details</h6><hr />
                        <div className="row">
                            <div className="col-md-6 col-12"><input type="text" name="ownerName" className="form-control mb-2" placeholder="Owner name" required /></div>
                            <div className="col-md-6 col-12"><input type="number" name="ownerMobile" className="form-control mb-2" placeholder="Mobile number" required /></div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-md-6 col-12">
                                <input type="text" name="soundIntensity" className="form-control" placeholder="Sound intensity" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-12">
                                <div className="row">
                                    <div className="col-4 pr-0"><label>Start date:</label></div>
                                    <div className="col-8 pl-0"><input type="date" name="startDate" className="form-control mb-2" required /></div>
                                </div>
                            </div>
                            <div className="col-md-6 col-12">
                                <div className="row">
                                    <div className="col-4 pr-0"><label>End date:</label></div>
                                    <div className="col-8 pl-0"><input type="date" name="endDate" className="form-control mb-2" required /></div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-12 mt-2">
                                <div className="row">
                                    <div className="col"><label>Start time of Event:</label></div>
                                    <div className="col-4"><input type="time" name="startTime" required /></div>
                                </div>
                            </div>
                            <div className="col-md-6 col-12 mt-2">
                                <div className="row">
                                    <div className="col"><label>Proposed time limit of Event:</label></div>
                                    <div className="col-4"><input type="time" name="timeLimit" required /></div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-12 mt-2"><input type="text" name="locality" className="form-control mb-2 mr-auto" placeholder="House number / locality" required /></div>
                            <div className="col-md-6 col-12 mt-2"><input type="text" name="city" className="form-control mb-2 mr-auto" placeholder="City" required /></div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-12"><input type="text" name="district" className="form-control mb-2 mr-auto" placeholder="District" required /></div>
                            <div className="col-md-6 col-12"><input type="text" name="state" className="form-control mb-2 mr-auto" placeholder="State" required /></div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-12"><input type="number" name="pin" className="form-control mb-2" placeholder="Pincode" required /></div>
                            <div className="col-md-6 col-12"><input type="text" name="ps" className="form-control mb-2 mr-auto" placeholder="Police Station" required /></div>
                        </div>
                        <button type="submit" className='btn btn-theme btn-block mt-3'>Submit</button>
                    </form>
                </Tab>
            </Tabs >
        </div >

    )
}

export default ApplyNoc
