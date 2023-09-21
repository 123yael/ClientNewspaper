import { Box } from "@mui/material"
import Nav from "./nav"
import { Footer } from "./footer"
import { Outlet } from "react-router-dom"

export const Wrapper = () => {
    return (
        <Box>
            <Nav></Nav>
            <Outlet></Outlet>
            <Footer></Footer>
        </Box>
    )
}