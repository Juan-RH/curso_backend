import "dotenv/config"
import express from "express";
import cors from "cors"
import productsRouter from "./src/routes/products.routes.js";
import authRouter from "./src/routes/auth.router.js";
import notFound from "./src/middlewares/not-found.js";

const app = express();
// Middlewares
app.use(cors())
app.use(express.json());
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400) {
        return res.status(400).json({ error: "Invalid JSON" });
  }
  next(err);
})

// Routes
app.use('/api/auth',authRouter);
app.use('/api',productsRouter);

//404 
app.use(notFound);

const PORT = Number(process.env.PORT) || 3001;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));