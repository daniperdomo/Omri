import React, { useState, useEffect } from "react";
import categoriasCubitt from "../jsons/categoriasCubitt.json";
import ProductGrid from "../components/ProductGrid";
import { debounce } from "lodash";

const Cubitt = () => {
  const [productos, setProductos] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [precioMin, setPrecioMin] = useState("");
  const [precioMax, setPrecioMax] = useState("");
  const [errorPrecio, setErrorPrecio] = useState("");
  const [loading, setLoading] = useState(true);

  // Función para obtener productos desde la API
  const fetchProductos = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8081/api/productos");
      if (!response.ok) {
        throw new Error("Error en la respuesta del servidor");
      }
      const data = await response.json();
      setProductos(data);
      sessionStorage.setItem("productosCubitt", JSON.stringify(data)); // Almacenar en sessionStorage
    } catch (error) {
      console.error("Error leyendo productos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const productosGuardados = sessionStorage.getItem("productosCubitt");
    if (productosGuardados) {
      setProductos(JSON.parse(productosGuardados)); // Cargar desde sessionStorage
      setLoading(false);
    } else {
      fetchProductos();
    }
  }, []);

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

  const aplicarFiltros = () => {
    const productosCubitt = productos.filter((producto) => producto.cod_marca === "CT");
    const productosFiltrados = productosCubitt.filter((producto) => {
      const cumpleCategoria = !categoriaSeleccionada || producto.cod_categoria === categoriaSeleccionada;
      const cumplePrecio =
        (!precioMin || producto.precio >= parseFloat(precioMin)) &&
        (!precioMax || producto.precio <= parseFloat(precioMax));
      return cumpleCategoria && cumplePrecio;
    });
    return productosFiltrados;
  };

  const aplicarFiltrosDebounced = debounce(aplicarFiltros, 300);

  useEffect(() => {
    aplicarFiltrosDebounced();
  }, [categoriaSeleccionada, precioMin, precioMax]);

  const productosFiltrados = aplicarFiltros();

  const handleCategoriaClick = (cod_categoria) => {
    setCategoriaSeleccionada((prev) => (prev === cod_categoria ? null : cod_categoria));
  };

  return (
    <div className="py-8 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-6">
          <img
            src="/images/cubitt/logocubitt.webp"
            alt="Logo de Cubitt"
            className="mx-auto w-48 h-auto"
          />
        </header>

        <h2 className="text-2xl text-gray-700 mb-6 text-left">Categorías</h2>

        <div className="flex justify-center space-x-4 mb-12">
          {categoriasCubitt.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoriaClick(category.cod_categoria)}
              className={`flex-none w-48 h-48 relative rounded-lg overflow-hidden shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                categoriaSeleccionada === category.cod_categoria ? "ring-4 ring-color-hover" : ""
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

        {loading ? (
          <div className="text-center text-gray-500">Cargando productos...</div>
        ) : (
          <ProductGrid productos={productosFiltrados} />
        )}
      </div>
    </div>
  );
};

export default Cubitt;