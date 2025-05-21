CREATE DATABASE maidas;

-- Tabla Clientes
CREATE TABLE Clientes (
    id_cliente SERIAL PRIMARY KEY,
    nombre_1 VARCHAR(100) NOT NULL,
    nombre_2 VARCHAR(100),
    apellido_1 VARCHAR(100) NOT NULL,
    apellido_2 VARCHAR(100),
    tipo VARCHAR(50) NOT NULL CHECK (tipo IN ('Estudiante', 'Profesor')),
    saldo NUMERIC(10, 2) NOT NULL DEFAULT 0 -- Nuevo campo agregado
); 

-- Tabla Productos
CREATE TABLE Productos (
    id_producto SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio NUMERIC(10, 2) NOT NULL CHECK (precio >= 0),
    tipo VARCHAR(50) NOT NULL CHECK (tipo IN ('Diario', 'Semanal')), 
    proveedor VARCHAR(100), -- Solo aplica para productos semanales
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    cantidad INT NOT NULL CHECK (cantidad >= 0) -- Nuevo campo agregado
);

-- Tabla Ventas
CREATE TABLE Ventas (
    id_venta SERIAL PRIMARY KEY,
    id_cliente INT NOT NULL,
    fecha_venta DATE NOT NULL,
    monto_total NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (monto_total >= 0),
    tipo_pago VARCHAR(50) NOT NULL CHECK (tipo_pago IN ('Efectivo', 'Crédito')),
    FOREIGN KEY (id_cliente) REFERENCES Clientes(id_cliente)
);

-- Tabla Detalle_Ventas
CREATE TABLE Detalle_Ventas (
    id_detalle_venta SERIAL PRIMARY KEY,
    id_venta INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT NOT NULL CHECK (cantidad > 0),
    precio_unitario NUMERIC(10, 2) NOT NULL CHECK (precio_unitario >= 0),
    FOREIGN KEY (id_venta) REFERENCES Ventas(id_venta),
    FOREIGN KEY (id_producto) REFERENCES Productos(id_producto)
);

-- Tabla Créditos
CREATE TABLE Creditos (
    id_credito SERIAL PRIMARY KEY,
    id_cliente INT NOT NULL,
    id_venta INT UNIQUE,
    monto NUMERIC(10, 2) NOT NULL CHECK (monto >= 0),
    fecha_solicitud DATE NOT NULL,
    fecha_vencimiento DATE NOT NULL,
    estado VARCHAR(50) NOT NULL CHECK (estado IN ('Activo', 'Pagado', 'Vencido')),
    FOREIGN KEY (id_cliente) REFERENCES Clientes(id_cliente),
    FOREIGN KEY (id_venta) REFERENCES Ventas(id_venta) ON DELETE SET NULL
);


