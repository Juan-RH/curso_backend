import * as Model from "../models/Products.js";

export const getProducts = async (req, res) => {
    const query = req.query ?? {};
    const {category, price} = query;
    
    const all = await Model.getProduct();
    const maxPrice = price ? parseFloat(price) : undefined;
    const filtered = all.filter(p =>
        (!category || p.category === category) &&
        (!maxPrice || p.price <= maxPrice)
    );
    res.status(200).json(filtered);
    return;
}

export const getProductByID = async (req,res) => {  
    const id = req.params.id
    const prod = await Model.getProductById(id);
    if (!prod) return res.status(404).json({ error: "Not found" });
    res.json(prod);
    return;
}

export const createProduct = async (req,res) => {
    const body = req.body ?? {};
    const {name, category, price, description, stock} = body
    
    if(!name || (!category || "") || !price  || !stock){
        return res.status(400).json({error: "Required fields are missing"});
    }

    const resp = await Model.createProduct({name, category, price, description, stock});
    res.json(resp);
}


export const deleteProduct = async (req,res) => {
    const id = req.params.id;

    const resp = await Model.DeleteProd(id);
    if(!resp){
        return res.status(404).json({ error: "Product not found" });
    }

    res.status(204).send();
}

export const updateProduct = async (req,res) => {
    const id = req.params.id;
    const body = req.body ?? {};
    const {name, category, price, description, stock} = body

    if(!name || (!category) || !price  || !stock){
        return res.status(400).json({error: "Required fields are missing"});
    }
    const updated = await Model.updateProduct(id, {name, category, price, description, stock});
    console.log(updated)
    if(!updated) return res.status(404).json({error: "Product not found"})

    res.status(200).json(updated);
}


export const updatePatchProduct = async (req, res) => {
    const id = req.params.id;
    const body = req.body ?? {};
    const data = {};
    
    if (body.name !== undefined) data.name = body.name;
    if (body.category !== undefined) data.category = body.category;
    if (body.price !== undefined) data.price = body.price;
    if (body.description !== undefined) data.description = body.description;
    if (body.stock !== undefined) data.stock = body.stock;

    if(Object.keys(data).length === 0){
        return res.status(400).json({error: "No fields provided for update"});
    }
    const updated = await Model.updatePatchProduct(id,data);
    
    if(!updated) return res.status(404).json({error: "Product not found"});

    res.status(200).json(updated);
}