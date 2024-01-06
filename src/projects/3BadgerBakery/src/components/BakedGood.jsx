import { useState } from "react"


export default function BakedGood(props) {

    const [count, setCount] = useState(0)

    // Step 2: implement decrease
    function handleClickDec() {
        setCount(count - 1)
    }

    // Step 2: implement increase
    function handleClickInc() {
        setCount(count + 1)
    }

    // Step 4: featured item styling
    const featured = {
        color: props.featured ? "#329ea8" : "white",
        backgroundColor: props.featured ? "#dcfcdd" : "slateblue",
        fontWeight: props.featured ? "bold" : ""
    }

    return <div>
        {/* Step 1: display name, description, price */}
        <h2 style={featured}>{props.name}</h2>
        <p>{props.description}</p>
        <p>{props.price}</p>

        <div>
            {/* Step 3: add disabled prop */}
            <button className="inline" disabled={count == 0} onClick={handleClickDec}>-</button>
            <p className="inline">{count}</p>
            <button className="inline" onClick={handleClickInc}>+</button>
        </div>
    </div>
}