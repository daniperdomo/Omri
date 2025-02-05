import React, { useState, useEffect } from "react";

const SliderHero = () => {
    const slides = [
        {
            id: 1,
            title: "Explora las Mejores Ofertas",
            subtitle: "Encuentra los productos que amas a precios increíbles.",
            image: "/images/home/slider/cubittbanner.webp",
        },
        {
            id: 2,
            title: "Tecnología de Última Generación",
            subtitle: "Lleva tu experiencia al siguiente nivel.",
            image: "/images/home/slider/arabebanner.webp",
        },
        {
            id: 3,
            title: "Diseño para Inspirarte",
            subtitle: "Crea espacios únicos con nuestro catálogo.",
            image: "/images/home/slider/applebanner.webp",
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    // Cambiar automáticamente el slider cada 5 segundos
    useEffect(() => {
        const interval = setInterval(() => {
            goToNextSlide();
        }, 6000); // Cambia cada 6 segundos

        return () => clearInterval(interval); // Limpia el intervalo al desmontar
    }, [currentIndex]);

    // Función para ir al siguiente slide
    const goToNextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    };

    // Función para ir al slide anterior
    const goToPrevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? slides.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="relative w-full overflow-hidden">
            {/* Slider */}
            <div className="relative flex w-full h-80 md:h-96">
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
                            index === currentIndex ? "opacity-100" : "opacity-0"
                        }`}
                        style={{
                            backgroundImage: `url(${slide.image})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    >
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                            <div className="text-center text-white px-4">
                                <h1 className="text-2xl md:text-4xl font-bold">{slide.title}</h1>
                                <p className="mt-2 text-sm md:text-lg">{slide.subtitle}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Flechas de navegación */}
            <button
                onClick={goToPrevSlide}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-opacity"
            >
                &#8592; {/* Flecha izquierda */}
            </button>
            <button
                onClick={goToNextSlide}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-opacity"
            >
                &#8594; {/* Flecha derecha */}
            </button>
        </div>
    );
};

export default SliderHero;