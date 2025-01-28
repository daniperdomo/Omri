import React from 'react';
import Cards from '../components/Admin/Cards'
import { Link } from 'react-router-dom';


const AdminHome = () => {
    const options = [
        { id: 1, title: 'Create Producto', link: '/admin/createProducto' },
        { id: 2, title: 'Update Producto',  link: '/admin/updateProducto' },
        { id: 3, title: 'Delete Producto', link: '/admin/deleteProducto' },
        { id: 4, title: 'Create Marca',  link: '/admin/createMarca' },
        { id: 5, title: 'Update Marca', link: '/admin/updateMarca' },
        { id: 6, title: 'Delete Marca', link: '/admin/deleteMarca' },
        { id: 7, title: 'Create Categoria', link: '/admin/createCategoria' },
        { id: 8, title: 'Update Categoria', link: '/admin/updateCategoria' },
        { id: 9, title: 'Delete Categoria', link: '/admin/deleteCategoria' },

    ];

    //MODIFICAR EL RETURN PARA QUE HAGA LO DE LAS TARJETAS PARA LAS OPCIONES
    return (
        <>
            <Cards />
            <div>
                <div>
                    {options.map(option => (
                        <div key={option.id}>
                            <h2>{option.title}</h2>
                            <Link to={option.link}>
                                <button>
                                    Seleccionar
                                </button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default AdminHome;