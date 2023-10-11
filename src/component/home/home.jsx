import { useNavigate } from "react-router-dom"
import './home.css'
import { Box, Button } from "@mui/material"
import { PALLETE } from "../../config"
import { useSelector } from "react-redux"

export const Home = () => {
    return (
        <div className="wrapper" style={{ height: "100vh", background: `linear-gradient(0deg, ${PALLETE.PURPLE} 0%,${PALLETE.BLACK} 33%, ${PALLETE.PINK} 66%, ${PALLETE.BLUE} 100%)`}}>
            <h1>The most convenient and profitable advertising</h1>
            <div><span className="dot"></span></div>
            <div><span className="dot"></span></div>
            <div><span className="dot"></span></div>
            <div><span className="dot"></span></div>
            <div><span className="dot"></span></div>
            <div><span className="dot"></span></div>
            <div><span className="dot"></span></div>
            <div><span className="dot"></span></div>
            <div><span className="dot"></span></div>
            <div><span className="dot"></span></div>
            <div><span className="dot"></span></div>
            <div><span className="dot"></span></div>
            <div><span className="dot"></span></div>
            <div><span className="dot"></span></div>
        </div>

    )
}

