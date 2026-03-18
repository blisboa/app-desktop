INSERT INTO menu (id_menu, nombre) VALUES ('ADMROL', 'Administrar Rol');
INSERT INTO menu (id_menu, nombre) VALUES ('ADMMNU', 'Administrar Rol menu');
INSERT INTO menu (id_menu, nombre) VALUES ('ADMUSR', 'Administrar Usuario');
INSERT INTO menu (id_menu, nombre) VALUES ('ADMFND', 'Administrar Fondo');
INSERT INTO menu (id_menu, nombre) VALUES ('ADMINS', 'Administrar Instrumento');
INSERT INTO menu (id_menu, nombre) VALUES ('ADMEMI', 'Administrar Emisor');
INSERT INTO menu (id_menu, nombre) VALUES ('ADMNEM', 'Administrar Nemotecnico');
INSERT INTO menu (id_menu, nombre) VALUES ('INGCPA', 'Ingresar Compra');
INSERT INTO menu (id_menu, nombre) VALUES ('INGVTA', 'Ingresar Venta');
INSERT INTO menu (id_menu, nombre) VALUES ('CONOPE', 'Consultar Operaciones');
INSERT INTO menu (id_menu, nombre) VALUES ('INGPME', 'Cargar Precios de Mercado');
INSERT INTO menu (id_menu, nombre) VALUES ('PROVAL', 'Valorizar Carteras');
INSERT INTO menu (id_menu, nombre) VALUES ('CONCAR', 'Consultar Carteras');




-- Text to SQL original prompt:
-- inser rol
INSERT INTO rol (id_rol, nombre) VALUES ('ADMIN', 'Administrador');
INSERT INTO rol (id_rol, nombre) VALUES ('BACK', 'Backoffice');
INSERT INTO rol (id_rol, nombre) VALUES ('TRADER', 'Trader');


--select *  from rol

-- Text to SQL original prompt:
-- inser rol_menu
INSERT INTO rol_menu (id_rol, id_menu) VALUES ('ADMIN', 'ADMROL');
INSERT INTO rol_menu (id_rol, id_menu) VALUES ('ADMIN', 'ADMMNU');
INSERT INTO rol_menu (id_rol, id_menu) VALUES ('ADMIN', 'ADMUSR');
INSERT INTO rol_menu (id_rol, id_menu) VALUES ('ADMIN', 'ADMFND');
INSERT INTO rol_menu (id_rol, id_menu) VALUES ('ADMIN', 'ADMINS');
INSERT INTO rol_menu (id_rol, id_menu) VALUES ('ADMIN', 'ADMEMI');


INSERT INTO rol_menu (id_rol, id_menu) VALUES ('BACK', 'ADMFND');
INSERT INTO rol_menu (id_rol, id_menu) VALUES ('BACK', 'ADMINS');


INSERT INTO rol_menu (id_rol, id_menu) VALUES ('TRADER', 'INGCPA');
INSERT INTO rol_menu (id_rol, id_menu) VALUES ('TRADER', 'INGVTA');
INSERT INTO rol_menu (id_rol, id_menu) VALUES ('TRADER', 'CONOPE');


--select *  from rol_menu

INSERT INTO usuario (id_usuario, clave, nombre, apellido1, apellido2, email, estado) VALUES ('JFLORES', '1234', 'Juan', 'Flores', 'Gonzalez','jfloresg@empresa.cl', 'V');
INSERT INTO usuario (id_usuario, clave, nombre, apellido1, apellido2, email, estado) VALUES ('PSANHUEZA', '1234', 'Pedro', 'Sanhueza', 'Del Rio','psanhueza@empresa.cl', 'V');
INSERT INTO usuario (id_usuario, clave, nombre, apellido1, apellido2, email, estado) VALUES ('JBRAVO', '1234', 'Julieta', 'Bravo', 'Flores','jbravo@empresa.cl', 'V');
--select *  from usuario


-- Text to SQL original prompt:
-- inser usuario_rol
INSERT INTO usuario_rol (id_usuario, id_rol) VALUES ('JFLORES', 'ADMIN');
INSERT INTO usuario_rol (id_usuario, id_rol) VALUES ('PSANHUEZA', 'TRADER');
INSERT INTO usuario_rol (id_usuario, id_rol) VALUES ('JBRAVO', 'BACK');

--select *  from usuario_rol

