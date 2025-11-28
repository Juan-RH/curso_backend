import {Router} from "express";
import {getProducts,
         getProductByID, 
         createProduct, 
         deleteProduct, 
         updateProduct,
         updatePatchProduct
} from "../controllers/products.controller.js"

const router = Router();


router.route('/products')
        .get(getProducts)
        .post(createProduct);

router.route('/products/:id')
        .get(getProductByID)    
        .delete(deleteProduct)
        .patch(updatePatchProduct)
        .put(updateProduct);

export default router;