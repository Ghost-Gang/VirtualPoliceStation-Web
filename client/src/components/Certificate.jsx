import React, { useState } from 'react'
import { firestore } from './Firebase'

function Certificate() {
    let uid = localStorage.getItem('uid');
    const [uData, setUData] = useState({
        name: "",
        locality: "",
        district: "",
        city: ""
    })
    firestore.collection('User-Details').doc(uid).get().then(data => {
        setUData({
            name: data.data().FName,
            locality: data.data().Locality,
            district: data.data().District,
            city: data.data().City
        })
    }).catch(err => console.log(err));

    return (
        <div className="body m-5 mx-auto">
            <div className="c-container mx-auto">
                <div className="my-5">
                    <u><h2 className='text-center'>Character Certificate</h2></u>
                </div>
                <div className="my-5 px-4">
                    This is to certify that <u>{uData.name}</u>  S/o/D/of Shri <u>XYZ</u>, village- <u>{uData.locality}</u>, P.O.- <u>{uData.city}</u>,
                    Dist- <u>{uData.district}</u>, is known to me for the last 10 years. Shri/Smt/Ku. <u>{uData.name}</u>  bears good moral character and to the best of my knowledge is not involved in any criminal acitvity and no personal legal case is pending against him/her.
                </div>
                <div className="ml-4">
                    Name: Officer Atman<br />
                    Date: 03/05/2021
                </div>
            </div>
        </div>
    )
}

export default Certificate
