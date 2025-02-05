import React from "react";

const Entrada = () => {
    const slide = {
        id: 1,
        title: "Explora las Mejores Ofertas",
        subtitle: "Encuentra los productos que amas a precios increíbles.",
        image: "/images/home/slider/prueba.webp", // Cambia esta ruta por la de tu imagen
    };

    return (
        <div className="flex justify-center items-center w-full">
            {/* Contenedor de la imagen */}
            <div className="w-[100%] h-80 md:h-96 relative overflow-hidden shadow-lg"> {/* Eliminé rounded-lg */}
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