import React, { useState, useEffect } from "react";
import productosCubitt from "../jsons/productosCubitt.json";
import categoriasCubitt from "../jsons/categoriasCubitt.json";

const Cubitt = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8081/api/producto")
      .then((response) => response.json())
      .then((data) => {
        const productosConImagenes = data
          .map((producto) => {
            const imagenes = productosCubitt.find(
              (cubittProducto) => cubittProducto.id === producto.cod_producto
            );

            if (!imagenes) {
              console.warn(`Producto no encontrado en JSON: ${producto.cod_producto}`);
              return null; // Excluir el producto
            }

            return {
              ...producto,
              ...imagenes,
              cod_producto: imagenes.colors[0].id, // Establecer el código inicial del producto
            };
          })
          .filter((producto) => producto !== null); // Filtrar productos nulos

        setProductos(productosConImagenes);
      })
      .catch((error) => console.error("Error leyendo productos:", error));
  }, []);

  return (
    <div className="py-8 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header con imagen centrada */}
        <header className="text-center mb-6">
          <img
            src="/images/cubitt/logocubitt.png"
            alt="Logo de Cubitt"
            className="mx-auto w-48 h-auto"
          />
        </header>

        {/* Subtítulo "Compra por categoría" */}
        <h2 className="text-2xl text-gray-700 mb-6 text-left">Categorías</h2>

        {/* Grid de categorías */}
        <div className="flex justify-center space-x-4 mb-12">
          {categoriasCubitt.map((category) => (
            <a
              key={category.id}
              href={category.link}
              className="flex-none w-48 h-48 relative rounded-lg overflow-hidden shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-center">
                <h3 className="text-lg font-bold text-white text-center">
                  {category.title}
                </h3>
              </div>
            </a>
          ))}
        </div>

        {/* Sección de filtros */}
        <div className="flex items-center space-x-4 mb-8">
          {/* Texto "Filtrar por:" */}
          <h2 className="text-2xl text-gray-700">Filtrar por:</h2>

          {/* Filtro: Categoría */}
          <div className="w-32 h-10 flex items-center justify-center bg-white border border-black rounded-lg shadow-md">
            <span className="text-sm font-semibold text-black">Categoría</span>
          </div>

          {/* Filtro: Marca */}
          <div className="w-32 h-10 flex items-center justify-center bg-white border border-black rounded-lg shadow-md">
            <span className="text-sm font-semibold text-black">Marca</span>
          </div>

          {/* Filtro: Precio */}
          <div className="w-32 h-10 flex items-center justify-center bg-white border border-black rounded-lg shadow-md">
            <span className="text-sm font-semibold text-black">Precio</span>
          </div>
        </div>

        {/* Grid de productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {productos.map((product) => (
            <ProductCard key={product.cod_producto} product={product} productos={productos} />
          ))}
        </div>
      </div>
    </div>
  );
};

const ProductCard = ({ product, productos }) => {
  const [currentImage, setCurrentImage] = useState(product.image);
  const [currentProductCode, setCurrentProductCode] = useState(product.cod_producto);

  const handleColorClick = (image, cod_producto) => {
    setCurrentImage(image);
    setCurrentProductCode(cod_producto);
  };

  // Buscar el producto actual basado en el currentProductCode
  const currentProduct = productos.find(p => p.cod_producto === currentProductCode);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
      <img
        src={currentImage}
        alt={product.descripcion}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        {/* Nombre del producto con estado de disponibilidad */}
        <div className="items-center mb-2">
          <h3 className="text-lg font-bold text-gray-900">{product.descripcion}</h3>
          {currentProduct && currentProduct.cantidad > 0 ? (
            <span className="text-sm font-semibold text-green-600">Disponible</span>
          ) : (
            <span className="text-sm font-semibold text-red-600">No disponible</span>
          )}
        </div>

        {/* Precio */}
        <p className="text-gray-700">${product.precio.toFixed(2)}</p>

        {/* Categoría */}
        <p className="text-sm text-gray-500">{product.cod_categoria}</p>

        {/* Círculos de colores */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex space-x-2 mt-2">
            {product.colors.map((color, index) => (
              <button
                key={index}
                className="w-6 h-6 rounded-full border-2 border-gray-300 focus:outline-none"
                style={{ backgroundColor: color.color }}
                onClick={() => handleColorClick(color.image, color.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cubitt;