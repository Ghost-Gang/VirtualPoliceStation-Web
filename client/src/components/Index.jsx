import React, { useEffect } from 'react'
import sm from '../img/police-sm.jpg'
import md from '../img/police-md.jpg'
function Home() {
    useEffect(() => {
        let user = sessionStorage.getItem('user');
        console.log(user);
        if (user !== null) {
            window.location.href = `/u/${user}/home`
        }
    }, [])

    return (
        <div className="my-0">
            <img src={sm} className="img-fluid d-sm-none" alt="police" />
            <img src={md} className="img-fluid d-none d-sm-block" alt="police" style={{ width: "100%" }} />
        </div>

    )
}

export default Home
