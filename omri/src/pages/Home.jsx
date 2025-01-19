import React from 'react';

const Home = () => {
    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Bienvenido a Nuestro Negocio</h1>
                <p className="text-lg text-gray-600 mb-8">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Ver más</button>
            </div>
        </div>
    );
};

export default Home;