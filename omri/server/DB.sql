CREATE DATABASE webomri

CREATE TABLE Categorias(
    cod_categoria VARCHAR(100),
    descripcion VARCHAR(100),
    PRIMARY KEY(cod_categoria)
    
);

CREATE TABLE Marcas(
    cod_marca VARCHAR(100),
    descripcion VARCHAR(100),
    PRIMARY KEY(cod_marca)
    
);

CREATE TABLE Productos(
    cod_producto VARCHAR(100),
    cod_categoria VARCHAR(100),
    cod_marca VARCHAR(100),
    descripcion VARCHAR(100),
    caracteristicas VARCHAR(500),
    precio DECIMAL(18,2),
    cantidad INT,
    estatus VARCHAR(100),
    FOREIGN KEY (cod_categoria) REFERENCES Categorias(cod_categoria),
    FOREIGN KEY (cod_marca) REFERENCES Marcas(cod_marca),
    PRIMARY KEY(cod_producto)
);