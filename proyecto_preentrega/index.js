import { getProducts, addProduct, delProduct } from './model.js';


const args = process.argv.slice(2);


const router = async (args) => {
    const method = args[0] 
    if(!validQuery(args)) throw new Error('Invalid query');
    switch (method.toUpperCase()){
        case 'GET':
            return getProducts(args[1]);
        case 'POST':
            return addProduct(args.slice(2));
        case 'DELETE':
            return delProduct(args[1]);
        default:
            throw new Error('Unsupported method');
    }
}

const validQuery = (args) =>{
    const method = args[0];
    if (!method) return false;

    if (method === 'GET') {
        const target = args[1];
        if (!target) return false;
        if (target === 'products') return true;
        if (target.startsWith('products/')) {
            const idPart = target.split('/')[1];
            const id = Number(idPart);
            if (!idPart || !Number.isInteger(id) || id <= 0) return false;
            return true;
        }
        return false;
    }

    if (method === 'DELETE') {
        
        const target = args[1];
        if (!target) return false;
        if (!target.startsWith('products/')) return false;
        const idPart = target.split('/')[1];
        const id = Number(idPart);
        if (!idPart || !Number.isInteger(id) || id <= 0) return false;
        return true;
    }
    
    if (method === 'POST'){
        return args.length > 4;
    }
}



router(args).then(res => console.log(res)).catch(err => console.error('Error: ', err.message));


