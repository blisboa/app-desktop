# App-01 — Node Express WebApp

Aplicación web base construida con **Node.js + Express**, diseñada como punto de partida para un sistema de gestión de cartera de inversiones.

El proyecto expone:

-  Frontend estático (HTML, CSS, JS)
-  API REST de ejemplo
-  Sistema de logging a archivo
-  Estructura preparada para crecimiento modular

---

##  Objetivo del proyecto

Servir como base simple y ordenada para futuras funcionalidades:

- Ingreso de compras
- Ingreso de ventas
- Consulta de cartera
- Integración con base de datos
- Autenticación de usuarios

---

## Tecnologías utilizadas

- Node.js
- Express
- CORS
- dotenv
- PG
- Nodemon (desarrollo)

---
##  Instalación de librerias (paquetes)
npm install express cors dotenv pg
npm install nodemon --save-dev
---
##  Estructura del proyecto
app-01/
│
├── index.js
├── .env
├── package.json
├── README.md
│
├── logs/
│ └── log.txt
│
├── public/ # Frontend
│ ├── index.html
│ ├── principal.html
│ ├── css/
│ └── js/
│
├── uploads/
│
└── src/
├── config/
│ ├── env.js
│ └── database.js
│
├── controllers/
│
├── routes/
│
├── middlewares/
│
├── services/
│
├── models/
│
└── utils/
└── fileLogger.js


## Convenciones del proyecto

* `/public` → archivos visibles por el navegador
* `/src` → lógica del backend
* `/utils` → herramientas reutilizables
* `/middlewares` → lógica transversal (logging, auth, etc.)

---
## Ejecutar  proyecto

* `npm run dev` → Ejecutar en modo desarrollo
* `npm run start` → Ejecutar en modo producción

---

## Próximas versiones
### Trabajo ABP 8
* Estructurar  las  respuestas  de  la  API  con  formato  consistente  (  status, message, data  ). 


---

## Autor

Proyecto base para desarrollo educativo y demostraciones prácticas con Node.js y Express.
