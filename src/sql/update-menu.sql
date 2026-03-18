update menu set ruta = '/default.html';
update menu set ruta = '/instrumento.html' where id_menu ='ADMINS';
update menu set ruta = '/emisor.html' where id_menu ='ADMEMI';
update menu set ruta = '/operaciones.html' where id_menu ='CONOPE';
update menu set ruta = '/compra.html' where id_menu ='INGCPA';
update menu set ruta = '/precios.html' where id_menu ='INGPME';

delete from rol_menu where id_menu = 'INGPME';
INSERT INTO rol_menu (id_rol, id_menu) VALUES ('ADMIN', 'INGPME');
INSERT INTO rol_menu (id_rol, id_menu) VALUES ('BACK', 'INGPME');


