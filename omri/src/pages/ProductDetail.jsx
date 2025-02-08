import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Importar useNavigate

const ProductDetail = () => {
  const { cod_producto } = useParams();
  const navigate = useNavigate(); // Hook para navegar
  const [producto, setProducto] = useState(null);
  const [productosRelacionados, setProductosRelacionados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState("");
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
          setAvailability(data.cantidad > 0);
          setSelectedColor(data.color);
        }
        return fetch(`http://localhost:8081/api/productos/modelo/${data.modelo}`);
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la respuesta del servidor");
        }
        return response.json();
      })
      .then((data) => {
        setProductosRelacionados(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error obteniendo detalles del producto:", error);
        setLoading(false);
      });
  }, [cod_producto]);

  const handleColorClick = (productoRelacionado) => {
    setCurrentImage(productoRelacionado.imagenes[0]?.url || "");
    setAvailability(productoRelacionado.cantidad > 0);
    setSelectedColor(productoRelacionado.color);
    setProducto(productoRelacionado);
  };

  if (loading) {
    return <div className="text-center py-8">Cargando...</div>;
  }

  if (!producto) {
    return <div className="text-center py-8">Producto no encontrado</div>;
  }

  return (
    <div className="py-12 bg-gray-100 min-h-screen relative"> {/* Contenedor padre con position: relative */}
      {/* Botón de retroceso */}
      <button
        onClick={() => navigate(-1)} // Navegar a la página anterior
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
            {/* Columna izquierda: Imagen del producto */}
            <div className="flex justify-center items-center">
              <div className="w-[500px] h-[500px] flex justify-center items-center border-2 border-gray-200 rounded-lg overflow-hidden">
                <img
                  src={currentImage}
                  alt={producto.descripcion}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Columna derecha: Detalles del producto */}
            <div className="space-y-6">
              {/* Título del producto */}
              <h1 className="text-4xl font-bold text-gray-900">{producto.descripcion}</h1>

              {/* Precio */}
              <p className="text-3xl font-semibold text-gray-800">
                ${producto.precio.toFixed(2)}
              </p>

              {/* Disponibilidad */}
              <div className="flex items-center space-x-2">
                {availability ? (
                  <span className="text-lg font-semibold text-green-600">Disponible</span>
                ) : (
                  <span className="text-lg font-semibold text-red-600">No disponible</span>
                )}
              </div>

              {/* Descripción */}
              <div className="text-gray-700 text-lg">
                <p><strong>Características:</strong> {producto.caracteristicas}</p>
              </div>

              {/* Selector de colores (solo si no es un accesorio) */}
              {!isAccesorio && (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900">Colores:</h3>
                  <div className="flex space-x-3">
                    {productosRelacionados.map((prod, index) => (
                      <button
                        key={index}
                        className={`w-10 h-10 rounded-full border-2 focus:outline-none transition-all duration-200 ${
                          selectedColor === prod.color
                            ? "border-blue-500 scale-110"
                            : "border-gray-300 hover:scale-105"
                        }`}
                        style={{ backgroundColor: prod.color }}
                        onClick={() => handleColorClick(prod)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;