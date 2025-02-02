import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { cod_producto } = useParams();
  const [producto, setProducto] = useState(null);
  const [productosRelacionados, setProductosRelacionados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState("");
  const [availability, setAvailability] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");

  // Obtener el producto principal y los productos relacionados
  useEffect(() => {
    // Obtener el producto principal
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

        // Obtener todos los productos relacionados (mismo modelo)
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

  // Manejar el cambio de color y actualizar la imagen y disponibilidad
  const handleColorClick = (productoRelacionado) => {
    setCurrentImage(productoRelacionado.imagenes[0]?.url || "");
    setAvailability(productoRelacionado.cantidad > 0);
    setSelectedColor(productoRelacionado.color);
    setProducto(productoRelacionado); // Actualizar el producto principal
  };

  if (loading) {
    return <div className="text-center py-8">Cargando...</div>;
  }

  if (!producto) {
    return <div className="text-center py-8">Producto no encontrado</div>;
  }

  return (
    <div className="py-12 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            {/* Columna izquierda: Imagen del producto */}
            <div>
              <img
                src={currentImage}
                alt={producto.descripcion}
                className="w-full h-auto rounded-lg"
              />
            </div>

            {/* Columna derecha: Detalles del producto */}
            <div className="space-y-6">
              {/* Título del producto */}
              <h1 className="text-3xl font-bold text-gray-900">{producto.descripcion}</h1>

              {/* Precio */}
              <p className="text-2xl font-semibold text-gray-800">
                ${producto.precio.toFixed(2)}
              </p>

              {/* Disponibilidad */}
              <div className="flex items-center space-x-2">
                {availability ? (
                  <span className="text-sm font-semibold text-green-600">Disponible</span>
                ) : (
                  <span className="text-sm font-semibold text-red-600">No disponible</span>
                )}
              </div>

              {/* Descripción */}
              <div className="text-gray-700">
                <p><strong>Características:</strong> {producto.caracteristicas}</p>
              </div>

              {/* Selector de colores */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Colores:</h3>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;