import React, { useState, useEffect, useRef } from 'react';
import { FaTimes, FaBars, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Nav = () => {
    const [click, setClick] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showSearch, setShowSearch] = useState(false);
    const searchRef = useRef(null);

    const handleClick = () => setClick(!click);

    useEffect(() => {
        fetch('http://localhost:8081/api/productos')
            .then(response => response.json())
            .then(data => {
                sessionStorage.setItem('searchResults', JSON.stringify(data));
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, []);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (!value) {
            setSearchResults([]);
            return;
        }

        const cachedResults = sessionStorage.getItem('searchResults');
        if (cachedResults) {
            const results = JSON.parse(cachedResults);
            const filteredResults = results.filter(product =>
                product.descripcion.toLowerCase().includes(value.toLowerCase())
            );

            const uniqueResults = [];
            const seenDescriptions = new Set();

            filteredResults.forEach(product => {
                if (!seenDescriptions.has(product.descripcion)) {
                    seenDescriptions.add(product.descripcion);
                    uniqueResults.push(product);
                }
            });

            setSearchResults(uniqueResults);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setSearchTerm('');
                setSearchResults([]);
                setShowSearch(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const content = (
        <div className="lg:hidden sticky top-20 left-0 w-full h-full bg-white z-40 transition-transform duration-300 ease-in-out transform translate-x-0">
            <ul className="flex flex-col items-center py-10 gap-6 text-lg">
                <Link to="/" onClick={() => setClick(false)}>
                    <li className="relative group hover:text-color-hover transition cursor-pointer ">
                        Inicio
                        <span className="absolute left-0 bottom-[-6px] w-full h-0.5 bg-color-hover transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                    </li>
                </Link>
                <Link to="/cubitt" onClick={() => setClick(false)}>
                    <li className="relative group hover:text-color-hover transition cursor-pointer">
                        Cubitt
                        <span className="absolute left-0 bottom-[-6px] w-full h-0.5 bg-color-hover transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                    </li>
                </Link>
                <Link to="/accesorios" onClick={() => setClick(false)}>
                    <li className="relative group hover:text-color-hover transition cursor-pointer">
                        Accesorios
                        <span className="absolute left-0 bottom-[-6px] w-full h-0.5 bg-color-hover transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                    </li>
                </Link>
                <Link to="/nosotros" onClick={() => setClick(false)}>
                    <li className="relative group hover:text-color-hover transition cursor-pointer">
                        Nosotros
                        <span className="absolute left-0 bottom-[-6px] w-full h-0.5 bg-color-hover transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                    </li>
                </Link>
            </ul>
        </div>
    );

    return (
        <nav className="bg-white shadow-lg top-0 left-0 w-full z-50">
            <div className="h-20 flex justify-between items-center z-50 text-black lg:py-5 px-10 sm:px-6">
                <div className="flex items-center flex-1">
                    <Link to="/">
                        <img
                            src="/images/logofondoblanco.webp"
                            alt="Logo"
                            className="h-24 w-auto md:h-20 lg:h-32 cursor-pointer"
                        />
                    </Link>
                </div>

                <div className="flex items-center justify-end font-normal">
                    <div className="hidden lg:flex">
                        <ul className="flex gap-8 mr-16 text-lg">
                            <Link to="/">
                                <li className="relative group hover:text-color-hover transition cursor-pointer" style={{ fontFamily: 'Amblas' }}>
                                    Inicio
                                    <span className="absolute left-0 bottom-[-26px] w-full h-0.5 bg-color-hover transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                                </li>
                            </Link>
                            <Link to="/cubitt">
                                <li className="relative group hover:text-color-hover transition cursor-pointer">
                                    Cubitt
                                    <span className="absolute left-0 bottom-[-26px] w-full h-0.5 bg-color-hover transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                                </li>
                            </Link>
                            <Link to="/accesorios">
                                <li className="relative group hover:text-color-hover transition cursor-pointer">
                                    Accesorios
                                    <span className="absolute left-0 bottom-[-26px] w-full h-0.5 bg-color-hover transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                                </li>
                            </Link>
                            <Link to="/nosotros">
                                <li className="relative group hover:text-color-hover transition cursor-pointer">
                                    Nosotros
                                    <span className="absolute left-0 bottom-[-26px] w-full h-0.5 bg-color-hover transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                                </li>
                            </Link>
                        </ul>
                    </div>

                    {/* Barra de búsqueda en PC */}
                    <div className="hidden lg:flex items-center ml-4 mr-4" ref={searchRef}>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Buscar..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className="pl-4 pr-10 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-color-hover text-black w-48 md:w-64"
                            />
                            <FaSearch className="absolute right-3 top-3 text-gray-400" />
                            {searchTerm && searchResults.length > 0 && (
                                <div className="absolute z-50 bg-white border border-gray-300 mt-1 w-full rounded-lg shadow-lg">
                                    <ul>
                                        {searchResults.slice(0, 4).map(product => (
                                            <li key={product.cod_producto} className="p-4 hover:bg-gray-100 flex items-center">
                                                <Link
                                                    to={`/producto/${product.cod_producto}`}
                                                    onClick={() => {
                                                        setSearchTerm('');
                                                        setSearchResults([]);
                                                    }}
                                                >
                                                    <div className="flex items-center">
                                                        <img 
                                                            src={product.imagenes[0]?.url} 
                                                            alt={product.descripcion} 
                                                            className="h-16 w-16 mr-4 object-cover rounded-lg" 
                                                        />
                                                        <span className="text-lg">{product.descripcion}</span>
                                                    </div>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Lupa para móviles */}
                    <div className="block lg:hidden items-center">
                        <button
                            className="text-2xl mr-4"
                            onClick={() => setShowSearch(!showSearch)}
                        >
                            <FaSearch />
                        </button>
                        <button
                            className="transition text-2xl"
                            onClick={handleClick}
                        >
                            {click ? <FaTimes /> : <FaBars />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mostrar la barra de búsqueda en móviles si showSearch es true */}
            {showSearch && (
                <div className="lg:hidden flex items-center justify-center mb-4" ref={searchRef}>
                    <div className="relative w-full px-4 mb-4">
                        <input
                            type="text"
                            placeholder="Buscar..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="pl-4 pr-10 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-color-hover text-black w-full"
                        />
                        <FaSearch className="absolute right-7 top-3 text-gray-400" />
                        {searchTerm && searchResults.length > 0 && (
                            <div className="absolute z-50 bg-white border border-gray-300 mt-1 w-full rounded-lg shadow-lg max-h-60 overflow-y-auto">
                                <ul>
                                    {searchResults.slice(0, 4).map(product => (
                                        <li key={product.cod_producto} className="p-4 hover:bg-gray-100 flex items-center">
                                            <Link
                                                to={`/producto/${product.cod_producto}`}
                                                onClick={() => {
                                                    setSearchTerm('');
                                                    setSearchResults([]);
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <img 
                                                        src={product.imagenes[0]?.url} 
                                                        alt={product.descripcion} 
                                                        className="h-16 w-16 mr-4 object-cover rounded-lg" 
                                                    />
                                                    <span className="text-lg">{product.descripcion}</span>
                                                </div>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {click && content}
        </nav>
    );
};

export default Nav;