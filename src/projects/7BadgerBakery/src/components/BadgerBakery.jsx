import { useEffect, useState } from "react";
import { Text, View, Image, Button, Alert } from "react-native";

export default function BadgerBakery() {

    const [bakedGoods, setBakedGoods] = useState([]) // step 1
    const [currentPage, setCurrentPage] = useState(1) // step 1
    const totalPages = Object.keys(bakedGoods).length // step 2
    const [quantities, setQuantities] = useState({}) // step 3, use object to store quantities
    const [total, setTotal] = useState(0) // step 4

    // Step 1: display baked goods
    // fetch all baked goods, from hw3
    useEffect(() => {
        fetch("https://cs571.org/api/f23/hw7/goods", {
            headers: {
                "X-CS571-ID": "bid_c6d49d6dc0151ad7874971c6ccdddad3913bad5b559fbc6a649bed932a5d0d5a"
            }
        })
            .then(res => res.json())
            .then(data => {
                // set all default quantities to 0
                const initialQuantities = {}
                for (const id in data) {
                    initialQuantities[id] = 0
                }
                setQuantities(initialQuantities)

                setBakedGoods(data) // bakedGoods will be empty until return component is rendered
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            })
    }, [])

    // Step 2: pagination
    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
        }
    }

    // Step 3: add/remove from basket
    const handlePlus = (goodId, upperLimit) => {
        if (quantities[goodId] < upperLimit || upperLimit === -1) {
            setQuantities((prevQuantities) => ({
                ...prevQuantities,
                [goodId]: prevQuantities[goodId] + 1,
            }))
        }
        // update total
        setTotal(total + bakedGoods[goodId].price)
    }

    const handleMinus = (goodId) => {
        if (quantities[goodId] > 0) {
            setQuantities((prevQuantities) => ({
                ...prevQuantities,
                [goodId]: prevQuantities[goodId] - 1,
            }))
        }
        // update total
        setTotal(total - bakedGoods[goodId].price)
    }

    // Step 4: calculate total
    const handleOrder = () => {
        const numItems = Object.values(quantities).reduce((acc, currentValue) => acc + currentValue, 0)
        Alert.alert(
            "Order Confirmed!",
            `Your order contains ${numItems} items and costs $${total.toFixed(2)}.`,
            [
              { text: 'OK', onPress: () => console.log('ok clicked') }
            ]
          )
    }

    const goodsToDisplayKeys = Object.keys(bakedGoods).slice(currentPage - 1, currentPage)
    const goodsToDisplay = Object.values(bakedGoods).slice(currentPage - 1, currentPage)

    return <View>
        <Text>Welcome to Badger Bakery!</Text>
        {
            goodsToDisplay.map((good, index) => {
                const goodId = goodsToDisplayKeys[0] // get current good id (key)

                return (
                    <View key={index}>
                        {/* Step 1: display goods */}
                        <Image
                            source={{ uri: good.imgSrc }}
                            style={{ width: 200, height: 200 }}
                        />
                        <Text style={{ fontSize: 24, fontWeight: "bold", textAlign: "center" }}>{good.name}</Text>
                        <Text style={{ textAlign: "center" }}>${good.price.toFixed(2)}</Text>
                        <Text style={{ textAlign: "center" }}>{good.upperLimit === -1 ? `There is no limit` : `You can order up to ${good.upperLimit} ${good.name}s!`} </Text>

                        {/* Step 3: add/remove from basket */}
                        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                            <Button title="-" onPress={() => handleMinus(goodId)} disabled={quantities[goodId] === 0} />
                            <Text style={{ margin: 5 }}>{quantities[goodId]}</Text>
                            <Button title="+" onPress={() => handlePlus(goodId, good.upperLimit)} disabled={quantities[goodId] === good.upperLimit} />
                        </View>

                        {/* Step 2: pagination */}
                        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                            <Button title="Previous" onPress={handlePrevious} disabled={currentPage === 1} />
                            <Text style={{ margin: 5 }}></Text>
                            <Button title="Next" onPress={handleNext} disabled={currentPage === totalPages} />
                        </View>

                        {/* Step 4: order total */}
                        <Text style={{ textAlign: "center" }}>Order Total: ${total.toFixed(2)}</Text>

                        {/* Step 5: place order */}
                        <Button title="Place Order" onPress={handleOrder} disabled={total === 0} />
                    </View>
                )
            })}
    </View>
}