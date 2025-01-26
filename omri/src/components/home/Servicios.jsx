import React from 'react';
import { FaTools, FaHeadset, FaStar } from 'react-icons/fa'; // Importar iconos

const Servicios = () => {
  return (
    <div className="py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Nuestros Servicios</h2>
          <p className="mt-4 text-lg text-gray-600">
            Ofrecemos soluciones adaptadas a tus necesidades.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Columna 1: Servicio */}
          <div className="text-center bg-white p-8 rounded-lg shadow-lg">
            <div className="flex justify-center">
              <FaTools className="text-6xl text-blue-500" />
            </div>
            <h3 className="mt-6 text-xl font-bold text-gray-900">Servicio</h3>
            <p className="mt-2 text-gray-600">
              Ofrecemos servicios especializados para garantizar el mejor rendimiento.
            </p>
          </div>

          {/* Columna 2: Atención Personalizada */}
          <div className="text-center bg-white p-8 rounded-lg shadow-lg">
            <div className="flex justify-center">
              <FaHeadset className="text-6xl text-green-500" />
            </div>
            <h3 className="mt-6 text-xl font-bold text-gray-900">Atención Personalizada</h3>
            <p className="mt-2 text-gray-600">
              Nuestro equipo está siempre disponible para brindarte la mejor atención.
            </p>
          </div>

          {/* Columna 3: Productos de Calidad */}
          <div className="text-center bg-white p-8 rounded-lg shadow-lg">
            <div className="flex justify-center">
              <FaStar className="text-6xl text-yellow-500" />
            </div>
            <h3 className="mt-6 text-xl font-bold text-gray-900">Productos de Calidad</h3>
            <p className="mt-2 text-gray-600">
              Trabajamos con productos de alta calidad para asegurar tu satisfacción.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Servicios;