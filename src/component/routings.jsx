import { Route, Routes } from "react-router-dom";
import { Home } from "./home/home";
import { About } from "./about/about";
import { NewspaperArchive } from "./newspaperArchive";
import { AdvertisingOrder } from "./advertisingOrder/advertisingOrder";
import { BoardAd } from "./boardAd";
import { NotFound } from "./notFound/notFound";
import { Payment } from "./payment/payment";
import { LogIn } from "./logIn";
import { MagazineClosing } from "./magazineClosing";
import { SignUp } from "./signUp";
import { ManagerDetails } from "./managerDetails";
import { Wrapper } from "./wrapper";

export const Routings = () => {
    return (
        <Routes>
            <Route path="/" element={<Wrapper />}>
                <Route path="/" element={<Home />}></Route>
                <Route path="about" element={<About />}></Route>
                <Route path="newspaperArchive" element={<NewspaperArchive />}></Route>
                <Route path="advertisingOrder" element={<AdvertisingOrder />}></Route>
                <Route path="boardAd" element={<BoardAd />}></Route>
                {/* <Route path="payment" element={<Payment />}></Route> */}
                <Route path="signUp" element={<SignUp />}></Route>
                <Route path="logIn" element={<LogIn />}></Route>
                <Route path="magazineClosing" element={<MagazineClosing />}></Route>
                <Route path="managerDetails" element={<ManagerDetails/>}></Route>
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}
