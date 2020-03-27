import React from "react";
import { Link } from "react-router-dom"

const Home = () => {
    return (
        <div>
            <h1>Home</h1>
            <Link className="pizza" to={"/pizza"}>
                <div className="order-here">Order Pizza</div>
            </Link>
        </div>
    )
}

export default Home;