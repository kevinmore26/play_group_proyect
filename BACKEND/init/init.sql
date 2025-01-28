CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    imagen VARCHAR(255)
);

-- Productos tecnologicos
INSERT INTO productos (nombre, descripcion, imagen) 
VALUES 
('Smartphone X100', 'Un smartphone con pantalla AMOLED y 128GB de almacenamiento.', 'https://m.media-amazon.com/images/I/61jB2NIpm5L.jpg'),
('Laptop Ultra 15', 'Laptop ultradelgada con procesador Intel i7 y 16GB de RAM.', 'https://hiraoka.com.pe/media/catalog/product/1/3/134580_0.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=560&width=700&canvas=700:560'),
('Auriculares Pro', 'Auriculares inalambricos con cancelacion de ruido activa.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEsoYsEmr0iot3Gnf-tohBVKgQBg2zNKry4g&s'),

-- Productos de cocina
('Cafetera Express', 'Cafetera automatica con opciones para espresso y capuchino.', 'https://osterpe.vtexassets.com/arquivos/ids/159745-800-auto?v=638506072369070000&width=800&height=auto&aspect=true'),
('Batidora Suprema', 'Batidora de mano con 5 velocidades y accesorios incluidos.', 'https://cdn.shopify.com/s/files/1/0500/5121/9607/files/hfed4egw1p1.jpg?v=1723239635'),
('Horno Electrico 35L', 'Horno compacto con temporizador y ajustes de temperatura.', 'https://home.ripley.com.pe/Attachment/WOP_5/2019122187108/2019122187108_2.jpg'),

-- Productos de deporte
('Bicicleta Mountain', 'Bicicleta todoterreno con suspension delantera y 21 velocidades.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw5r-wR8DOV0ULohifkDE4IX104hlBGrKUhg&s'),
('Pesas Ajustables', 'Set de pesas ajustables ideales para entrenamientos en casa.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_Fq6-KiQyhWcJ8P9ddIptuJddjaeaAjR_cQ&s'),
('Colchoneta Yoga', 'Colchoneta antideslizante para yoga y pilates.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgO9r9HlDeq5os_IK9wtCFRAIwFIYFf-w8kw&s'),

-- Productos para el hogar
('Lampara de Escritorio LED', 'Lampara con luz regulable y cargador inalambrico integrado.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9eJc0R5rJGlvCSnE4a3F-zNFlO6CbsScqMQ&s'),
('Aspiradora Robot 3000', 'Robot aspirador con sensor de obstaculos y control remoto.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy3Y-sAD29SPbzVKTk1_hhNlItrStm2bOKDw&s');
