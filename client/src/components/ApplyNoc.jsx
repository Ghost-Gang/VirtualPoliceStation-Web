import React from 'react'
import { Tab, Tabs, Form, Nav } from 'react-bootstrap'

function ApplyNoc() {
    return (
        <div className="col-md-9 mx-auto my-5">
            <Tabs fill variant='pills' defaultActiveKey="exhibition" id="uncontrolled-tab-example">
                <Tab eventKey="exhibition" title="NOC for Mela / Exhibition">
                    <form className='col-11 mt-4 mx-auto card card-body'>

                        {/* ============================== */}
                        <hr /> <h6 className="text-center">Organization Details</h6><hr />
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
                                <tr>
                                    <td><input type="number" name="state" className="form-control mb-2" placeholder="Area" /></td>
                                    <td>
                                        <select name="" id="" className="form-control ml-3">
                                            <option value="">Sq. Mts.</option>
                                            <option value="">Sq. Feet</option>
                                        </select>
                                    </td>
                                </tr>
                            </div></div>
                        <div className="row">
                            <div className="col-md-6 col-12">
                                <select name="structure" id="" className='form-control' value='how'>
                                    <option>Choose Nature of Structure</option>
                                    <option>Temporary</option>
                                    <option>Permanent</option>
                                </select>
                            </div>
                            <div className="col-md-6 col-12">
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
                            <div className="col-md-6 col-12">
                                <label>Type of event:</label>
                                <select name="" id="">
                                    <option value="">Musical</option>
                                    <option value="">Educational</option>
                                    <option value="">Bollywood</option>
                                    <option value="">Religious</option>
                                    <option value="">Public</option>
                                </select>
                            </div>
                            <div className="col-md-6 col-12">
                                <tr>
                                    <td><input type="date" name="pin" className="form-control mb-2" placeholder="Start Date" /></td>
                                    <td><input type="date" name="state" className="form-control mb-2 mr-auto" placeholder="End Date" /></td>
                                </tr>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-12">
                                <tr>
                                    <td><label>Start time of Event:</label></td>
                                    <td><div className="col-md-6 col-12"><input type="time" name="" id="" /></div></td>
                                </tr>
                            </div>
                            <div className="col-md-6 col-12">
                                <tr>
                                    <td><label>Proposed time limit of Event:</label></td>
                                    <td><div className="col-md-6 col-12"><input type="time" name="" id="" /></div></td>
                                </tr>
                            </div>
                        </div>

                        {/* ============================== */}
                        <hr /><h6 className='text-center'>Traffic security details</h6><hr />
                        <div className="row mt-1">
                            <div className="col-md-6 col-12"><label>Space made available for parking:</label></div>
                            <div className="col-md-6 col-12"><tr><td><Form.Check type="radio" label="Yes" id="yes" name="radio" className="ml-3" /></td><td><Form.Check type="radio" label="No" id="no" name="radio" className="ml-3" /></td></tr></div>
                        </div>
                        <div className="row mt-1">
                            <div className="col-md-6 col-12"><label>Proposed number of security cameras:</label></div>
                            <div className="col-md-6 col-12"><input type="number" name="" id="" className="form-control" /></div>
                        </div>
                    </form>
                </Tab>

                <Tab eventKey="procession" title="NOC for Procession">
                    <h6 className="text-center">Organization Details</h6>
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
                    <h6 className="mt-5">Details of procession</h6>

                    <div className="row">
                        <div className="col-md-6 col-12">
                            <label>Type of Procession:</label>
                            <select name="" id="" className='form-control'>
                                <option value="">Agitation</option>
                                <option value="">General</option>
                                <option value="">Others</option>
                                <option value="">Political procession</option>
                                <option value="">Religious procession</option>
                            </select>
                            <tr><label>Time limit:</label><input type="time" name="" id="" /></tr>
                        </div>
                        <div className="col-md-6 col-12">
                            <label>Brief description:</label>
                            <textarea name="" id="" cols="30" rows="3" className="form-control"></textarea>
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col-md-6 col-12">
                            <label>Starting point:</label>
                            <input type="text" name="city" className="form-control mb-2 mr-auto" placeholder="City" />
                            <input type="text" name="address" className="form-control mb-2 mr-auto" placeholder="House number / locality" />
                            <input type="text" name="district" className="form-control mb-2 mr-auto" placeholder="District" />
                            <input type="text" name="state" className="form-control mb-2 mr-auto" placeholder="State" />
                            <input type="number" name="pin" className="form-control mb-2" placeholder="Pinlabel" />
                            <input type="text" name="state" className="form-control mb-2 mr-auto" placeholder="Police Station" />
                        </div>
                        <div className="col-md-6 col-12">
                            <label>Ending point:</label>
                            <input type="text" name="city" className="form-control mb-2 mr-auto" placeholder="City" />
                            <input type="text" name="address" className="form-control mb-2 mr-auto" placeholder="House number / locality" />
                            <input type="text" name="district" className="form-control mb-2 mr-auto" placeholder="District" />
                            <input type="text" name="state" className="form-control mb-2 mr-auto" placeholder="State" />
                            <input type="number" name="pin" className="form-control mb-2" placeholder="Pinlabel" />
                            <input type="text" name="state" className="form-control mb-2 mr-auto" placeholder="Police Station" />
                        </div>
                    </div>
                </Tab>

                <Tab eventKey="protest" title="NOC for Protest">
                    <h6 className="text-center">Organization Details</h6>
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

                    <h6 className="mt-5">Details of protest</h6>
                    <div className="row">
                        <div className="col-md-6 col-12"><input type="text" name="pin" className="form-control mb-2" placeholder="Name of the Org/Person against the protest" /></div>
                        <div className="col-md-6 col-12"><tr><td><label>Time limit of the protest / strike each day:</label></td><td><input type="time" name="" id="" /></td></tr></div>
                    </div>

                    <div className="row">
                        <div className="col-md-6 col-12"><input type="text" name="text" className="form-control mb-2" placeholder="Place of protest" /></div>
                        <div className="col-md-6 col-12">

                            <label>Type of structure:</label>
                            <select name="" id="">
                                <option value="">Open</option>
                                <option value="">Close</option>
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 col-12">
                            <tr>
                                <td><label>Start time of Event:</label></td>
                                <td><div className="col-md-6 col-12"><input type="time" name="" id="" /></div></td>
                            </tr>
                        </div>
                        <div className="col-md-6 col-12">
                            <tr>
                                <td><label>Proposed time limit of Event:</label></td>
                                <td><div className="col-md-6 col-12"><input type="time" name="" id="" /></div></td>
                            </tr>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 col-12">
                            <tr>
                                <td><label>Start date:</label><input type="date" name="pin" className="form-control mb-2" placeholder="Start Date" /></td>
                                <td><label>End date:</label><input type="date" name="state" className="form-control mb-2 mr-auto" placeholder="End Date" /></td>
                            </tr>
                        </div>
                        <div className="col-md-6 col-12">
                            <textarea name="" id="" cols="30" rows="3" className='form-control'></textarea>
                        </div>
                    </div>


                </Tab>

                <Tab eventKey="loudSpeaker" title="NOC for use of loudspeakers">
                    <h6 className="text-center">Vehicle Details</h6>
                    <div className="row">
                        <div className="col-md-6 col-12"><input type="text" name="fname" className="form-control mb-2" placeholder="Vehicle Reg. number" /></div>
                        <div className="col-md-6 col-12"><input type="number" name="lname" className="form-control mb-2" placeholder="Driver Name" /></div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 col-12"><input type="text" name="fname" className="form-control mb-2" placeholder="Driver license number" /></div>
                        <div className="col-md-6 col-12"><tr><td><input type="text" className="form-control mb-2" placeholder="District" /></td><td><input type="text" className="form-control mb-2" placeholder="State" /></td></tr></div>
                    </div>

                    <h6 className="mt-5">Vehicle Details</h6>
                    <div className="row">
                        <div className="col-md-6 col-12"><input type="text" name="fname" className="form-control mb-2" placeholder="Owner name" /></div>
                        <div className="col-md-6 col-12"><input type="number" name="lname" className="form-control mb-2" placeholder="Mobile number" /></div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 col-12"><input type="text" name="fname" className="form-control mb-2" placeholder="Sound intensity" /></div>
                        <div className="col-md-6 col-12"><tr><td><label>Start date:</label><input type="date" className="form-control mb-2" /></td><td><label>End date:</label><input type="date" className="form-control mb-2" /></td></tr></div>
                    </div>

                    <h6 className="text-center">Location Details</h6>
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
                </Tab>
            </Tabs>
        </div>

    )
}

export default ApplyNoc
