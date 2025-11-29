import {Router} from "express";
import {getProducts,
         getProductByID, 
         createProduct, 
         deleteProduct, 
         updateProduct,
         updatePatchProduct
} from "../controllers/products.controller.js"
import { verifyToken } from "../middlewares/verify-token.js";
const router = Router();


router.route('/products')
        .get(getProducts)

router.route('/products/:id')
        .get(getProductByID)
        .delete(verifyToken, deleteProduct)
        .patch(verifyToken, updatePatchProduct)
        .put(verifyToken, updateProduct);

router.post('/products/create', verifyToken, createProduct)

export default router;