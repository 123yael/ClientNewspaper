import { Route, Routes } from "react-router-dom";
import { Home } from "./home/home";
import { About } from "./about/about";
import { Prices } from "./prices";
import { NewspaperArchive } from "./newspaperArchive";
import { AdvertisingOrder } from "./advertisingOrder/advertisingOrder";
import { Nav } from "./nav";
import { BoardAd } from "./boardAd";
import { NotFound } from "./notFound/notFound";
import { Payment } from "./payment/payment";
import { LogIn } from "./logIn";
import { SignIn } from "./signIn";
import { MagazineClosing } from "./magazineClosing";
import { SignUp } from "./signUp";
import { ManagerDetails } from "./managerDetails";

export const Routings = () => {
    return (
        <Routes>
            <Route path="/" element={<Nav />}>
                <Route path="/" element={<Home />}></Route>
                <Route path="about" element={<About />}></Route>
                <Route path="prices" element={<Prices />}></Route>
                <Route path="newspaperArchive" element={<NewspaperArchive />}></Route>
                <Route path="advertisingOrder" element={<AdvertisingOrder />}></Route>
                <Route path="boardAd" element={<BoardAd />}></Route>
                <Route path="payment" element={<Payment />}></Route>
                <Route path="logIn" element={<LogIn />}></Route>
                <Route path="signUp" element={<SignUp />}></Route>
                <Route path="signIn" element={<SignIn />}></Route>
                <Route path="magazineClosing" element={<MagazineClosing />}></Route>
                <Route path="managerDetails" element={<ManagerDetails/>}></Route>
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}
