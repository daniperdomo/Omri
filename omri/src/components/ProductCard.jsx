import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, allProducts }) => {
  const [currentImage, setCurrentImage] = useState(
    product.imagenes && product.imagenes.length > 0 ? product.imagenes[0].url : ""
  );
  const [availability, setAvailability] = useState(product.cantidad > 0);
  const navigate = useNavigate();

  // Manejar el cambio de imagen al seleccionar un color
  const handleColorClick = (image, quantity) => {
    setCurrentImage(image);
    setAvailability(quantity > 0);
  };

  // Manejar clic en la tarjeta para redirigir a la página de detalles
  const handleCardClick = () => {
    navigate(`/producto/${product.cod_producto}`);
  };

  // Verificar si el producto pertenece a las categorías CARG, CABL o AUDIF
  const isAccesorio = product.cod_categoria === "CARG" || product.cod_categoria === "CABL" || product.cod_categoria === "AUDIF";

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Contenedor de tamaño fijo para la imagen */}
      <div className="w-full h-48 overflow-hidden">
        {currentImage ? (
          <img
            src={currentImage}
            alt={product.descripcion}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No hay imagen disponible</span>
          </div>
        )}
      </div>

      <div className="p-4">
        {/* Nombre del producto */}
        <h3 className="text-lg font-bold text-gray-900">{product.descripcion}</h3>

        {/* Precio */}
        <p className="text-gray-700">${product.precio.toFixed(2)}</p>

        {/* Disponibilidad */}
        {availability ? (
          <span className="text-sm font-semibold text-green-600">Disponible</span>
        ) : (
          <span className="text-sm font-semibold text-red-600">No disponible</span>
        )}

        {/* Círculos de colores (solo si no es un accesorio) */}
        {!isAccesorio && (
          <div className="flex space-x-2 mt-2">
            {allProducts.map((otherProduct, index) => (
              <button
                key={index}
                className="w-6 h-6 rounded-full border-2 border-gray-300 focus:outline-none"
                style={{ backgroundColor: otherProduct.color }}  // Usamos el color del producto
                onClick={(e) => {
                  e.stopPropagation(); // Evitar que el clic en el color redirija a la página de detalles
                  handleColorClick(otherProduct.imagenes[0]?.url, otherProduct.cantidad);
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;