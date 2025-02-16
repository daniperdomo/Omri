import React from "react";
import ProductCard from "../components/ProductCard";

const ProductRecomendado = ({ productos, categoria, modeloSeleccionado, marca }) => {
  // Filtrar productos de la misma categoría
  const productosPorCategoria = productos.filter(
    (producto) => producto.cod_categoria === categoria && producto.modelo !== modeloSeleccionado
  );

  // Filtrar productos de la misma marca
  const productosPorMarca = productos.filter(
    (producto) => producto.cod_marca === marca && producto.modelo !== modeloSeleccionado
  );

  const modelosVistos = new Set();
  const productosLimitados = [];

  // Agregar productos de la misma categoría primero
  for (const producto of productosPorCategoria) {
    const modelo = producto.modelo;

    if (!modelosVistos.has(modelo)) {
      modelosVistos.add(modelo);
      productosLimitados.push(producto);
    }

    if (productosLimitados.length >= 4) {
      break;
    }
  }

  // Si hay menos de 4, agregar productos de la misma marca
  if (productosLimitados.length < 4) {
    for (const producto of productosPorMarca) {
      const modelo = producto.modelo;

      if (!modelosVistos.has(modelo)) {
        modelosVistos.add(modelo);
        productosLimitados.push(producto);
      }

      if (productosLimitados.length >= 4) {
        break;
      }
    }
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Productos Recomendados</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productosLimitados.map((producto) => {
          const coloresDisponibles = productos.filter(
            (prod) => prod.modelo === producto.modelo
          );

          return (
            <ProductCard 
              key={producto.cod_producto} 
              product={producto} 
              allProducts={coloresDisponibles}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProductRecomendado;