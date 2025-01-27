import React, { useState } from 'react';
import { FaTimes, FaBars, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Nav = () => {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);

    return (
        <nav className="bg-white shadow-lg top-0 left-0 w-full z-50 ">
            <div className="h-20 flex justify-between items-center z-50 text-black lg:py-5 px-10 sm:px-6">
                {/* Contenedor del logo */}
                <div className="flex items-center flex-1">
                    <Link to="/">
                        <img
                            src="/images/logofondoblanco.png"
                            alt="Logo"
                            className="h-20 w-auto md:h-20 lg:h-32 cursor-pointer"
                        />
                    </Link>
                </div>

                {/* Menú de navegación */}
                <div className="lg:flex md:flex lg:flex-1 items-center justify-end font-normal hidden">
                    <div className="flex-10">
                        <ul className="flex gap-8 mr-16 text-lg">
                            <Link to="/">
                                <li className="relative group hover:text-color-hover transition cursor-pointer">
                                    Inicio
                                    {/* Efecto de borde iluminado */}
                                    <span className="absolute left-0 bottom-[-25px] w-full h-0.5 bg-color-hover transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                                </li>
                            </Link>
                            <Link to="/cubitt">
                                <li className="relative group hover:text-color-hover transition cursor-pointer">
                                    Cubitt
                                    {/* Efecto de borde iluminado */}
                                    <span className="absolute left-0 bottom-[-25px] w-full h-0.5 bg-color-hover transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                                </li>
                            </Link>
                            <Link to="/accesorios">
                                <li className="relative group hover:text-color-hover transition cursor-pointer">
                                    Accesorios
                                    {/* Efecto de borde iluminado */}
                                    <span className="absolute left-0 bottom-[-25px] w-full h-0.5 bg-color-hover transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                                </li>
                            </Link>
                            <Link to="/nosotros">
                                <li className="relative group hover:text-color-hover transition cursor-pointer">
                                    Nosotros
                                    {/* Efecto de borde iluminado */}
                                    <span className="absolute left-0 bottom-[-25px] w-full h-0.5 bg-color-hover transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                                </li>
                            </Link>
                        </ul>
                    </div>

                    {/* Barra de búsqueda */}
                    <div className="flex items-center">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Buscar..."
                                className="pl-4 pr-10 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-color-hover text-black"
                            />
                            <FaSearch className="absolute right-3 top-3 text-gray-400" />
                        </div>
                    </div>
                </div>

                {/* Menú desplegable (hamburguesa) */}
                <div>{click && content}</div>
                <button
                    className="block sm:hidden transition"
                    onClick={handleClick}
                >
                    {click ? <FaTimes /> : <FaBars />}
                </button>
            </div>
        </nav>
    );
};

export default Nav;