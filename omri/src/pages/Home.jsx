import React from "react";
import SliderHero from "../components/home/SliderHero";
import Menu from "../components/home/Menu";
import Servicios from "../components/home/Servicios";
import Entrada from "../components/home/Entrada";

const Home = () => {
    return (
        <div>
            {/* Slider :) */}
            <Entrada />
            
            <Menu/>
            <Servicios/>
        </div>
    );
};

export default Home;