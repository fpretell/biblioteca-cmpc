-- ============================
-- Tablas
-- ============================

CREATE TABLE autores (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

CREATE TABLE editoriales (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

CREATE TABLE generos (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

CREATE TABLE libros (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  precio DECIMAL(10,2) NOT NULL,
  imagen VARCHAR(255),
  disponible BOOLEAN NOT NULL DEFAULT TRUE,
  autor_id INTEGER NOT NULL REFERENCES autores(id) ON DELETE CASCADE,
  editorial_id INTEGER NOT NULL REFERENCES editoriales(id) ON DELETE CASCADE,
  genero_id INTEGER NOT NULL REFERENCES generos(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

CREATE TABLE inventario (
  id SERIAL PRIMARY KEY,
  libro_id INTEGER NOT NULL REFERENCES libros(id) ON DELETE CASCADE,
  cantidad INTEGER NOT NULL,
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE auditoria (
  id SERIAL PRIMARY KEY,
  entidad VARCHAR(50) NOT NULL,
  operacion VARCHAR(20) NOT NULL,
  registro_id INTEGER,
  datos_previos JSONB,
  datos_nuevos JSONB,
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  nombre VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS test (
  id SERIAL PRIMARY KEY,
  nombre TEXT NOT NULL
);

-- ============================
-- Índices
-- ============================

CREATE INDEX idx_libros_titulo ON libros(titulo);
CREATE INDEX idx_libros_precio ON libros(precio);
CREATE INDEX idx_libros_disponible ON libros(disponible);
CREATE INDEX idx_libros_autor_id ON libros(autor_id);
CREATE INDEX idx_libros_editorial_id ON libros(editorial_id);
CREATE INDEX idx_libros_genero_id ON libros(genero_id);
CREATE INDEX idx_inventario_libro_id ON inventario(libro_id);
CREATE UNIQUE INDEX idx_usuarios_email ON usuarios(email);


-- ============================
-- Datos de ejemplo
-- ============================

-- AUTORES
INSERT INTO autores (nombre) VALUES
('Gabriel García Márquez'),
('Isabel Allende'),
('Jorge Luis Borges'),
('Mario Vargas Llosa'),
('Julio Cortázar'),
('Laura Esquivel'),
('Carlos Ruiz Zafón'),
('Pablo Neruda'),
('Miguel de Cervantes'),
('Federico García Lorca');

-- EDITORIALES
INSERT INTO editoriales (nombre) VALUES
('Editorial Planeta'),
('Penguin Random House'),
('HarperCollins'),
('Editorial Anagrama'),
('Alfaguara'),
('Grupo SM'),
('Debolsillo'),
('Editorial Norma'),
('Ediciones B'),
('Santillana');

-- GENEROS
INSERT INTO generos (nombre) VALUES
('Realismo Mágico'),
('Novela Histórica'),
('Ficción Científica'),
('Poesía'),
('Teatro'),
('Narrativa'),
('Ensayo'),
('Cuento'),
('Literatura Infantil'),
('Biografía');

-- Libros (IDs del 11 al 35)
INSERT INTO libros (titulo, precio, disponible, autor_id, editorial_id, genero_id) VALUES
('El Aleph', 950.00, true, 3, 3, 8),
('Los Detectives Salvajes', 1250.00, true, 11, 11, 6),
('Pedro Páramo', 1000.00, true, 12, 12, 1),
('La Tregua', 850.00, true, 13, 13, 1),
('Pantaleón y las Visitadoras', 1150.00, false, 4, 4, 2),
('El Amor en los Tiempos del Cólera', 1400.00, true, 1, 1, 1),
('Crónica de una Muerte Anunciada', 1000.00, true, 1, 1, 1),
('El Túnel', 900.00, true, 14, 14, 6),
('Sobre Héroes y Tumbas', 1100.00, true, 14, 14, 6),
('La Fiesta del Chivo', 1500.00, true, 4, 4, 2),
('El Llano en Llamas', 950.00, true, 12, 12, 1),
('El Entenado', 980.00, true, 15, 15, 8),
('Zama', 990.00, true, 16, 16, 6),
('El Beso de la Mujer Araña', 1050.00, false, 17, 17, 7),
('Ensayo sobre la Ceguera', 1300.00, true, 18, 18, 9),
('El Evangelio Según Jesucristo', 1350.00, true, 18, 18, 9),
('La Muerte de Artemio Cruz', 1250.00, true, 19, 19, 1),
('Aura', 870.00, true, 19, 19, 1),
('Santa Evita', 1150.00, true, 20, 20, 7),
('El Secreto de sus Ojos', 1080.00, false, 21, 21, 7),
('Los Siete Locos', 940.00, true, 22, 22, 6),
('La Invención de Morel', 890.00, true, 23, 23, 8),
('El Reino de este Mundo', 910.00, true, 24, 24, 9),
('La Palabra del Mudo', 930.00, true, 25, 25, 4),
('Travesuras de la Niña Mala', 1200.00, true, 4, 4, 2);

-- Inventario (libro_id del 11 al 35)
INSERT INTO inventario (libro_id, cantidad, fecha) VALUES
(11, 13, NOW() - INTERVAL '11 days'),
(12, 20, NOW() - INTERVAL '10 days'),
(13, 10, NOW() - INTERVAL '9 days'),
(14, 16, NOW() - INTERVAL '8 days'),
(15, 8,  NOW() - INTERVAL '7 days'),
(16, 17, NOW() - INTERVAL '6 days'),
(17, 14, NOW() - INTERVAL '5 days'),
(18, 12, NOW() - INTERVAL '4 days'),
(19, 19, NOW() - INTERVAL '3 days'),
(20, 11, NOW() - INTERVAL '2 days'),
(21, 15, NOW() - INTERVAL '1 day'),
(22, 6,  NOW()),
(23, 9,  NOW()),
(24, 5,  NOW()),
(25, 7,  NOW()),
(26, 18, NOW()),
(27, 3,  NOW()),
(28, 14, NOW()),
(29, 8,  NOW()),
(30, 20, NOW()),
(31, 12, NOW()),
(32, 10, NOW()),
(33, 15, NOW()),
(34, 9,  NOW()),
(35, 13, NOW());

INSERT INTO usuarios (email, password, nombre)
VALUES (
  'admin@example.com',
  '$2b$10$.pPALROharBoTAjldiSh/efR9YzcTj.BNXsllIwKfsW9tB1.ST4we',
  'Admin'
);

