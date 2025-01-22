import React, { useState } from 'react';
import { FaTimes, FaBars } from 'react-icons/fa'; 
import { Link } from 'react-router-dom';

const Nav = () => {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);

    return (
        <nav>
            <div className="h-20 flex justify-between items-center z-50 text-white lg:py-5 px-10 sm:px-6">
                {/* Contenedor del logo */}
                <div className="flex items-center flex-1">
                    <img src="/images/logofondonegro.png" alt="Logo" className="h-20 w-auto md:h-20 lg:h-32 cursor-pointer" />
                </div>

                <div className="lg:flex md:flex lg:flex-1 items-center justify-end font-normal hidden">
                    <div className="flex-10">
                        <ul className="flex gap-8 mr-16 text-lg">
                            <Link to="/">
                                <li className="hover:text-color-hover transition border-b-2 border-black hover:border-color-hover cursor-pointer">
                                    Inicio
                                </li>
                            </Link>
                            <Link to="/cubitt">
                                <li className="hover:text-color-hover transition border-b-2 border-black hover:border-color-hover cursor-pointer">
                                    Cubitt
                                </li>
                            </Link>
                            <Link to="/accesorios">
                                <li className="hover:text-color-hover transition border-b-2 border-black hover:border-color-hover cursor-pointer">
                                    Accesorios
                                </li>
                            </Link>
                            <Link to="/nosotros">
                                <li className="hover:text-color-hover transition border-b-2 border-black hover:border-color-hover cursor-pointer">
                                    Nosotros
                                </li>
                            </Link>
                        </ul>
                    </div>
                </div>

                {/* Menú desplegable (hamburguesa) */}
                <div>
                    {click && content}
                </div>
                <button 
                    className="block sm:hidden transition"
                    onClick={handleClick}
                >
                    {click ? <FaTimes /> : <FaBars />} 
                </button>
            </div>
        </nav>
    );
}

export default Nav;