import React, { useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { CrimeData } from './PastIncidentData'
function PastIncidents() {
    useEffect(() => {
        document.title = "Past Incidents";
    }, []);
    return (
        <div className='mx-auto card card-body col-md-10 my-md-5'>
            <h3 className='text-center mb-3'>CRIMINAL ACTIVITIES IN PAST YEARS</h3>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <td>Sl No.</td>
                        <td>State / UT</td>
                        <td>2017</td>
                        <td>2018</td>
                        <td>2019</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        CrimeData.map(data => {
                            console.log(data);
                            return (
                                <tr key={Math.random()}>
                                    <td>{data.sl}</td>
                                    <td>{data.state}</td>
                                    <td>{data.sn}</td>
                                    <td>{data.en}</td>
                                    <td>{data.nn}</td>
                                </tr>
                            )
                        })

                    }
                </tbody>
            </Table>
        </div>
    )
}

export default PastIncidents
