import React from "react";
import SliderHero from "../components/home/SliderHero";
import Cards from "../components/home/Cards";
import Menu from "../components/home/Menu";

const Home = () => {
    return (
        <div>
            {/* SliderHero */}
            <SliderHero />

            {/* Cards */}
            <Cards />
            <Menu/>
        </div>
    );
};

export default Home;