import React from "react";
import { Link } from "react-router-dom"

const Home = () => {
    return (
        <div>
            <h1>Home</h1>
            <Link className="flexin" to={"/pizza"}>
                <div className="order-here">Get Orderin'</div>
            </Link>
        </div>
    )
}

export default Home;