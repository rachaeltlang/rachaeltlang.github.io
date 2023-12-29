import React from 'react';
import croissant from ".././files/croissant.jpg";

function Header() {
    const headerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: 'white',
        color: '#000000',
        margin: '0 100px',
        font: 'Helvetica'
    };

    const navListStyle = {
        listStyle: 'none',
        display: 'flex',
        gap: '20px',
        margin: '0',
        padding: '0',
        fontSize: '18px',
    };

    const navListItemStyle = {
        display: 'inline',
    };

    const linkStyle = {
        textDecoration: 'none',
        color: '#3eb489',
    };

    const titleStyle = {
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
        <header style={headerStyle}>

            <div className="logo" style={titleStyle}>
                <a href="/"><img src={croissant} alt="logo" style={imageStyle} /></a>
                <a style={linkStyle} href="/">Rachael Lang</a>
            </div>

            <nav>
                <ul style={navListStyle} className="nav-list">
                    <li style={navListItemStyle}><a style={linkStyle} href="/">Home</a></li>
                    <li style={navListItemStyle}><a style={linkStyle} href="/about">About</a></li>
                    <li style={navListItemStyle}><a style={linkStyle} href="/experience">Experience</a></li>
                    <li style={navListItemStyle}><a style={linkStyle} href="/projects">Projects</a></li>
                    <li style={navListItemStyle}><a style={linkStyle} href="/resume">Resume</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
