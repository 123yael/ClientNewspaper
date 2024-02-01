import './home.css'
import { PALLETE } from "../../config"

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

