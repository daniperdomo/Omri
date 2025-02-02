import React, { useState, useEffect } from "react";
import categoriasCubitt from "../jsons/categoriasCubitt.json";
import ProductGrid from "../components/ProductGrid";

const Cubitt = () => {
  const [productos, setProductos] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [precioMin, setPrecioMin] = useState("");
  const [precioMax, setPrecioMax] = useState("");
  const [errorPrecio, setErrorPrecio] = useState("");

  const handleCategoriaClick = (cod_categoria) => {
    setCategoriaSeleccionada(cod_categoria)
    // Si la categoría ya está seleccionada, la deseleccionamos (mostrar todos los productos)
    if (categoriaSeleccionada === cod_categoria) {
      setCategoriaSeleccionada(null);
    } else {
      setCategoriaSeleccionada(cod_categoria);
    }
  };

  // Obtener productos desde la API
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

  // Validar precios
  const validarPrecio = () => {
    if (precioMin && precioMax && parseFloat(precioMin) > parseFloat(precioMax)) {
      setErrorPrecio("El precio mínimo no puede ser mayor que el máximo.");
      return false;
    }
    if (isNaN(precioMin) || isNaN(precioMax)) {
      setErrorPrecio("Los precios deben ser números válidos.");
      return false;
    }
    setErrorPrecio("");
    return true;
  };

  // Filtrar productos por marca Cubitt (cod_marca === "CT")
  const productosCubitt = productos.filter((producto) => producto.cod_marca === "CT");

  // Aplicar filtros
  const productosFiltrados = productosCubitt.filter((producto) => {
    const cumpleCategoria = !categoriaSeleccionada || producto.cod_categoria === categoriaSeleccionada;
    const cumplePrecio =
      (!precioMin || producto.precio >= parseFloat(precioMin)) &&
      (!precioMax || producto.precio <= parseFloat(precioMax));
    return cumpleCategoria && cumplePrecio;
  });

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
                : ""
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

        {/* Filtros */}
        <div className="flex items-center space-x-4 mb-8">
          <h2 className="text-2xl text-gray-700">Filtrar por:</h2>

          {/* Select de categorías */}
          <select
            value={categoriaSeleccionada}
            onChange={(e) => setCategoriaSeleccionada(e.target.value)}
            className="w-32 h-10 bg-white border border-black rounded-lg shadow-md px-2"
          >
            <option value="">Categoría</option>
            <option value="">Todas</option>
            {categoriasCubitt.map((category) => (
              <option key={category.cod_categoria} value={category.cod_categoria}>
                {category.title}
              </option>
            ))}
          </select>

          {/* Inputs de precio */}
          <div className="flex space-x-2">
            <input
              type="number"
              placeholder="$-Min"
              value={precioMin}
              onChange={(e) => setPrecioMin(e.target.value)}
              onBlur={validarPrecio}
              min="0"
              className="w-24 h-10 bg-white border border-black rounded-lg shadow-md px-2"
            />
            <input
              type="number"
              placeholder="$-Max"
              value={precioMax}
              onChange={(e) => setPrecioMax(e.target.value)}
              onBlur={validarPrecio}
              min="0"
              className="w-24 h-10 bg-white border border-black rounded-lg shadow-md px-2"
            />
          </div>
          {errorPrecio && <p className="text-red-500 text-sm">{errorPrecio}</p>}
        </div>

        {/* Pasar los productos filtrados al ProductGrid */}
        <ProductGrid productos={productosFiltrados} />
      </div>
    </div>
  );
};

export default Cubitt;