import React from 'react';
import { useParams } from 'react-router-dom';
import CreateMarca from '../components/Admin/marcas/CreateMarca';
import UpdateMarca from '../components/Admin/marcas/UpdateMarca';
import DeleteMarca from '../components/Admin/marcas/DeleteMarca';
import CreateCategoria from '../components/Admin/categorias/CreateCategoria';
import UpdateCategoria from '../components/Admin/categorias/UpdateCategoria';
import DeleteCategoria from '../components/Admin/categorias/DeleteCategoria';
import CreateProducto from '../components/Admin/productos/CreateProducto';
import UpdateProducto from '../components/Admin/productos/UpdateProducto';
import DeleteProducto from '../components/Admin/productos/DeleteProducto';


const AdminForm = () => {
    const { type } = useParams();
    const forms = [
        { type: 'createCategoria', comp: <CreateCategoria /> },
        { type: 'updateCategoria', comp: <UpdateCategoria /> },
        { type: 'deleteCategoria', comp: <DeleteCategoria /> },
        { type: 'createProducto', comp: <CreateProducto /> },
        { type: 'updateProducto', comp: <UpdateProducto /> },
        { type: 'deleteProducto', comp: <DeleteProducto /> },
        { type: 'createMarca', comp: <CreateMarca /> },
        { type: 'updateMarca', comp: <UpdateMarca /> },
        { type: 'deleteMarca', comp: <DeleteMarca /> },
    ];

    const formToRender = forms.find(form => form.type === type);


    return (
        <>
            {formToRender ? (
                <div>
                    {formToRender.comp}
                </div>
            ) : (
                <h1>Error</h1>
            )}
        </>
    );
};

export default AdminForm;