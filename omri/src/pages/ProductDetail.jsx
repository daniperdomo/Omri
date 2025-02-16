import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaWhatsapp } from 'react-icons/fa';
import PantallaCarga from "../components/PantallaCarga";
import ProductRecomendado from "../components/ProductRecomendado";

const ProductDetail = () => {
  const { cod_producto } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [productosRelacionados, setProductosRelacionados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState("");
  const [allImages, setAllImages] = useState([]);
  const [availability, setAvailability] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");

  const isAccesorio = producto && (
    producto.cod_categoria === "CARG" || 
    producto.cod_categoria === "CABL" || 
    producto.cod_categoria === "AUDIF"
  );

  useEffect(() => {
    fetch(`http://localhost:8081/api/productos/${cod_producto}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la respuesta del servidor");
        }
        return response.json();
      })
      .then((data) => {
        setProducto(data);
        if (data.imagenes && data.imagenes.length > 0) {
          setCurrentImage(data.imagenes[0].url);
          setAllImages(data.imagenes);
          setAvailability(data.cantidad > 0);
          setSelectedColor(data.color);
        }
        // Realizar la búsqueda de productos relacionados por categoría y marca
        return fetch(`http://localhost:8081/api/productos/categoria/${data.cod_categoria}/marca/${data.cod_marca}`);
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la respuesta del servidor");
        }
        return response.json();
      })
      .then((data) => {
        setProductosRelacionados(data);
        console.log('Data: ', data)
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error obteniendo detalles del producto:", error);
        setLoading(false);
      });
  }, [cod_producto]);

  const handleColorClick = (productoRelacionado) => {
    setCurrentImage(productoRelacionado.imagenes[0]?.url || "");
    setAllImages(productoRelacionado.imagenes);
    setAvailability(productoRelacionado.cantidad > 0);
    setSelectedColor(productoRelacionado.color);
    setProducto(productoRelacionado);
  };

  if (loading) {
    return <PantallaCarga />;
  }

  if (!producto) {
    return <div className="text-center py-8">Producto no encontrado</div>;
  }

  const whatsappNumber = "1234567890";
  const whatsappMessage = `Hola, estoy interesado en el producto: ${producto.descripcion}.`;

  // Filtrar productos relacionados por modelo para obtener colores disponibles
  const coloresDisponibles = productosRelacionados.filter(
    (prod) => prod.modelo === producto.modelo
  );

  return (
    <div className="py-12 bg-gray-100 min-h-screen relative">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-2 left-4 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition duration-300"
        aria-label="Volver atrás"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
      </button>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            {/* Columna izquierda: Imagen principal y miniaturas */}
            <div className="flex flex-col items-center">
              {/* Imagen principal */}
              <div className="w-full max-w-[500px] h-[500px] flex justify-center items-center border-2 border-gray-200 rounded-lg overflow-hidden mb-4">
                <img
                  src={currentImage}
                  alt={producto.descripcion}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Miniaturas de imágenes */}
              <div className="flex space-x-2">
                {allImages.map((img, index) => (
                  <button
                    key={index}
                    className={`flex-shrink-0 w-16 h-16 border-b-4 focus:outline-none transition-all duration-200 ${
                      currentImage === img.url
                        ? "border-b-2 border-color-hover scale-110"
                        : "border-b-2 border-transparent hover:border-color-hover-50 hover:scale-105"
                    }`}
                    onClick={() => setCurrentImage(img.url)}
                  >
                    <img
                      src={img.url}
                      alt={`Imagen ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Columna derecha: Detalles del producto */}
            <div className="space-y-6">
              <h1 className="text-4xl font-bold text-gray-900">{producto.descripcion}</h1>
              <p className="text-3xl font-semibold text-gray-800">
                ${producto.precio.toFixed(2)}
              </p>
              <div className="flex items-center space-x-2">
                {availability ? (
                  <span className="text-lg font-semibold text-green-600">Disponible</span>
                ) : (
                  <span className="text-lg font-semibold text-red-600">No disponible</span>
                )}
              </div>
              <div className="text-gray-700 text-lg">
                <p><strong>Características:</strong> {producto.caracteristicas}</p>
              </div>
              {!isAccesorio && (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900">Colores:</h3>
                  <div className="flex space-x-3">
                    {coloresDisponibles.map((prod, index) => (
                      <button
                        key={index}
                        className={`w-10 h-10 rounded-full border-2 focus:outline-none transition-all duration-200 ${
                          selectedColor === prod.color
                            ? "border-color-hover scale-110"
                            : "border-gray-300 hover:scale-105"
                        }`}
                        style={{ backgroundColor: prod.color }}
                        onClick={() => handleColorClick(prod)}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div className="m-4 flex justify-center mt-12 md:pt-12"> 
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 bg-green-500 text-white font-semibold rounded-full shadow-md hover:bg-green-600 transition duration-300 w-full max-w-xs md:max-w-md md:h-16"
                >
                  <FaWhatsapp style={{ color: "#ffffff", fontSize: "36px" }} className="mr-2" />
                  <span className="md:text-xl">
                    Contactar por WhatsApp
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Componente de productos recomendados */}
        <ProductRecomendado 
          productos={productosRelacionados} 
          categoria={producto.cod_categoria} 
          modeloSeleccionado={producto.modelo} 
          marca={producto.cod_marca}
        />
      </div>
    </div>
  );
};

export default ProductDetail;