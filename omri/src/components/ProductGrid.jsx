import React from "react";
import ProductCard from "../components/ProductCard";

const ProductGrid = ({ productos }) => {
  // Función para determinar si la categoría es CARG o CABL
  const isSpecialCategory = (cod_categoria) => {
    return cod_categoria === "CARG" || cod_categoria === "CABL" || cod_categoria === "AUDIF";
  };

  // Agrupar productos por modelo, excepto para categorías CARG y CABL
  const productosAgrupados = productos.reduce((acc, product) => {
    if (isSpecialCategory(product.cod_categoria)) {
      // Para categorías especiales, crear una entrada por cod_producto
      const key = product.cod_producto;
      acc[key] = [product];
    } else {
      // Para otras categorías, agrupar por modelo
      const key = `${product.cod_categoria}-${product.modelo}`;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(product);
    }
    return acc;
  }, {});

  return (
    <div>
      {/* Grid de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Object.keys(productosAgrupados).map((key) => {
          const productosDelGrupo = productosAgrupados[key];
          const primerProducto = productosDelGrupo[0];
          return (
            <ProductCard
              key={key}
              product={primerProducto}
              allProducts={productosDelGrupo}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProductGrid;