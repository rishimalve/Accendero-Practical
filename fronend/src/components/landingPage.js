import React from 'react'
import { Link } from '@reach/router'

const LandingPage = () => {
    return (
        <div className="medium-container">
            <div className="d-flex flex-column min-vh-100 justify-content-center">
                <Link to="/login">
                    <button className="btn btn-primary btn-lg btn-block">Login</button><br />
                </Link>
                <Link to="/registration">
                    <button className="btn btn-primary btn-lg btn-block">Register</button>
                </Link>
            </div>
        </div>
    )
}

export default LandingPage;