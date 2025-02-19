import React from "react";

const Entrada = () => {
    const slide = {
        id: 1,
        title: "¡Bienvenido a la web de Omri!",
        subtitle: "Consulta la disponibilidad e información de los productos que amas",
        image: "/images/home/slider/prueba.webp", // Cambia esta ruta por la de tu imagen
    };

    return (
        <div className="flex justify-center items-center w-full pt-4 px-4 bg-gray-100"> 
            {/* Contenedor de la imagen */}
            <div className="w-full h-80 md:h-96 relative rounded-lg overflow-hidden shadow-lg">
                {/* Imagen de fondo */}
                <div
                    className="absolute inset-0 w-full h-full"
                    style={{
                        backgroundImage: `url(${slide.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    {/* Overlay oscuro */}
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                        {/* Texto centrado */}
                        <div className="text-center text-white px-4">
                            <h1 className="text-2xl md:text-4xl font-bold">{slide.title}</h1>
                            <p className="mt-2 text-sm md:text-lg">{slide.subtitle}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Entrada;