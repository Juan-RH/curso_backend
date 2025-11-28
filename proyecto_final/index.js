import "dotenv/config"
import express from "express";
import cors from "cors"
import productsRouter from "./src/routes/products.routes.js";
import notFound from "./src/middlewares/not-found.js";

const app = express();
// Middlewares
app.use(cors())
app.use(express.json());

// Routes
app.use('/api',productsRouter);

//404 
app.use(notFound);

const PORT = Number(process.env.PORT) || 3001;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));