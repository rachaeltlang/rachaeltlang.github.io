import { useState, useContext } from "react"
import { Col, Row, Card, Button  } from "react-bootstrap"
import BadgerBudsDataContext from "./../../../contexts/BadgerBudsDataContext"

export default function BadgerBudsBasket(props) {
    const buds = useContext(BadgerBudsDataContext)
    const [savedCatIds, setSavedCatIds] = useState(JSON.parse(sessionStorage.getItem("savedCatIds")) || [])
    const savedCats = buds.filter(cat => savedCatIds.includes(cat.id))
    const adoptedCatIds = []

    // Step 7: unsave cats
    const handleUnsave = (catId) => {
        // create new array that filters out catId to be removed
        const newSavedCatIds = savedCatIds.filter(id => id !== catId)
        // set newSavedCatIds as savedCatIds
        setSavedCatIds(newSavedCatIds)
        // store updated set of saved cat IDs in sessionStorage
        sessionStorage.setItem("savedCatIds", JSON.stringify(newSavedCatIds))
    }

    // Step 8: adopt cats
    const handleAdopt = (catId) => {
        // add catId to adoptedCatIds array
        adoptedCatIds.push(catId)
        // create new array that filters out catId to be removed
        const newSavedCatIds = savedCatIds.filter(id => id !== catId)
        // set newSavedCatIds as savedCatIds
        setSavedCatIds(newSavedCatIds)
    }

    return (
        <div>
            <h1>Badger Buds Basket</h1>
            <p>These cute cats could be all yours!</p>
            {/* Step 9: handle no buds */}
            {savedCats.length === 0 ? "You have no buds in your basket!" : ""}
            {/* Step 6: show saved cats, adapted from BadgerBudsAdoptable */}
            <Row>
                {savedCats.map((cat, index) => (
                    <Col xs={6} md={4} lg={3} xxl={2} key={cat.id}>
                        {/* Step 2: display cats */}
                        <Card className="mb-3">
                            <Card.Img
                                src={`https://raw.githubusercontent.com/CS571-F23/hw5-api-static-content/main/cats/${cat.imgIds[0]}`}
                                alt={`a picture of ${cat.name}`}
                                style={{ width: "100%", height: "100%" }}
                            />
                            <Card.Body>
                                <Card.Title>{cat.name}</Card.Title>
                                {/* Step 7: unsave button */}
                                <Button
                                    variant="secondary"
                                    style={{ marginRight: "10px" }}
                                    onClick={() => { handleUnsave(cat.id); alert(cat.name + " has been removed from your basket!") }}
                                >
                                    Unsave
                                </Button>
                                {/* Step 8: adopt button */}
                                <Button
                                    variant="success"
                                    onClick={() => { handleAdopt(cat.id); alert(cat.name + " has been adopted!") }}
                                    >
                                    Adopt
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    )
}