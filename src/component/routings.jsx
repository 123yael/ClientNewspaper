import { Route, Routes, Navigate } from "react-router-dom";
import { Home } from "./home/home";
import { About } from "./about/about";
import { NewspaperArchive } from "./newspaperArchive";
import { AdvertisingOrder } from "./advertisingOrder/advertisingOrder";
import { BoardAd } from "./boardAd";
import { NotFound } from "./notFound/notFound";
import { LogIn } from "./logIn";
import { MagazineClosing } from "./magazineClosing";
import { SignUp } from "./signUp";
import { ManagerDetails } from "./managerDetails";
import { Wrapper } from "./wrapper";
import { isAdmin } from "../Axios/customerAxios";
import { getFromLocalStorage } from "../shared-functions/localStorage";
import { useEffect, useState } from "react";

const PrivateRoute = (props) => {

    const isAdminRes = () => {
        const token = getFromLocalStorage("token")
        if (token !== null && token !== undefined)
            isAdmin(token).then((res) => {
                setIsGood(res.data)

            })
        else
            setIsGood(false)

    }

    const isUserConnect = () => {
        const token = getFromLocalStorage("token")
        setIsGood(token !== null && token !== undefined)
    }

    const [isGood, setIsGood] = useState(true)

    useEffect(() => {
        if (props.isLoggedIn === "user") {
            isUserConnect()
        } else {
            isAdminRes()
        }
    }, [])

    return (
        <>
            {
                isGood
                    ? <props.children />
                    : <Navigate to="/" />
            }
        </>
    );
}

export const Routings = () => {
    return (
        <Routes>
            <Route path="/" element={<Wrapper />}>
                <Route path="/" element={<Home />}></Route>
                <Route path="about" element={<About />}></Route>
                <Route path="newspaperArchive" element={<NewspaperArchive />}></Route>
                <Route path="advertisingOrder" element={
                    <PrivateRoute isLoggedIn="user" children={AdvertisingOrder}></PrivateRoute>
                }></Route>
                <Route path="boardAd" element={
                    <PrivateRoute isLoggedIn="user" children={BoardAd}></PrivateRoute>
                }></Route>
                <Route path="signUp" element={<SignUp />}></Route>
                <Route path="logIn" element={<LogIn />}></Route>
                <Route path="magazineClosing" element={
                    <PrivateRoute isLoggedIn="admin" children={MagazineClosing}></PrivateRoute>
                }></Route>
                <Route path="managerDetails" element={
                    <PrivateRoute isLoggedIn="admin" children={ManagerDetails}></PrivateRoute>
                }></Route>
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}
