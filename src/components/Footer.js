import React from 'react';
import croissant from ".././files/croissant.jpg";

// TODO: make this

function Footer() {

    return (
        <footer className="footer">

            <div className="logo">
                <a href="/"><img src={croissant} alt="Logo" className="image" /></a>
                {/* <a href="/" className="header-title">Rachael Lang</a> */}

                <div className="footer-container">
                    <div><p>Let's Connect!</p></div>
                    <div><a href="https://linkedin.com/in/rachaeltlang"><i class="fa-brands fa-linkedin fa-2x font-awesome"></i></a></div>
                    <div><a href="https://github.com/rachaellang"><i class="fa-brands fa-square-github fa-2x font-awesome"></i></a></div>
                    <div><a href="mailto:rachael.rtl.lang@gmail.com"><i class="fa-solid fa-envelope fa-2x font-awesome"></i></a></div>
                    <div><p>© Rachael Lang 2024</p></div>
                </div>
                {/* easter egg */}

            </div>
        </footer>
    );
}

export default Footer;