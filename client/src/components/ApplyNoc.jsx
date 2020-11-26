import React from 'react'
import { Tab, Tabs, Form, Nav } from 'react-bootstrap'

function ApplyNoc() {
    return (
        <div className="col-12 col-md-9 mx-auto my-5">
            <Tabs fill variant='pills' defaultActiveKey="exhibition" id="uncontrolled-tab-example">
                <Tab eventKey="exhibition" title="NOC for Mela / Exhibition">
                    <form className='col-12 col-md-11 mt-4 mx-auto card card-body px-md-5'>

                        {/* ============================== */}
                        <hr /><h6 className="text-center">Organization Details</h6><hr />
                        <div className="row">
                            <div className="col-md-6 col-12"><input type="text" name="fname" className="form-control mb-2" placeholder="Organization Name" /></div>
                            <div className="col-md-6 col-12"><input type="number" name="lname" className="form-control mb-2" placeholder="Organization Phone" /></div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-12"><input type="text" name="address" className="form-control mb-2 mr-auto" placeholder="House number / locality" /></div>
                            <div className="col-md-6 col-12"><input type="text" name="city" className="form-control mb-2 mr-auto" placeholder="City" /></div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-12"><input type="text" name="district" className="form-control mb-2 mr-auto" placeholder="District" /></div>
                            <div className="col-md-6 col-12"><input type="text" name="state" className="form-control mb-2 mr-auto" placeholder="State" /></div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-12"><input type="number" name="pin" className="form-control mb-2" placeholder="Pinlabel" /></div>
                            <div className="col-md-6 col-12"><input type="text" name="state" className="form-control mb-2 mr-auto" placeholder="Police Station" /></div>
                        </div>
                        <hr /><h6 className="text-center">Organizing member details</h6><hr />
                        <div className="row">
                            <div className="col-md-6 col-12"><input type="text" name="pin" className="form-control mb-2" placeholder="First Name" /></div>
                            <div className="col-md-6 col-12"><input type="text" name="state" className="form-control mb-2 mr-auto" placeholder="Last Name" /></div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-12"><input type="text" name="pin" className="form-control mb-2" placeholder="Role" /></div>
                            <div className="col-md-6 col-12"><input type="text" name="state" className="form-control mb-2 mr-auto" placeholder="Designation" /></div>
                        </div>

                        {/* ============================== */}
                        <hr /><h6 className="text-center">Location Details</h6><hr />
                        <div className="row">
                            <div className="col-md-6 col-12"><input type="text" name="pin" className="form-control mb-2" placeholder="Location Name" /></div>
                            <div className="col-md-6 col-12">
                                <div className="row">
                                    <div className="col"><input type="number" name="state" className="form-control" placeholder="Area" /></div>
                                    <div className="col">
                                        <select name="" id="" className="form-control ml-auto">
                                            <option value="">Sq. Mts.</option>
                                            <option value="">Sq. Feet</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-12 mt-2">
                                <select name="structure" id="" className='form-control' value='how'>
                                    <option>Choose Nature of Structure</option>
                                    <option>Temporary</option>
                                    <option>Permanent</option>
                                </select>
                            </div>
                            <div className="col-md-6 col-12 mt-2">
                                <select name="" id="" className='form-control'>
                                    <option value="">Choose type of Structure</option>
                                    <option value="">Open</option>
                                    <option value="">Close</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-12"></div>
                            <div className="col-md-6 col-12"></div>
                        </div>

                        {/* ============================== */}
                        <hr /><h6 className="text-center">Details of the Event</h6><hr />
                        <div className="row">
                            <div className="col">
                                <select name="" id="" className='form-control'>
                                    <option value="">Choose type of event</option>
                                    <option value="">Musical</option>
                                    <option value="">Educational</option>
                                    <option value="">Bollywood</option>
                                    <option value="">Religious</option>
                                    <option value="">Public</option>
                                </select>
                            </div>
                        </div>
                        <div className='row mt-3'>
                            <div className="col-md-6 col-12">
                                <div className="row">
                                    <div className="col pr-0"><label htmlFor="start-date" className='mt-2'>Start Date:</label></div>
                                    <div className="col pl-0"><input type="date" name="pin" className="form-control mb-2" placeholder="Start Date" /></div>
                                </div>
                            </div>
                            <div className="col-md-6 col-12">
                                <div className="row">
                                    <div className="col pr-0"><label htmlFor="end-date" className='mt-2'>End Date:</label></div>
                                    <div className="col pl-0"><input type="date" name="state" className="form-control mb-2 mr-auto" placeholder="End Date" /></div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-12">
                                <div className='row'>
                                    <div className="col"><label>Start time of Event:</label></div>
                                    <div className="col-4"><input type="time" name="" id="" /></div>
                                </div>
                            </div>
                            <div className="col-md-6 col-12">
                                <div className='row'>
                                    <div className="col"><label>Proposed time limit of Event:</label></div>
                                    <div className="col-4"><input type="time" name="" id="" /></div>
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
                                        <Form.Check type="radio" label="Yes" id="yes" name="radio" className="ml-3" />
                                    </div>
                                    <div className="col">
                                        <Form.Check type="radio" label="No" id="no" name="radio" className="ml-3" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-1">
                            <div className="col-md-6 col-12"><label>Proposed number of security cameras:</label></div>
                            <div className="col-md-6 col-12"><input type="number" name="" id="" className="form-control" /></div>
                        </div>
                        <button type="submit" className='btn btn-block btn-primary my-3'>Submit</button>
                    </form>
                </Tab>

                <Tab eventKey="procession" title="NOC for Procession">
                    <form className='col-12 col-md-11 mt-4 mx-auto card card-body px-md-5'>

                        {/* ============================== */}
                        <hr /><h6 className="text-center">Organization Details</h6><hr />
                        <div className="row">
                            <div className="col-md-6 col-12"><input type="text" name="fname" className="form-control mb-2" placeholder="Organization Name" /></div>
                            <div className="col-md-6 col-12"><input type="number" name="lname" className="form-control mb-2" placeholder="Organization Phone" /></div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-12"><input type="text" name="address" className="form-control mb-2 mr-auto" placeholder="House number / locality" /></div>
                            <div className="col-md-6 col-12"><input type="text" name="city" className="form-control mb-2 mr-auto" placeholder="City" /></div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-12"><input type="text" name="district" className="form-control mb-2 mr-auto" placeholder="District" /></div>
                            <div className="col-md-6 col-12"><input type="text" name="state" className="form-control mb-2 mr-auto" placeholder="State" /></div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-12"><input type="number" name="pin" className="form-control mb-2" placeholder="Pinlabel" /></div>
                            <div className="col-md-6 col-12"><input type="text" name="state" className="form-control mb-2 mr-auto" placeholder="Police Station" /></div>
                        </div>

                        {/* ============================== */}
                        <hr /><h6 className="text-center">Details of procession</h6><hr />

                        <div className="row">
                            <div className="col-md-6 col-12">
                                <select name="" id="" className='form-control mt-2'>
                                    <option value="">Choose type of Procession</option>
                                    <option value="">Agitation</option>
                                    <option value="">General</option>
                                    <option value="">Others</option>
                                    <option value="">Political procession</option>
                                    <option value="">Religious procession</option>
                                </select>
                                <div className='row mt-2'>
                                    <div className="col"><label>Time limit:</label></div>
                                    <div className="col-4 pr-0"><input type="time" name="" id="" /></div>
                                </div>
                            </div>
                            <div className="col-md-6 col-12">
                                <label>Brief description:</label>
                                <textarea name="" id="" cols="30" rows="3" className="form-control"></textarea>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6 col-12 mt-3">
                                <label>Starting point:</label>
                                <input type="text" name="city" className="form-control mb-2 mr-auto" placeholder="City" />
                                <input type="text" name="address" className="form-control mb-2 mr-auto" placeholder="House number / locality" />
                                <input type="text" name="district" className="form-control mb-2 mr-auto" placeholder="District" />
                                <input type="text" name="state" className="form-control mb-2 mr-auto" placeholder="State" />
                                <input type="number" name="pin" className="form-control mb-2" placeholder="Pinlabel" />
                                <input type="text" name="state" className="form-control mb-2 mr-auto" placeholder="Police Station" />
                            </div>
                            <div className="col-md-6 col-12 mt-3">
                                <label>Ending point:</label>
                                <input type="text" name="city" className="form-control mb-2 mr-auto" placeholder="City" />
                                <input type="text" name="address" className="form-control mb-2 mr-auto" placeholder="House number / locality" />
                                <input type="text" name="district" className="form-control mb-2 mr-auto" placeholder="District" />
                                <input type="text" name="state" className="form-control mb-2 mr-auto" placeholder="State" />
                                <input type="number" name="pin" className="form-control mb-2" placeholder="Pinlabel" />
                                <input type="text" name="state" className="form-control mb-2 mr-auto" placeholder="Police Station" />
                            </div>
                        </div>
                        <button type="submit" className='btn btn-block btn-primary mt-3'>Submit</button>
                    </form>
                </Tab>

                <Tab eventKey="protest" title="NOC for Protest">
                    <form className='col-12 col-md-11 mt-4 mx-auto card card-body px-md-5'>

                        {/* ============================== */}
                        <hr /><h6 className="text-center">Organization Details</h6><hr />
                        <div className="row">
                            <div className="col-md-6 col-12"><input type="text" name="fname" className="form-control mb-2" placeholder="Organization Name" /></div>
                            <div className="col-md-6 col-12"><input type="number" name="lname" className="form-control mb-2" placeholder="Organization Phone" /></div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-12"><input type="text" name="address" className="form-control mb-2 mr-auto" placeholder="House number / locality" /></div>
                            <div className="col-md-6 col-12"><input type="text" name="city" className="form-control mb-2 mr-auto" placeholder="City" /></div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-12"><input type="text" name="district" className="form-control mb-2 mr-auto" placeholder="District" /></div>
                            <div className="col-md-6 col-12"><input type="text" name="state" className="form-control mb-2 mr-auto" placeholder="State" /></div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-12"><input type="number" name="pin" className="form-control mb-2" placeholder="Pinlabel" /></div>
                            <div className="col-md-6 col-12"><input type="text" name="state" className="form-control mb-2 mr-auto" placeholder="Police Station" /></div>
                        </div>

                        <hr /><h6 className="text-center">Details of protest</h6><hr />
                        <div className="row">
                            <div className="col-md-6 col-12">
                                <label htmlFor="">Organization / Person against the protest:</label>
                            </div>
                            <div className="col-md-6 col-12">
                                <input type="text" name="pin" className="form-control mb-2" placeholder="Name goes here" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-12 mt-2">
                                <div className="row">
                                    <div className="col pr-md-0"><label htmlFor="">Place of protest</label></div>
                                    <div className="col pl-md-0"><input type="text" name="text" className="form-control mb-2" placeholder="Place" /></div>
                                </div>
                            </div>
                            <div className="col-md-6 col-12 mt-2">
                                <div className="row">
                                    <div className="col-6"><label htmlFor="">Type of structure</label></div>
                                    <div className="col-6 ">
                                        <select name="" id="" className='form-control px-1'>
                                            <option>Choose..</option>
                                            <option value="">Open</option>
                                            <option value="">Close</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-12 mt-2">
                                <div className="row">
                                    <div className="col"><label>Start time of Event:</label></div>
                                    <div className="col-4"><input type="time" name="" id="" className='mt-2' /></div>
                                </div>
                            </div>
                            <div className="col-md-6 col-12 mt-2">
                                <div className="row">
                                    <div className="col"><label>Proposed time limit of Event:</label></div>
                                    <div className="col-4"><input type="time" name="" id="" className='mt-2' /></div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-12 mt-2">
                                <div className="row">
                                    <div className="col-4 pr-0"><label>Start date:</label></div>
                                    <div className="col-8 pl-0"><input type="date" name="pin" className="form-control mb-2" placeholder="Start Date" /></div>
                                </div>
                            </div>
                            <div className="col-md-6 col-12 mt-2">
                                <div className="row">
                                    <div className="col-4 pr-0"><label>End date:</label></div>
                                    <div className="col-8 pl-0"><input type="date" name="state" className="form-control mb-2" placeholder="End Date" /></div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-12 mt-2">
                                <div className="row">
                                    <div className="col"><label>Time limit of the Protest:</label></div>
                                    <div className="col-4"><input type="time" name="" id="" /></div>
                                </div>
                            </div>
                        </div>
                        <textarea name="" id="" cols="30" rows="3" className='form-control mt-2 mb-3' placeholder='Bried description'></textarea>
                        <button type="submit" className='btn btn-primary btn-block'>Submit</button>
                    </form>
                </Tab>

                <Tab eventKey="loudSpeaker" title="NOC for use of loudspeakers">
                    <form className='col-12 col-md-11 mt-4 mx-auto card card-body px-md-5'>

                        {/* ============================== */}
                        <hr /><h6 className="text-center">Vehicle Details</h6><hr />
                        <div className="row">
                            <div className="col-md-6 col-12"><input type="text" name="fname" className="form-control mb-2" placeholder="Vehicle Reg. number" /></div>
                            <div className="col-md-6 col-12"><input type="number" name="lname" className="form-control mb-2" placeholder="Driver Name" /></div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-12"><input type="text" name="fname" className="form-control mb-2" placeholder="Driver license number" /></div>
                            <div className="col-md-6 col-12">
                                <div className="row">
                                    <div className="col"><input type="text" className="form-control mb-2" placeholder="District" /></div>
                                    <div className="col"><input type="text" className="form-control mb-2" placeholder="State" /></div>
                                </div>
                            </div>
                        </div>

                        {/* ============================== */}
                        <hr /><h6 className="text-center">Location Details</h6><hr />
                        <div className="row">
                            <div className="col-md-6 col-12"><input type="text" name="fname" className="form-control mb-2" placeholder="Owner name" /></div>
                            <div className="col-md-6 col-12"><input type="number" name="lname" className="form-control mb-2" placeholder="Mobile number" /></div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-md-6 col-12">
                                <input type="text" name="fname" className="form-control" placeholder="Sound intensity" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-12">
                                <div className="row">
                                    <div className="col-4 pr-0"><label>Start date:</label></div>
                                    <div className="col-8 pl-0"><input type="date" className="form-control mb-2" /></div>
                                </div>
                            </div>
                            <div className="col-md-6 col-12">
                                <div className="row">
                                    <div className="col-4 pr-0"><label>End date:</label></div>
                                    <div className="col-8 pl-0"><input type="date" className="form-control mb-2" /></div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-12 mt-2">
                                <div className="row">
                                    <div className="col"><label>Start time of Event:</label></div>
                                    <div className="col-4"><input type="time" name="" id="" className='' /></div>
                                </div>
                            </div>
                            <div className="col-md-6 col-12 mt-2">
                                <div className="row">
                                    <div className="col"><label>Proposed time limit of Event:</label></div>
                                    <div className="col-4"><input type="time" name="" id="" className='' /></div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-12 mt-2"><input type="text" name="address" className="form-control mb-2 mr-auto" placeholder="House number / locality" /></div>
                            <div className="col-md-6 col-12 mt-2"><input type="text" name="city" className="form-control mb-2 mr-auto" placeholder="City" /></div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-12"><input type="text" name="district" className="form-control mb-2 mr-auto" placeholder="District" /></div>
                            <div className="col-md-6 col-12"><input type="text" name="state" className="form-control mb-2 mr-auto" placeholder="State" /></div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-12"><input type="number" name="pin" className="form-control mb-2" placeholder="Pinlabel" /></div>
                            <div className="col-md-6 col-12"><input type="text" name="state" className="form-control mb-2 mr-auto" placeholder="Police Station" /></div>
                        </div>
                        <button type="submit" className='btn btn-primary btn-block mt-3'>Submit</button>
                    </form>
                </Tab>
            </Tabs >
        </div >

    )
}

export default ApplyNoc
