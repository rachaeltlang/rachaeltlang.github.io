import React from 'react';

const Student = (props) => {
    return <div>
        {/* Step 5: add other student data */}
        <h2>{props.name.first} {props.name.last}</h2>
        <h4>{props.major}</h4>

        {props.fromWisconsin ? (
            <p>{props.name.first} is taking {props.numCredits} credits and is from Wisconsin.</p>
        ) : (
            <p>{props.name.first} is taking {props.numCredits} credits and is not from Wisconsin.</p>
        )}

        <p>They have {props.interests.length} interests, including:</p>
        <ul>
            {props.interests.map((interest, index) => (
                <li key={index}>{interest}</li>
            ))}
        </ul>

    </div>
}

export default Student;