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
-- LIBROS
INSERT INTO libros (titulo, precio, disponible, autor_id, editorial_id, genero_id) VALUES
('Cien Años de Soledad', 1500.00, true, 1, 1, 1),
('La Casa de los Espíritus', 1450.00, true, 2, 2, 1),
('Ficciones', 1300.00, true, 3, 3, 8),
('Conversación en La Catedral', 1400.00, true, 4, 4, 6),
('Rayuela', 1350.00, false, 5, 5, 6),
('Como Agua para Chocolate', 1200.00, true, 6, 6, 1),
('La Sombra del Viento', 1250.00, true, 7, 7, 6),
('Veinte Poemas de Amor', 900.00, true, 8, 8, 4),
('Don Quijote de la Mancha', 1700.00, true, 9, 9, 3),
('Bodas de Sangre', 950.00, false, 10, 10, 5),
('El Otoño del Patriarca', 1100.00, true, 1, 2, 1),
('De Amor y de Sombra', 1080.00, true, 2, 3, 1),
('El Aleph', 980.00, true, 3, 4, 8),
('La Guerra del Fin del Mundo', 1200.00, true, 4, 5, 2),
('Final del Juego', 990.00, true, 5, 6, 8),
('Tan Veloz Como el Deseo', 1050.00, true, 6, 7, 1),
('El Juego del Ángel', 1150.00, false, 7, 8, 6),
('Cien Sonetos de Amor', 870.00, true, 8, 9, 4),
('Novelas Ejemplares', 940.00, true, 9, 10, 9),
('Yerma', 930.00, true, 10, 1, 5),
('El Coronel No Tiene Quien Le Escriba', 1100.00, true, 1, 3, 1),
('Paula', 1000.00, true, 2, 4, 10),
('El Informe de Brodie', 1020.00, false, 3, 5, 8),
('La Ciudad y los Perros', 1250.00, true, 4, 6, 2),
('Bestiario', 950.00, true, 5, 7, 8);

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

