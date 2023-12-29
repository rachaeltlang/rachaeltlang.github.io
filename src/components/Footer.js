import React from 'react';
import croissant from "./croissant.jpg";

// TODO: make this

function Footer() {
    const footerStyle = {
        position: 'fixed',
        bottom: 0,
        width: '100%',
        backgroundColor: 'white',
        padding: '20px',
        textAlign: 'center',
        margin: '0 100px',
      };

    const navListStyle = {
        listStyle: 'none',
        display: 'flex',
        gap: '20px',
        margin: '0',
        padding: '0',
    };

    const navListItemStyle = {
        display: 'inline',
    };

    const linkStyle = {
        textDecoration: 'none',
        color: '#3eb489',
    };

    const logoStyle = {
        display: 'flex',
        alignItems: 'center',
        fontSize: '24px',
        fontWeight: 'bold',
    };

    const imageStyle = {
        width: '50px',
        height: '50px',
        marginRight: '8px',
    };

    return (
        <footer style={footerStyle}>

            <div className="logo" style={logoStyle}>
                <a href="/"><img src={croissant} alt="Logo" style={imageStyle} /></a>
                <a style={linkStyle} href="/">Rachael Lang</a>
            </div>

            <nav>
                <ul style={navListStyle} className="nav-list">
                    <li style={navListItemStyle}><a style={linkStyle} href="/">Home</a></li>
                </ul>
            </nav>

        </footer>
    );
}

export default Footer;