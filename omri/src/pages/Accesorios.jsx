import React, { useState, useEffect } from "react"
import categoriasAccesorios from "../jsons/categoriasAccesorios.json"
import ProductGrid from "../components/ProductGrid"
import PantallaCarga from "../components/PantallaCarga" // Importa el componente PantallaCarga

const Accesorios = () => {
  const [productos, setProductos] = useState([])
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("")
  const [marcaSeleccionada, setMarcaSeleccionada] = useState("")
  const [precioMin, setPrecioMin] = useState("")
  const [precioMax, setPrecioMax] = useState("")
  const [loading, setLoading] = useState(true)

  const fetchProductos = async () => {
    setLoading(true)
    try {
      const response = await fetch("http://localhost:8081/api/productos/accesorios")
      if (!response.ok) {
        throw new Error("Error en la respuesta del servidor")
      }
      const data = await response.json()
      setProductos(data)
      sessionStorage.setItem("productosAccesorios", JSON.stringify(data))
    } catch (error) {
      console.error("Error leyendo productos:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const productosGuardados = sessionStorage.getItem("productosAccesorrios")
    if (productosGuardados) {
      setProductos(JSON.parse(productosGuardados))
      setLoading(false)
    } else {
      fetchProductos()
    }
  }, [])

  const marcasUnicas = [...new Set(productos.map((producto) => producto.cod_marca))]

  const productosFiltrados = productos.filter((producto) => {
    const cumpleCategoria = !categoriaSeleccionada || producto.cod_categoria === categoriaSeleccionada
    const cumpleMarca = !marcaSeleccionada || producto.cod_marca === marcaSeleccionada
    const cumplePrecio =
      (!precioMin || producto.precio >= parseFloat(precioMin)) &&
      (!precioMax || producto.precio <= parseFloat(precioMax))
    return cumpleCategoria && cumpleMarca && cumplePrecio
  })

  // Ordenar productos filtrados por marca
  const productosOrdenados = productosFiltrados.sort((a, b) => {
    if (a.cod_marca < b.cod_marca) return -1
    if (a.cod_marca > b.cod_marca) return 1
    return 0
  })

  const handleCategoriaClick = (cod_categoria) => {
    setCategoriaSeleccionada((prev) => (prev === cod_categoria ? "" : cod_categoria))
  }

  return (
    <div className="py-8 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-900">Accesorios</h1>
        </header>

        <h2 className="text-2xl text-gray-700 mb-6 text-left">Categorías</h2>

        <div className="overflow-x-auto scrollbar-hide whitespace-nowrap mb-12 lg:overflow-x-visible lg:whitespace-normal">
          <div className="inline-flex space-x-4 lg:flex lg:flex-nowrap lg:space-x-4">
            {categoriasAccesorios.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoriaClick(category.cod_categoria)}
                className={`flex-none w-32 h-32 md:w-48 md:h-48 relative rounded-lg overflow-hidden shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                  categoriaSeleccionada === category.cod_categoria ? "ring-4 ring-color-hover" : ""
                }`}
              >
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-center">
                  <h3 className="text-sm md:text-lg font-bold text-white text-center">
                    {category.title}
                  </h3>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 mb-8">
          <h2 className="text-2xl text-gray-700">Filtrar por:</h2>

          <select
            value={categoriaSeleccionada}
            onChange={(e) => setCategoriaSeleccionada(e.target.value)}
            className="w-full md:w-32 h-10 bg-white border border-black rounded-lg shadow-md px-2"
          >
            <option value="">Categoría</option>
            {categoriasAccesorios.map((category) => (
              <option key={category.cod_categoria} value={category.cod_categoria}>
                {category.title}
              </option>
            ))}
          </select>

          <select
            value={marcaSeleccionada}
            onChange={(e) => setMarcaSeleccionada(e.target.value)}
            className="w-full md:w-32 h-10 bg-white border border-black rounded-lg shadow-md px-2"
          >
            <option value="">Marca</option>
            {marcasUnicas.map((marca) => (
              <option key={marca} value={marca}>
                {marca}
              </option>
            ))}
          </select>

          <div className="flex space-x-2">
            <input
              type="number"
              placeholder="$-Min"
              value={precioMin}
              onChange={(e) => setPrecioMin(e.target.value)}
              min="0"
              className="w-24 h-10 bg-white border border-black rounded-lg shadow-md px-2"
            />
            <input
              type="number"
              placeholder="$-Max"
              value={precioMax}
              onChange={(e) => setPrecioMax(e.target.value)}
              min="0"
              className="w-24 h-10 bg-white border border-black rounded-lg shadow-md px-2"
            />
          </div>
        </div>

        {loading ? (
          <PantallaCarga /> 
        ) : (
          <ProductGrid productos={productosOrdenados} />
        )}
      </div>
    </div>
  )
}

export default Accesorios