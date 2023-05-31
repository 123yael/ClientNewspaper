import { Route, Routes } from "react-router-dom";
import { Home } from "./home/home";
import { ResponsiveDrawer } from "./responsiveDrawer";
import { About } from "./about/about";
import { Contact } from "./contact";
import { Prices } from "./prices";
import { NewspaperArchive } from "./newspaperArchive";
import { AdvertisingOrder } from "./advertisingOrder/advertisingOrder";
import { Nav } from "./nav";
import { BoardAd } from "./boardAd";
import { NotFound } from "./notFound/notFound";
import { Payment } from "./payment/payment";
import { LogIn } from "./logIn";


export const Routings = () => {
    return (
        <Routes>
            <Route path="/" element={<Nav />}>
                <Route path="/" element={<Home />}></Route>
                <Route path="about" element={<About />}></Route>
                <Route path="contact" element={<Contact />}></Route>
                <Route path="prices" element={<Prices />}></Route>
                <Route path="newspaperArchive" element={<NewspaperArchive />}></Route>
                <Route path="advertisingOrder" element={<AdvertisingOrder />}></Route>
                <Route path="boardAd" element={<BoardAd />}></Route>
                <Route path="payment" element={<Payment />}></Route>
                <Route path="logIn" element={<LogIn />}></Route>
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}
