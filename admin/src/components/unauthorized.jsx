import React from 'react'
import "../css/notfound.css"

function unauthorized() {
    return (
        <div id="message">
            <h2>401</h2>
            <h1>Unauthorized</h1>
            <p>The requested URL cannot be served as you are not authorized to view this page. Please Sign in to continue using this service.</p>
        </div>
    )
}

export default unauthorized
