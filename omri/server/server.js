const express = require("express")
const path = require("path")
const app = express()
const cors = require("cors")
const port = 8081
const multer = require('multer')
const fs = require('node:fs')

const upload = multer()

const sql = require("mssql/msnodesqlv8")
const config = {
    server: "DESKTOP-409OAJ1\\MSSQLSERVER14",
    database: "webomri2",
    driver: "msnodesqlv8",
    options: {
        trustedConnection: true
    }
}

sql.connect(config, function(error) {
    if (error) {
        console.log("Error connecting to the database:", error)
    } else {
        console.log('DB connected')
    }
})

const corsOptions = {
    origin: ["http://localhost:5173"],
}

app.use(cors(corsOptions))
app.use(express.json())

app.post('/api/marca', (req, res) => {
    const { cod_marca, descripcion } = req.body

    const request = new sql.Request()
    request.input('cod_marca', sql.VarChar, cod_marca)
    request.input('descripcion', sql.VarChar, descripcion)
    request.query('insert into Marcas (cod_marca, descripcion) values (@cod_marca, @descripcion)', (error) => {
        if (error) {
            console.log('Error registrando Marca: ', error)
            return res.status(500).send('Error registrando Marca')
        }
        res.status(201).send('Marca registrada con exito')
    })

}) 

app.post('/api/categoria', (req, res) => {
    const { cod_categoria, descripcion, modelo } = req.body

    const request = new sql.Request()
    request.input('cod_categoria', sql.VarChar, cod_categoria)
    request.input('descripcion', sql.VarChar, descripcion)
    request.input('modelo', sql.VarChar, modelo)
    request.query('insert into Categorias (cod_categoria, descripcion, modelo) values (@cod_categoria, @descripcion, @modelo)', (error) => {
        if (error) {
            console.log('Error registrando Categoria: ', error)
            return res.status(500).send('Error registrando Categoria')
        }
        res.status(201).send('Categoria registrada con exito')
    })

})

app.post('/api/producto', (req, res) => {
    const { cod_producto, cod_categoria, modelo, cod_marca, descripcion, caracteristicas, precio, cantidad, estatus } = req.body
    const request = new sql.Request()
    request.input('cod_producto', sql.VarChar, cod_producto)
    request.input('cod_categoria', sql.VarChar, cod_categoria)
    request.input('modelo', sql.VarChar, modelo)
    request.input('cod_marca', sql.VarChar, cod_marca)
    request.input('descripcion', sql.VarChar, descripcion)
    request.input('caracteristicas', sql.VarChar, caracteristicas)
    request.input('precio', sql.Decimal(18, 2), precio)
    request.input('cantidad', sql.Int, cantidad)
    request.input('estatus', sql.Int, estatus)
    
    request.query('insert into Productos (cod_producto, cod_categoria, modelo, cod_marca, descripcion, caracteristicas, precio, cantidad, estatus) values (@cod_producto, @cod_categoria, @modelo, @cod_marca, @descripcion, @caracteristicas, @precio, @cantidad, @estatus)', (error) => {
        if (error) {
            console.log('Error registrando Producto: ', error)
            return res.status(500).send('Error registrando Producto')
        }
        res.status(201).send('Producto registrado con exito')
    })
}) 

