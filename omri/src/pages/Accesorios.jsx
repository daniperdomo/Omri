import React, { useState, useEffect } from "react";
import categoriasAccesorios from "../jsons/categoriasAccesorios.json";
import ProductGrid from "../components/ProductGrid";

const Accesorios = () => {
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

  // Filtrar productos por categoría "Accesorios" (cod_categoria = "ACCE")
  const productosAccesorios = productos.filter((producto) => producto.cod_categoria === "CARG");

  // Filtrar productos por categoría seleccionada
  const productosFiltrados = categoriaSeleccionada
    ? productosAccesorios.filter((producto) => producto.cod_categoria === categoriaSeleccionada)
    : productosAccesorios;

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
        {/* Header "Accesorios" */}
        <header className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-900">Accesorios</h1>
        </header>

        {/* Subtítulo "Compra por categoría" */}
        <h2 className="text-2xl text-gray-700 mb-6 text-left">Categorías</h2>

        {/* Grid de categorías alineado a la izquierda */}
        <div className="flex justify-start space-x-4 mb-12">
          {categoriasAccesorios.map((category) => (
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
              {/* Texto posicionado más abajo sin overlay */}
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

        {/* Pasar los productos filtrados al ProductGrid */}
        <ProductGrid productos={productosFiltrados} />
      </div>
    </div>
  );
};

export default Accesorios;