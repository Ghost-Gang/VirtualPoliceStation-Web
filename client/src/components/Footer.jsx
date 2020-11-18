import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLinkedin,
    faFacebook,
    faTwitter,
    faInstagram,
    faGithub
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"

function Footer() {
    return (
        <footer className="page-footer font-small" id="footer">
            {/* <!-- Social buttons --> */}
            <ul className="list-unstyled list-inline text-center footer-lite my-0 pt-3">
                <li className="list-inline-item"><a href="/will-be-added" className="mx-1 mx-md-2"><FontAwesomeIcon icon={faFacebook} className="social-icon" /></a></li>
                <li className="list-inline-item"><a href="/will-be-added" className="mx-1 mx-md-2"><FontAwesomeIcon icon={faInstagram} className="social-icon" /></a></li>
                <li className="list-inline-item"><a href="/will-be-added" className="mx-1 mx-md-2"><FontAwesomeIcon icon={faTwitter} className="social-icon" /></a></li>
                <li className="list-inline-item"><a href="/will-be-added" className="mx-1 mx-md-2"><FontAwesomeIcon icon={faLinkedin} className="social-icon" /></a></li>
                <li className="list-inline-item"><a href="/will-be-added" className="mx-1 mx-md-2"><FontAwesomeIcon icon={faGithub} className="social-icon" /></a></li>
                <li className="list-inline-item"><a href="/will-be-added" className="mx-1 mx-md-2"><FontAwesomeIcon icon={faEnvelope} className="social-icon" /></a></li>
            </ul>
            <ul className="list-unstyled list-inline text-center footer-lite my-0 py-3">
                <li className="list-inline-item"><a href="/about-us" className="mx-1 mx-md-2">About us</a></li>
                <li className="list-inline-item mx-1 mx-md-2">|</li>
                <li className="list-inline-item"><a href="/privacy-policy" className="mx-1 mx-md-2">Privacy Policy</a></li>
                <li className="list-inline-item mx-1 mx-md-2">|</li>
                <li className="list-inline-item"><a href="/disclaimer" className="mx-1 mx-md-2">Disclaimer</a></li>
            </ul>
            <div className="footer-copyright text-center py-3 footer-dark my-0">© 2020 Copyright: <span className="link">GH00ST GANG</span></div>
        </footer>
    )
}

export default Footer
