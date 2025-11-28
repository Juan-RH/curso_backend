import {Router} from "express";
import {getProducts,
         getProductByID, 
         createProduct, 
         deleteProduct, 
} from "../controllers/products.controller.js"

const router = Router();


router.route('/products')
        .get(getProducts)
        .post(createProduct);

router.route('/products/:id')
        .get(getProductByID)    
        .delete(deleteProduct);

export default router;