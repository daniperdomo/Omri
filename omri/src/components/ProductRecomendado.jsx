import React from "react";
import ProductCard from "../components/ProductCard";

const ProductRecomendado = ({ productos, categoria, modeloSeleccionado }) => {
  // Filtrar productos por la categoría y excluir el modelo seleccionado
  const productosRecomendados = productos.filter(
    (producto) => producto.cod_categoria === categoria && producto.modelo !== modeloSeleccionado
  );

  // Crear un conjunto para rastrear modelos únicos
  const modelosVistos = new Set();
  const productosLimitados = [];

  // Iterar sobre los productos recomendados y agregar solo uno por modelo
  for (const producto of productosRecomendados) {
    const modelo = producto.modelo;

    // Agregar el producto si no hemos visto este modelo antes
    if (!modelosVistos.has(modelo)) {
      modelosVistos.add(modelo);
      productosLimitados.push(producto);
    }

    // Limitar a un máximo de 4 productos
    if (productosLimitados.length >= 4) {
      break;
    }
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Productos Recomendados</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productosLimitados.map((producto) => {
          // Filtrar colores disponibles para el modelo actual
          const coloresDisponibles = productosRecomendados.filter(
            (prod) => prod.modelo === producto.modelo
          );

          return (
            <ProductCard 
              key={producto.cod_producto} 
              product={producto} 
              allProducts={coloresDisponibles} // Pasar solo los colores disponibles
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProductRecomendado;