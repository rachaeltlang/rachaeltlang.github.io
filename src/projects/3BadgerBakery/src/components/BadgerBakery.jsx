import { useEffect, useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import BakedGood from "./BakedGood"

export default function BadgerBakery() {

    const [bakedGoods, setBakedGoods] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    var featuredItem
    var featuredPrice

    // fetch all baked goods
    useEffect(() => {
        fetch("https://cs571.org/api/f23/hw3/all-baked-goods", {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        })
            .then(res => res.json())
            .then(data => {
                setBakedGoods(data)
                setIsLoading(false)
            })
    }, [])

    // Step 5: get featured item and price
    for (let i = 0; i < bakedGoods.length; i++) {
        if (bakedGoods[i].featured == true) {
            featuredItem = bakedGoods[i].name
            featuredPrice = bakedGoods[i].price
        }
    }

    return <div>
        <h1>Badger Bakery</h1>
        <p>Welcome to our small-town bakery located in Madison, WI!</p>
        {/* Step 5: show "Loading..." */}
        {isLoading ? (<p>Loading...</p>) : (
            <p>Today's featured item is {featuredItem} for ${featuredPrice}!</p>
        )}

        <Container>
            <Row>
                {
                    bakedGoods.map(bakedGood => {
                        return <Col key={bakedGood.name} xs={12} md={6} lg={4} xl={3}>
                            <BakedGood
                                name={bakedGood.name}
                                description={bakedGood.description}
                                price={bakedGood.price}
                                featured={bakedGood.featured}
                            />
                        </Col>
                    })
                }
            </Row>
        </Container>
    </div>
}