app.get('/api/productos', (req, res) => {
    const request = new sql.Request();
    const query = `
        SELECT 
            P.cod_producto,
            P.cod_categoria,
            P.modelo,
            P.cod_marca,
            P.descripcion,
            P.caracteristicas,
            P.precio,
            P.cantidad,
            P.estatus,
            P.color,  
            I.url AS imagen_url  
        FROM Productos P
        LEFT JOIN Imagenes I ON P.cod_producto = I.cod_producto
    `;

    request.query(query, (error, result) => {
        if (error) {
            console.log('Error obteniendo productos:', error);
            return res.status(500).send('Error obteniendo productos');
        }

        // Organizar los datos para que cada producto tenga un array de imágenes
        const productos = result.recordset.reduce((acc, row) => {
            const productoExistente = acc.find(p => p.cod_producto === row.cod_producto);
            if (productoExistente) {
                // Agregar la imagen al array de imágenes del producto existente
                if (row.imagen_url) {
                    productoExistente.imagenes.push({
                        url: row.imagen_url
                    });
                }
            } else {
                // Crear un nuevo producto con su color y array de imágenes
                acc.push({
                    cod_producto: row.cod_producto,
                    cod_categoria: row.cod_categoria,
                    modelo: row.modelo,
                    cod_marca: row.cod_marca,
                    descripcion: row.descripcion,
                    caracteristicas: row.caracteristicas,
                    precio: row.precio,
                    cantidad: row.cantidad,
                    estatus: row.estatus,
                    color: row.color,  // El color ahora viene de Productos
                    imagenes: row.imagen_url ? [{ url: row.imagen_url }] : []
                });
            }
            return acc;
        }, []);

        res.status(200).json(productos);
    });
});


app.get('/api/marca', (req, res) => {
    const request = new sql.Request()
    request.query('select * from Marcas', (error, result) => {
        if (error) {
            console.log("Error leyendo Marcas:", error)
            return res.status(500).send('Error leyendo Marcas')
        }
        res.json(result.recordset)
    })
})

app.get('/api/categoria', (req, res) => {
    const request = new sql.Request()
    request.query('select * from Categorias', (error, result) => {
        if (error) {
            console.log("Error leyendo Categorias:", error)
            return res.status(500).send('Error leyendo Categorias')
        }
        res.json(result.recordset)
    })
})

app.get('/api/producto', (req, res) => {
    const request = new sql.Request()
    request.query('select * from Productos', (error, result) => {
        if (error) {
            console.log("Error leyendo Productos:", error)
            return res.status(500).send('Error leyendo Productos')
        }
        res.json(result.recordset)
    })
})

app.post('/api/deleteCategoria', (req, res) => {
    const { cod_categoria, modelo } = req.body

    const request = new sql.Request()
    request.input('cod_categoria', sql.VarChar, cod_categoria)
    request.input('modelo', sql.VarChar, modelo)
    request.query('Delete from Categorias where cod_categoria = @cod_categoria and modelo = @modelo', (error) => {
        if (error) {
            console.log('Error borrando Categoria: ', error)
            return res.status(500).send('Error  borrando Categoria')
        }
        res.status(201).send('Categoria borrada con exito')
    })

}) 

app.post('/api/deleteMarca', (req, res) => {
    const { cod_marca } = req.body

    const request = new sql.Request()
    request.input('cod_marca', sql.VarChar, cod_marca)
    request.query('Delete from Marcas where cod_marca = @cod_marca', (error) => {
        if (error) {
            console.log('Error borrando Marca: ', error)
            return res.status(500).send('Error  borrando Marca')
        }
        res.status(201).send('Marca borrada con exito')
    })

}) 

app.post('/api/deleteProducto', (req, res) => {
    const { cod_producto } = req.body

    const request = new sql.Request()
    request.input('cod_producto', sql.VarChar, cod_producto)
    request.query('Delete from Productos where cod_producto = @cod_producto', (error) => {
        if (error) {
            console.log('Error borrando Producto: ', error)
            return res.status(500).send('Error  borrando Producto')
        }
        res.status(201).send('Producto borrado con exito')
    })

})

app.get('/api/producto/:cod_producto', (req, res) => {
    const { cod_producto } = req.params 
    const request = new sql.Request()

    request.input('cod_producto', sql.VarChar, cod_producto)

    request.query('select * from Productos where cod_producto = @cod_producto', (error, result) => {
        if (error) {
            console.log("Error leyendo Productos:", error)
            return res.status(500).send('Error leyendo Productos')
        }
        res.json(result.recordset)
    })
})

