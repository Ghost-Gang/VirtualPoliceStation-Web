import React, { useState } from "react";
import { Form } from "react-bootstrap";
import '../css/char-cert.css'
import firebase from 'firebase/app'
import 'firebase/firestore'

function CharCert() {
    const [formData, setFormData] = useState('');
    const { purpose, purposeDetails, anyCrimeRecord, crimeRecordDetails, affidavitImg } = formData;

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const handleSubmit = async e => {
        e.preventDefault();
        // if (anyCrimeRecord === 'no') { setFormData({ ...formData, crimeRecordDetails: '' }) }
        console.log(formData);
    }
    return (
        <div className="py-md-4 my-4">
            <form className="container card card-body px-5" style={{ maxWidth: "540px" }} onChange={handleChange} onSubmit={handleSubmit}>
                <h2 className='text-center pt-2 pb-3'>Character Certificate</h2>
                <label>Purpose for applying:</label>
                <Form.Control as="select" name='purpose' value={purpose} required>
                    <option value="">Choose...</option>
                    <option value='private-service'>Private Service</option>
                    <option value='govt-service'>Govt. Service</option>
                </Form.Control>
                <label htmlFor="" className='mt-3'>Purpose Details:</label>
                <textarea name="purposeDetails" id="" rows="2" className='form-control' placeholder='Purpose details' required></textarea>
                <p className="mt-3 mb-1">
                    Do you have any criminal record or any criminal proceedings against
                    you or your family in any part of the country?<span className='text-danger'>*</span>
                </p>
                <div className="row">
                    <Form.Check type="radio" value="yes" label='Yes' id="yes" name="anyCrimeRecord" className="ml-3" required />
                    <Form.Check type="radio" value="no" label='No' id="no" name="anyCrimeRecord" className="ml-3" required />
                </div>
                <label className='mt-3'>If yes provide details:</label>
                <textarea className="form-control mb-3" name="crimeRecordDetails" rows="2" placeholder="Provide details"
                    required={anyCrimeRecord === 'yes' ? true : false} disabled={anyCrimeRecord === 'yes' ? false : true} value={anyCrimeRecord === 'yes' ? crimeRecordDetails : ''}></textarea>
                <label htmlFor='aff-img'>Upload Affidavit</label>
                <input type="file" accept="image/*" placeholder="" name='affidavitImg' required />
                <button className='btn btn-block btn-theme mt-4 mb-3' type='submit'>Submit</button>
            </form>
        </div >
    );
}

export default CharCert;
