import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminHome = () => {
    const [selectedType, setSelectedType] = useState(null);

    const options = {
        producto: [
            { id: 1, title: 'Create Producto', link: '/admin/createProducto' },
            { id: 2, title: 'Update Producto', link: '/admin/updateProducto' },
            { id: 3, title: 'Delete Producto', link: '/admin/deleteProducto' },
        ],
        marca: [
            { id: 4, title: 'Create Marca', link: '/admin/createMarca' },
            { id: 5, title: 'Update Marca', link: '/admin/updateMarca' },
            { id: 6, title: 'Delete Marca', link: '/admin/deleteMarca' },
        ],
        categoria: [
            { id: 7, title: 'Create Categoria', link: '/admin/createCategoria' },
            { id: 8, title: 'Update Categoria', link: '/admin/updateCategoria' },
            { id: 9, title: 'Delete Categoria', link: '/admin/deleteCategoria' },
        ],
        imagen: [
            {id: 10, title: 'Update Imagen', link: '/admin/updateImagen'}
        ]
    };

    const handleCardClick = (type) => {
        setSelectedType(type);
    };

    return (
        <div className="p-4">
            <div className="flex space-x-4 mb-4">
                {Object.keys(options).map((type) => (
                    <div
                        key={type}
                        className="cursor-pointer p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                        onClick={() => handleCardClick(type)}
                    >
                        <h2 className="text-xl font-bold capitalize">{type}</h2>
                    </div>
                ))}
            </div>

            {selectedType && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {options[selectedType].map((option) => (
                        <div key={option.id} className="p-4 bg-white rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold">{option.title}</h3>
                            <Link to={option.link}>
                                <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                                    Seleccionar
                                </button>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminHome;