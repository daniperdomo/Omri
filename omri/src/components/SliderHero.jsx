import React, { useState, useEffect } from "react";

const SliderHero = () => {
    const slides = [
        {
            id: 1,
            title: "Explora las Mejores Ofertas",
            subtitle: "Encuentra los productos que amas a precios increíbles.",
            image: "/images/cubittbanner.webp",
        },
        {
            id: 2,
            title: "Tecnología de Última Generación",
            subtitle: "Lleva tu experiencia al siguiente nivel.",
            image: "/images/arabebanner.webp",
        },
        {
            id: 3,
            title: "Diseño para Inspirarte",
            subtitle: "Crea espacios únicos con nuestro catálogo.",
            image: "/images/applebanner.jpg",
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    // Cambiar automáticamente el slider cada 5 segundos
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 5000); // Cambia cada 5 segundos

        return () => clearInterval(interval); // Limpia el intervalo al desmontar
    }, [slides.length]);

    // Cambiar el slide manualmente al hacer clic en un indicador
    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div className="relative w-full overflow-hidden">
            {/* Slider */}
            <div className="relative flex w-full h-80 md:h-96">
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 w-full h-full transform transition-transform duration-700 ${
                            index === currentIndex ? "translate-x-0" : "translate-x-full"
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

            {/* Indicadores/Dots */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                {slides.map((_, index) => (
                    <div
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full cursor-pointer transition-opacity ${
                            index === currentIndex ? "bg-white opacity-100" : "bg-white opacity-50 hover:opacity-100"
                        }`}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default SliderHero;