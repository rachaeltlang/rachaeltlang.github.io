import React, { useEffect } from 'react';
import htmlContent from "../projects/1BadgerBakery/badger-bakery/index.html"

function Project1() {
   
    return (
        <div>
            <h1>Badger Bakery</h1>
            <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
        </div>
    );
}

export default Project1;