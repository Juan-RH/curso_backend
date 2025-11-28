# API de Productos - Proyecto Final

API RESTful para la gestión de productos utilizando Node.js, Express y Firebase Firestore.

## Características

- CRUD completo de productos
- Filtrado por categoría y precio máximo
- Base de datos en Firebase Firestore
- Arquitectura MVC


##  Instalación

1. Descarga o clona el proyecto:
```bash
cd proyecto_final
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno:

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
PORT=3001
FIREBASE_API_KEY=tu_api_key
FIREBASE_AUTH_DOMAIN=tu_auth_domain
FIREBASE_PROJECT_ID=tu_project_id
FIREBASE_STORAGE_BUCKET=tu_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
FIREBASE_APP_ID=tu_app_id
```

## Ejecutar el Proyecto

### Modo desarrollo:
```bash
npm run dev
```

### Modo producción:
```bash
npm start
```

El servidor estará disponible en `http://localhost:3001`

## Endpoints de la API

### Productos

#### Obtener todos los productos
```http
GET /api/products
```

**Query Parameters (opcionales):**
- `category`: Filtrar por categoría
- `price`: Precio máximo

**Ejemplo:**
```http
GET /api/products?category=electronics&price=500
```

#### Obtener producto por ID
```http
GET /api/products/:id
```

#### Crear producto
```http
POST /api/products
```

**Body (JSON):**
```json
{
  "name": "Nombre del producto",
  "category": "Categoría",
  "price": 100,
  "description": "Descripción del producto",
  "stock": 50
}
```

**Campos requeridos:** `name`, `category`, `price`, `stock`

#### Eliminar producto
```http
DELETE /api/products/:id
```
## Tecnologías Utilizadas

- **Express**: Framework web
- **Firebase Firestore**: Base de datos NoSQL
- **CORS**: Manejo de peticiones cross-origin
- **dotenv**: Gestión de variables de entorno
- **Nodemon**: Desarrollo con auto-reload