app.put('/api/producto', (req, res) => { 
    const { cod_producto_original, cod_producto_nuevo, cod_categoria, modelo, cod_marca, descripcion, caracteristicas, precio, cantidad, estatus } = req.body

    const request = new sql.Request()
    request.input('cod_producto_original', sql.VarChar, cod_producto_original)
    request.input('cod_producto_nuevo', sql.VarChar, cod_producto_nuevo)
    request.input('cod_categoria', sql.VarChar, cod_categoria)
    request.input('modelo', sql.VarChar, modelo)
    request.input('cod_marca', sql.VarChar, cod_marca)
    request.input('descripcion', sql.VarChar, descripcion)
    request.input('caracteristicas', sql.VarChar, caracteristicas)
    request.input('precio', sql.Decimal(18, 2), precio)
    request.input('cantidad', sql.Int, cantidad)
    request.input('estatus', sql.Int, estatus)
    
    request.query('update Productos set cod_producto = @cod_producto_nuevo, cod_categoria = @cod_categoria, modelo = @modelo, cod_marca = @cod_marca, descripcion = @descripcion, caracteristicas = @caracteristicas, precio = @precio, cantidad = @cantidad, estatus = @estatus where cod_producto = @cod_producto_original', (error) => {
        if (error) {
            console.log('Error actualizando Producto: ', error)
            return res.status(500).send('Error actualizando Producto')
        }
        res.status(200).send('Producto actualizado con éxito')
    })
})

app.get('/api/marca/:cod_marca', (req, res) => {
    const { cod_marca } = req.params 
    const request = new sql.Request()

    request.input('cod_marca', sql.VarChar, cod_marca)

    request.query('select * from Marcas where cod_marca = @cod_marca', (error, result) => {
        if (error) {
            console.log("Error leyendo Marcas:", error)
            return res.status(500).send('Error leyendo Marcas')
        }
        res.json(result.recordset)
    })
})

app.put('/api/marca', (req, res) => {
    const { cod_marca_original, cod_marca_nuevo, descripcion } = req.body


    const request = new sql.Request()
    request.input('cod_marca_original', sql.VarChar, cod_marca_original) 
    request.input('cod_marca_nuevo', sql.VarChar, cod_marca_nuevo) 
    request.input('descripcion', sql.VarChar, descripcion) 

    request.query('update Marcas set cod_marca = @cod_marca_nuevo, descripcion = @descripcion where cod_marca = @cod_marca_original', (error) => {
        if (error) {
            console.log('Error actualizando Marca: ', error)
            return res.status(500).send('Error actualizando Marca')
        }
        res.status(200).send('Marca actualizada con éxito')
    })
})

app.get('/api/categoria/:cod_categoria/:modelo', (req, res) => {
    const { cod_categoria, modelo } = req.params 
    const request = new sql.Request()

    request.input('cod_categoria', sql.VarChar, cod_categoria)
    request.input('modelo', sql.VarChar, modelo)

    request.query('select * from Categorias where cod_categoria = @cod_categoria and modelo = @modelo', (error, result) => {
        if (error) {
            console.log("Error leyendo Categorias:", error)
            return res.status(500).send('Error leyendo Categorias')
        }
        res.json(result.recordset)
    })
})

app.put('/api/categoria', (req, res) => {
    const { cod_categoria, modelo, cod_categoria_original, modelo_original, descripcion } = req.body

    const request = new sql.Request()
    request.input('cod_categoria', sql.VarChar, cod_categoria)
    request.input('modelo', sql.VarChar, modelo)
    request.input('cod_categoria_original', sql.VarChar, cod_categoria_original)
    request.input('modelo_original', sql.VarChar, modelo_original)
    request.input('descripcion', sql.VarChar, descripcion)

    // Actualiza la categoría en la base de datos
    request.query('UPDATE Categorias SET cod_categoria = @cod_categoria, modelo = @modelo, descripcion = @descripcion WHERE cod_categoria = @cod_categoria_original AND modelo = @modelo_original', (error) => {
        if (error) {
            console.log('Error actualizando Categoría: ', error)
            return res.status(500).send('Error actualizando Categoría')
        }
        res.status(200).send('Categoría actualizada con éxito')
    })
})

app.use(express.static(path.join(__dirname, 'client/build')))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
})

app.listen(port, () => {
    console.log("Server started on port", port)
})