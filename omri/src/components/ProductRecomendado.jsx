import React from "react";
import ProductCard from "../components/ProductCard";

const ProductRecomendado = ({ productos, categoria }) => {
  // Filtrar productos por la categoría
  const productosRecomendados = productos.filter(
    (producto) => producto.cod_categoria === categoria
  );

  // Limitar a un máximo de 4 productos
  const productosLimitados = productosRecomendados.slice(0, 4);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Productos Recomendados</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productosLimitados.map((producto) => (
          <ProductCard key={producto.cod_producto} product={producto} allProducts={productosRecomendados} />
        ))}
      </div>
    </div>
  );
};

export default ProductRecomendado;