import React from 'react';
import croissant from ".././files/croissant.jpg";
import resume from "../files/RachaelLangResume.pdf"

function Header() {
    return (
        <header className="header">

            <a>
                <div className="logo">
                    <img src={croissant} alt="logo" className="image" />
                    <a className="header-title" href="/">Rachael Lang</a>
                </div>
            </a>

            <nav>
                <ul className="nav-list">
                    {/* <li><a className="header-text" href="/">Home</a></li> */}
                    <li><a className="header-text" href="/about">About</a></li>
                    <li><a className="header-text" href="/experience">Experience</a></li>
                    <li><a className="header-text" href="/projects">Projects</a></li>
                    <li><a className="header-text" href={resume} download="RachaelLangResume.pdf">Resume</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