-- Text to SQL original prompt:
-- insert intrumento
INSERT INTO instrumento (id_instrumento, nombre, tipo_mercado) VALUES ('ACC', 'Acciones', 'V');
INSERT INTO instrumento (id_instrumento, nombre, tipo_mercado) VALUES ('BON', 'Bonos', 'F');
INSERT INTO instrumento (id_instrumento, nombre, tipo_mercado) VALUES ('DP', 'Deposito a Plazo', 'F');
INSERT INTO instrumento (id_instrumento, nombre, tipo_mercado) VALUES ('CFM', 'Cuotas de Fondos Mutuos', 'V');



-- Text to SQL original prompt:
-- insert emisor
INSERT INTO emisor (id_emisor, razon_social, nombre) VALUES ('AFGSEC', 'ADMINISTRADORA GENERAL DE FONDOS SECURITY S.A.', 'AGF Security');
INSERT INTO emisor (id_emisor, razon_social, nombre) VALUES ('AFGSURA', 'ADMINISTRADORA GENERAL DE FONDOS SURA S.A.', 'AGF SURA');
INSERT INTO emisor (id_emisor, razon_social, nombre) VALUES ('BCOBCI', 'BANCO DE CREDITO E INVERSIONES', 'BCI');
INSERT INTO emisor (id_emisor, razon_social, nombre) VALUES ('BCOCHI', 'BANCO DE CHILE', 'CHILE');
INSERT INTO emisor (id_emisor, razon_social, nombre) VALUES ('EMPCOL', 'COLBUN S.A.', 'COLBUN');
INSERT INTO emisor (id_emisor, razon_social, nombre) VALUES ('EMPCOP', 'COPEC S.A.', 'COPEC');





-- Text to SQL original prompt:
-- insert nemotecnico
INSERT INTO nemotecnico (id_nemotecnico, id_instrumento, id_emisor, fecha_emision, fecha_vencimiento) VALUES ('CHILE', 'ACC',  'BCOCHI', '20000101',null);
INSERT INTO nemotecnico (id_nemotecnico, id_instrumento, id_emisor, fecha_emision, fecha_vencimiento) VALUES ('BCI', 'ACC',  'BCOBCI', '20000101',null);
INSERT INTO nemotecnico (id_nemotecnico, id_instrumento, id_emisor, fecha_emision, fecha_vencimiento) VALUES ('COPEC', 'ACC',  'EMPCOP', '20000101',null);
INSERT INTO nemotecnico (id_nemotecnico, id_instrumento, id_emisor, fecha_emision, fecha_vencimiento) VALUES ('COLBUN', 'ACC',  'EMPCOL', '20000101',null);


INSERT INTO nemotecnico (id_nemotecnico, id_instrumento, id_emisor, fecha_emision, fecha_vencimiento) VALUES ('CFMSURAEUFCL', 'CFM',  'AFGSURA', '20220106',null);
INSERT INTO nemotecnico (id_nemotecnico, id_instrumento, id_emisor, fecha_emision, fecha_vencimiento) VALUES ('CFMSURAMICACL', 'CFM',  'AFGSURA', '20090120',null);

INSERT INTO nemotecnico (id_nemotecnico, id_instrumento, id_emisor, fecha_emision, fecha_vencimiento) VALUES ('CFMSECESTCLP', 'CFM',  'AFGSEC', '20220929',null);
INSERT INTO nemotecnico (id_nemotecnico, id_instrumento, id_emisor, fecha_emision, fecha_vencimiento) VALUES ('CFMSECGOLD', 'CFM',  'AFGSEC', '19980310',null);

INSERT INTO nemotecnico (id_nemotecnico, id_instrumento, id_emisor, fecha_emision, fecha_vencimiento) VALUES ('BCHIGX0124', 'BON',  'BCOCHI', '20240405','20310701');

--select *  from nemotecnico
INSERT INTO fondo (id_fondo, nombre, vigente) VALUES ('F1', 'FONDO MUTUO 1', 'N');
INSERT INTO fondo (id_fondo, nombre, vigente) VALUES ('F2', 'FONDO MUTUO 2', 'V');
INSERT INTO fondo (id_fondo, nombre, vigente) VALUES ('F3', 'FONDO MUTUO 3', 'V');
INSERT INTO fondo (id_fondo, nombre, vigente) VALUES ('F4', 'FONDO MUTUO 4', 'V');
INSERT INTO fondo (id_fondo, nombre, vigente) VALUES ('F5', 'FONDO MUTUO 5', 'B');






