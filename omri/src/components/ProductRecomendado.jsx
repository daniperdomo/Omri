import React from "react";
import ProductCard from "../components/ProductCard";

const ProductRecomendado = ({ productos, categoria, modeloSeleccionado, marca }) => {
  console.log('Categoria: ', categoria, 'Marca: ', marca)
  const productosRecomendados = productos.filter(
    (producto) => (producto.cod_categoria === categoria || producto.cod_marca === marca) && producto.modelo !== modeloSeleccionado
  );
  console.log('Recomendados', productosRecomendados)
  
  const modelosVistos = new Set();
  const productosLimitados = [];

  for (const producto of productosRecomendados) {
    const modelo = producto.modelo;
    
    if (!modelosVistos.has(modelo)) {
      modelosVistos.add(modelo);
      productosLimitados.push(producto);
    }
    
    if (productosLimitados.length >= 4) {
      break;
    }
  }
  console.log('Limitados', productosLimitados)

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Productos Recomendados</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productosLimitados.map((producto) => {
          const coloresDisponibles = productosRecomendados.filter(
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