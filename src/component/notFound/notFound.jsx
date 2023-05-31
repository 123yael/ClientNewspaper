import React from 'react';
import './notFound.css'

export const NotFound = () => {
    return (
        <div className='pt-5'>
            <h1 className='pt-5'>404 page not found</h1>
            <p className="zoom-area">We are sorry but the page you are looking for does not exist.</p>
            <section className="error-container">
                <span className="four"><span className="screen-reader-text">4</span></span>
                <span className="zero"><span className="screen-reader-text">0</span></span>
                <span className="four"><span className="screen-reader-text">4</span></span>
            </section>
            <div className="link-container">
                <a target="_blank" href="http://localhost:3000/" className="more-link">return to home</a>
            </div>
        </div>
    )
}

