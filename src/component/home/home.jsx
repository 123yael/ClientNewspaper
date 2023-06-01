import { useNavigate } from "react-router-dom"
import './home.css'
import { Button } from "@mui/material"

export const Home = () => {

    const navigate = useNavigate()

    const toMain = () => {
        debugger
        console.log("i rnter");
        navigate('/about')
    }

    return (
        <section className="grainy-gradient-intro">
            <svg height="0" width="0">
                <filter id='f'>
                    <feTurbulence type='fractalNoise' baseFrequency='.5' />
                </filter>
            </svg>
            <div className="d-flex justify-content-center align-items-center text-center mb-0 my-4" style={{ height: "60vh" }}>
                <h1 className="display-4 fw-bold text-uppercase text-dark mb-0" style={{ letterSpacing: "8px" }}>The most convenient and profitable advertising</h1>
            </div>
            <Button onClick={() => toMain()} className="bg-light text-dark p-3">more details...</Button>
        </section>
    )
}

