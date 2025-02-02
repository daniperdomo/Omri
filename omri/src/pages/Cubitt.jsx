import React, { useState, useEffect } from "react";
import categoriasCubitt from "../jsons/categoriasCubitt.json";
import ProductCard from "../components/ProductCard";

const Cubitt = () => {
  const [productos, setProductos] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  // Obtener los productos desde el backend
  useEffect(() => {
    fetch("http://localhost:8081/api/productos")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la respuesta del servidor");
        }
        return response.json();
      })
      .then((data) => setProductos(data))
      .catch((error) => console.error("Error leyendo productos:", error));
  }, []);

  // Filtrar productos por marca "Cubitt" (cod_marca = "CT")
  const productosCubitt = productos.filter((producto) => producto.cod_marca === "CT");

  // Filtrar productos por categoría seleccionada
  const productosFiltrados = categoriaSeleccionada
    ? productosCubitt.filter((producto) => producto.cod_categoria === categoriaSeleccionada)
    : productosCubitt;

  // Agrupar productos por modelo
  const productosPorModelo = productosFiltrados.reduce((acc, product) => {
    const key = `${product.cod_categoria}-${product.modelo}`; // Usamos categoría y modelo como clave
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(product);
    return acc;
  }, {});

  // Manejar clic en una categoría
  const handleCategoriaClick = (cod_categoria) => {
    // Si la categoría ya está seleccionada, la deseleccionamos (mostrar todos los productos)
    if (categoriaSeleccionada === cod_categoria) {
      setCategoriaSeleccionada(null);
    } else {
      setCategoriaSeleccionada(cod_categoria);
    }
  };

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
            <button
              key={category.id}
              onClick={() => handleCategoriaClick(category.cod_categoria)}
              className={`flex-none w-48 h-48 relative rounded-lg overflow-hidden shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                categoriaSeleccionada === category.cod_categoria
                  ? "ring-4 ring-color-hover" 
                  : "" // Sin borde por defecto
              }`}
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
            </button>
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
          {Object.keys(productosPorModelo).map((key) => {
            const productosDelModelo = productosPorModelo[key];
            const primerProducto = productosDelModelo[0]; // Usamos el primer producto para mostrar la información general
            return (
              <ProductCard
                key={key}
                product={primerProducto}
                allProducts={productosDelModelo}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Cubitt;