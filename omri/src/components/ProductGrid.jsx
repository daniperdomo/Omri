import React from "react";
import ProductCard from "../components/ProductCard";

const ProductGrid = ({ productos }) => {
  // Agrupar productos por modelo
  const productosPorModelo = productos.reduce((acc, product) => {
    const key = `${product.cod_categoria}-${product.modelo}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(product);
    return acc;
  }, {});

  return (
    <div>
      {/* Grid de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Object.keys(productosPorModelo).map((key) => {
          const productosDelModelo = productosPorModelo[key];
          const primerProducto = productosDelModelo[0];
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
  );
};

export default ProductGrid;