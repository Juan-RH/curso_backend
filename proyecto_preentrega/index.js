import { getProducts, addProduct, delProduct } from './model.js';


const args = process.argv.slice(2);

const router = (args) => {
    switch (args[0]){
        case 'GET':
            return getProducts(args[1]);
        case 'POST':
            return addProduct(args.slice(2));
        case 'DELETE':
            console.log(args[1])
            return delProduct(args[1]);
    }
}

router(args).then(res => console.log(res))
