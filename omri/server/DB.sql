CREATE DATABASE webomri
--eldanperrr estuvo aqui gafo brrr bebesitaaa
CREATE TABLE Categorias(
    cod_categoria VARCHAR,
    PRIMARY KEY(cod_categoria)
    descripcion VARCHAR,
    
);

CREATE TABLE Marcas(
    cod_marca VARCHAR,
    PRIMARY KEY(cod_marca)
    descripcion VARCHAR,
    
);

CREATE TABLE Productos(
    cod_producto VARCHAR,
    cod_categoria VARCHAR,
    cod_marca VARCHAR,
    descripcion VARCHAR,
    caracteristicas VARCHAR,
    precio DECIMAL(18,2),
    cantidad INT,
    estatus VARCHAR,
    color VARCHAR,
    FOREIGN KEY (cod_categoria) REFERENCES Categorias(cod_categoria),
    FOREIGN KEY (cod_marca) REFERENCES Marcas(cod_marca),
    PRIMARY KEY(cod_producto, color)
);