import React from "react";

const PantallaCarga = () => {
  return (
    <div className="flex flex-col justify-center items-center h-64">
      {/* Contenedor de la imagen giratoria */}
      <div className="animate-spin-slow">
        <img
          src="/images/loading-icon.png" // Ruta de la imagen
          alt="Cargando..."
          className="w-16 h-16" // Tamaño de la imagen
        />
      </div>
    </div>
  );
};

export default PantallaCarga;