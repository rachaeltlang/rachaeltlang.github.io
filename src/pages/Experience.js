// Experience

import intel from "../files/intel.png"
import target from "../files/target.png"
import smuckers from "../files/smuckers.png"
import uwmadison from "../files/uwmadison.png"
import foxconn from "../files/foxconn.png"

function Experience() {
    return (
        <div className="about-container">
            <h1>Some Things I've Done</h1>

            {/* Intel */}
            <div className="experience-entry">
                <div>
                    <img
                        style={{ width: '200px', height: '200px' }}
                        src={intel}
                        alt="intel logo" />
                </div>
                <div>
                    <h2>Intel</h2>
                    <p>intel stuff</p>
                </div>
            </div>

            {/* Target */}
            <div className="experience-entry">
                <div>
                    <img
                        style={{ width: '200px', height: '200px' }}
                        src={target}
                        alt="target logo" />
                </div>
                <div>
                    <h2>Target</h2>
                    <p>target stuff</p>
                </div>
            </div>

            {/* Smuckers */}
            <div className="experience-entry">
                <div>
                    <img
                        style={{ width: '200px', height: '200px' }}
                        src={smuckers}
                        alt="smcukers logo" />
                </div>
                <div>
                    <h2>The J.M. Smucker Company</h2>
                    <p>Smuckers stuff</p>
                </div>
            </div>
            
            {/* UW-Madison */}
            <div className="experience-entry">
                <div>
                    <img
                        style={{ width: '200px', height: '200px' }}
                        src={uwmadison}
                        alt="The University of Wisconsin-Madison logo" />
                </div>
                <div>
                    <h2>The University of Wisconsin-Madison</h2>
                    <p>UW-Madison stuff</p>
                </div>
            </div>

        </div >
    )

}

export default Experience;
