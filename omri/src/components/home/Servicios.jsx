import React from 'react';

const Servicios = () => {
  const servicios = [
    {
      id: 2,
      title: "Atención Personalizada",
      description: "Nuestro equipo está siempre disponible para brindarte la mejor atención",
    },
    {
      id: 3,
      title: "Productos Originales",
      description: "Trabajamos con productos de alta calidad para asegurar tu satisfacción",
    },
  ];

  return (
    <div className="w-full py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título y descripción */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Nuestros Servicios</h2>
        </div>

        {/* Contenedor de servicios con separador vertical */}
        <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-8">
          {servicios.map((servicio, index) => (
            <React.Fragment key={servicio.id}>
              {/* Contenido del servicio */}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{servicio.title}</h3>
                <p className="text-lg text-gray-600">{servicio.description}</p>
              </div>

              {/* Separador vertical (solo entre las dos secciones) */}
              {index < servicios.length - 1 && (
                <div className="h-24 w-1 bg-black mx-4 hidden md:block"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Servicios;