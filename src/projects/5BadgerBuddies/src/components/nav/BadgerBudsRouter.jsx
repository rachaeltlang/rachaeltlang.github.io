import { BrowserRouter, Route, Routes } from "react-router-dom";
import BadgerBuds from "../BadgerBuds";
import BadgerBudsLanding from "./pages/BadgerBudsLanding"
import BadgerBudsAdoptable from "./pages/BadgerBudsAdoptable"
import BadgerBudsBasket from "./pages/BadgerBudsBasket"

export default function BadgerBudsRouter() {
    return <BrowserRouter>
        {/* Step 1: setup routes */}
        <Routes> 
            <Route path="/" element={<BadgerBuds />}>
                <Route index element={<BadgerBudsLanding />} />
                <Route path="available-cats" element={<BadgerBudsAdoptable />} />
                <Route path="basket" element={<BadgerBudsBasket />} />
                <Route path="*" element={<BadgerBudsLanding />} />
            </Route>
        </Routes>
    </BrowserRouter>
}