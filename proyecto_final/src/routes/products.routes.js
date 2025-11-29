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
        .post(verifyToken, createProduct);

router.route('/products/:id')
        .get(getProductByID)    
        .delete(deleteProduct)
        .patch(verifyToken, updatePatchProduct)
        .put(verifyToken, updateProduct);

export default router;