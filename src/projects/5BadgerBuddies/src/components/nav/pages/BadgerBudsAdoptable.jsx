import { useState, useContext, useEffect } from "react"
import { Col, Row, Container } from "react-bootstrap"
import BadgerBudsDataContext from "./../../../contexts/BadgerBudsDataContext"
import BadgerBudsSummary from "./BadgerBudsSummary"

export default function BadgerBudsAdoptable() {

    // Step 2: display cats
    const cats = useContext(BadgerBudsDataContext)

    // Step 4: Show More button
    const [showMoreStates, setShowMoreStates] = useState(cats.map(() => false))
    const toggleShowMore = (catIndex) => {
        const newShowMoreStates = [...showMoreStates]
        newShowMoreStates[catIndex] = !newShowMoreStates[catIndex]
        setShowMoreStates(newShowMoreStates)
    }

    // Step 5: save cats
    const [savedCatIds, setSavedCatIds] = useState([])

    useEffect(() => {
        const savedCatIdsFromStorage = JSON.parse(sessionStorage.getItem("savedCatIds")) || []
        setSavedCatIds(savedCatIdsFromStorage)
    }, [])

    const handleSave = (catId) => {
        const newSavedCatIds = [...savedCatIds, catId]
        setSavedCatIds(newSavedCatIds)
        sessionStorage.setItem("savedCatIds", JSON.stringify(newSavedCatIds))
    }

    // Step 5: filter out saved cats
    const remainingCats = cats.filter(cat => !savedCatIds.includes(cat.id))

    return (
        <Container>
            <h1>Available Badger Buds</h1>
            <p>The following cats are looking for a loving home! Could you help?</p>
            {/* Step 9: handle no buds */}
            {remainingCats.length === 0 ? "You have no buds in your basket!" : ""}
            <Row>
                {remainingCats.map((cat, index) => (
                    // Step 3: responsive design
                    <Col xs={6} md={4} lg={3} xxl={2} key={cat.id}>
                        {/* Step 2: display cats */}
                        <BadgerBudsSummary
                            cat={cat}
                            showMore={showMoreStates[index]}
                            onToggleShowMore={() => toggleShowMore(index)}
                            onSave={() => {
                                handleSave(cat.id);
                                alert(cat.name + " has been added to your basket!");
                            }}
                        />
                    </Col>
                ))}
            </Row>
        </Container>
    )
}