import React from "react";
import SliderHero from "../components/home/SliderHero";
import Cards from "../components/home/Cards";
import Menu from "../components/home/Menu";
import Categorias from "../components/home/Categorias";
import Servicios from "../components/home/Servicios";
import Entrada from "../components/home/Entrada";

const Home = () => {
    return (
        <div>
            {/* Slider :) */}
            <Entrada />
            <Cards />
            
            <Menu/>
            <Servicios/>
        </div>
    );
};

export default Home;