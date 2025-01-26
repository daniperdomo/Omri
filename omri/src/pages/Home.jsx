import React from "react";
import SliderHero from "../components/home/SliderHero";
import Cards from "../components/home/Cards";
import Menu from "../components/home/Menu";
import Categorias from "../components/home/Categorias";
import Servicios from "../components/home/Servicios";

const Home = () => {
    return (
        <div>
            {/* Slider :) */}
            <SliderHero />

            
            <Menu/>
            <Servicios/>
        </div>
    );
};

export default Home;